import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerSitemapRoute } from "./sitemapHandler";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { initializeReminderScheduler } from "../lib/reminderScheduler";
import { startFeedbackScheduler } from "../lib/feedbackScheduler";
import fetch from 'node-fetch';
import { securityHeaders, additionalSecurityHeaders, csrfProtection, sanitizeInput, securityLogger } from "./security";

// Polyfill fetch si nécessaire
if (!globalThis.fetch) {
  globalThis.fetch = fetch as any;
}

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  
  // SECURITE: Middleware Helmet pour les headers de securite
  app.use(securityHeaders());
  app.use(additionalSecurityHeaders);
  app.use(securityLogger);
  
  // Redirections pour eviter les doublons (www, https)
  app.use((req, res, next) => {
    const host = req.get('host') || '';
    const protocol = req.get('x-forwarded-proto') || req.protocol || 'https';
    
    // Rediriger /en vers / pour éviter l'erreur Soft 404
    if (req.path === '/en') {
      return res.redirect(301, '/');
    }
    
    // Rediriger www vers non-www
    if (host.startsWith('www.')) {
      const newHost = host.replace('www.', '');
      return res.redirect(301, `${protocol}://${newHost}${req.originalUrl}`);
    }
    
    // Forcer HTTPS en production
    if (protocol !== 'https' && process.env.NODE_ENV === 'production') {
      return res.redirect(301, `https://${host}${req.originalUrl}`);
    }
    
    next();
  });
  
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  
  // SECURITE: Sanitiser les donnees et protection CSRF
  app.use(sanitizeInput);
  app.use(csrfProtection);
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  
  // Sitemap and robots.txt routes
  registerSitemapRoute(app);
  
  // Stripe webhook handler (must be before express.json())
  app.post('/api/stripe/webhook', express.raw({type: 'application/json'}), async (req, res) => {
    const sig = req.headers['stripe-signature'] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET not configured');
      return res.status(400).send('Webhook secret not configured');
    }
    
    try {
      const Stripe = require('stripe');
      const event = Stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      
      if (event.id.startsWith('evt_test_')) {
        console.log('[Webhook] Test event detected');
        return res.json({ verified: true });
      }
      
      console.log('[Webhook] Event type:', event.type);

      // Traiter les événements de paiement réussi
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const metadata = session.metadata || {};
        
        console.log('[Webhook] Checkout session completed:', session.id);
        console.log('[Webhook] Metadata:', JSON.stringify(metadata));

        try {
          const { sendEmail, generateBookingConfirmationEmail } = await import('../lib/email');
          const { notifyOwner } = await import('./notification');
          const { generateICSFile } = await import('../lib/calendar');
          const { addEventToGoogleCalendar } = await import('../lib/googleCalendar');
          const { syncReservationToHubSpot } = await import('../lib/hubspot-admin');

          if (metadata.type === 'reservation' && metadata.name && session.customer_email) {
            // Email de confirmation au client
            const confirmationEmail = generateBookingConfirmationEmail({
              name: metadata.name,
              service: metadata.service || 'Nettoyage',
              date: metadata.date || 'À confirmer',
              time: metadata.time || 'À confirmer',
              address: metadata.address || 'À confirmer',
              price: session.amount_total || undefined,
            });

            const bookingData = {
              name: metadata.name,
              email: session.customer_email,
              phone: metadata.phone || '',
              service: metadata.service || '',
              date: metadata.date || '',
              time: metadata.time || '',
              address: metadata.address || '',
              message: metadata.message || '',
            };

            // Générer le fichier ICS
            let attachments;
            try {
              const icsContent = generateICSFile(bookingData);
              if (icsContent) {
                attachments = [{
                  filename: 'rendez-vous-proclean.ics',
                  content: icsContent,
                  contentType: 'text/calendar',
                }];
              }
            } catch (icsError) {
              console.error('[Webhook] Erreur ICS:', icsError);
            }

            await sendEmail({
              to: session.customer_email,
              subject: '\u2705 Votre réservation est confirmée - ProClean Empire',
              html: confirmationEmail.html,
              text: confirmationEmail.text,
              attachments,
            });
            console.log('[Webhook] Email de confirmation envoyé à', session.customer_email);

            // Ajouter à Google Calendar
            try {
              await addEventToGoogleCalendar(bookingData);
              console.log('[Webhook] Événement ajouté à Google Calendar');
            } catch (calendarError) {
              console.error('[Webhook] Erreur Google Calendar:', calendarError);
            }

            // Notifier le propriétaire
            const totalEuros = session.amount_total ? (session.amount_total / 100).toFixed(2) : '?';
            await notifyOwner({
              title: `\u2705 Paiement reçu - ${metadata.service || 'Réservation'} - ${totalEuros}€`,
              content: `Nouvelle réservation payée !\n\n👤 Client: ${metadata.name}\n📧 Email: ${session.customer_email}\n📞 Tél: ${metadata.phone || 'N/A'}\n🧹 Service: ${metadata.service || 'N/A'}\n📅 Date: ${metadata.date || 'N/A'}\n🕐 Heure: ${metadata.time || 'N/A'}\n📍 Adresse: ${metadata.address || 'N/A'}\n💰 Montant: ${totalEuros}€\n\n💬 Message: ${metadata.message || 'Aucun'}`,
            });
            console.log('[Webhook] Notification propriétaire envoyée');

            // Synchroniser avec HubSpot
            try {
              await syncReservationToHubSpot({
                name: metadata.name,
                email: session.customer_email,
                phone: metadata.phone || '',
                service: metadata.service || '',
                prestation: metadata.prestation || '',
                date: metadata.date || '',
                time: metadata.time || '',
                address: metadata.address || '',
                amount: session.amount_total || 0,
                message: metadata.message || '',
                type: 'reservation',
              });
              console.log('[Webhook] Sync HubSpot réservation terminée');
            } catch (hubspotError) {
              console.error('[Webhook] Erreur sync HubSpot:', hubspotError);
            }
          }

          if (metadata.type === 'subscription' && metadata.name && session.customer_email) {
            // Notification pour les abonnements
            await notifyOwner({
              title: `\u2705 Nouvel abonnement - ${metadata.plan || 'N/A'}`,
              content: `Nouvel abonnement souscrit !\n\n👤 Client: ${metadata.name}\n📧 Email: ${session.customer_email}\n📞 Tél: ${metadata.phone || 'N/A'}\n📦 Plan: ${metadata.plan || 'N/A'}`,
            });

            await sendEmail({
              to: session.customer_email,
              subject: '\u2705 Votre abonnement ProClean Empire est activé !',
              html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #1e40af, #1e3a8a); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                  <h1>Abonnement Activé !</h1>
                  <p>ProClean Empire - Nettoyage Premium</p>
                </div>
                <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
                  <p>Bonjour <strong>${metadata.name}</strong>,</p>
                  <p>Votre abonnement <strong>${metadata.plan === 'express' ? 'Express' : 'Confort'}</strong> est maintenant actif !</p>
                  <p>Nous vous contacterons prochainement pour planifier votre première intervention.</p>
                  <p>Pour toute question :</p>
                  <ul>
                    <li>📞 06 17 21 22 30</li>
                    <li>📧 contact@procleanempire.com</li>
                  </ul>
                  <p>Merci pour votre confiance !</p>
                </div>
              </div>`,
              text: `Bonjour ${metadata.name}, votre abonnement ${metadata.plan === 'express' ? 'Express' : 'Confort'} est maintenant actif ! Nous vous contacterons prochainement pour planifier votre première intervention. Contact: 06 17 21 22 30 / contact@procleanempire.com`,
            });
            console.log('[Webhook] Email abonnement envoyé à', session.customer_email);

            // Synchroniser abonnement avec HubSpot
            try {
              await syncReservationToHubSpot({
                name: metadata.name,
                email: session.customer_email,
                phone: metadata.phone || '',
                service: 'Abonnement',
                date: new Date().toLocaleDateString('fr-FR'),
                time: '',
                address: '',
                amount: session.amount_total || 0,
                message: '',
                type: 'subscription',
                plan: metadata.plan || '',
              });
              console.log('[Webhook] Sync HubSpot abonnement terminée');
            } catch (hubspotError) {
              console.error('[Webhook] Erreur sync HubSpot abonnement:', hubspotError);
            }
          }
        } catch (processingError) {
          console.error('[Webhook] Erreur traitement checkout.session.completed:', processingError);
        }
      }

      res.json({received: true});
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(400).send('Webhook Error');
    }
  });
  
  // Route d'autocomplétion d'adresses
  app.get('/api/address-search', async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query || query.length < 3) {
        return res.json({ features: [] });
      }

      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`,
        { headers: { 'Accept': 'application/json' } }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Address search error:', error);
      res.status(500).json({ features: [], error: 'Address search failed' });
    }
  });

  // Sitemap pour SEO
  app.get('/sitemap.xml', (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/#booking?service=automobile</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/#booking?service=terrasse</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/#booking?service=tapis</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/#booking?service=balcon</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/#booking?service=jardin</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

    res.type('application/xml');
    res.send(sitemap);
  });

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    try {
      await setupVite(app, server);
    } catch (error) {
      console.warn('[Vite] Failed to setup Vite middleware, falling back to static files:', error instanceof Error ? error.message : error);
      serveStatic(app);
    }
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    // Initialiser le système de rappel de RDV
    try {
      initializeReminderScheduler();
    } catch (error) {
      console.error('Erreur lors de l\'initialisation du système de rappel:', error);
    }
    // Initialiser le système d'envoi de feedback
    try {
      startFeedbackScheduler();
    } catch (error) {
      console.error('Erreur lors de l\'initialisation du système de feedback:', error);
    }
  });
}

startServer().catch(console.error);
