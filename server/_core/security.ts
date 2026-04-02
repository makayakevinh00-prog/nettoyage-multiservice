import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

/**
 * Middleware de sécurité HTTP
 * Ajoute les headers de sécurité recommandés
 */
export function securityHeaders() {
  return helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "https:"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        connectSrc: ["'self'", "https://api.manus.im"],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  });
}

/**
 * Rate limiter pour les endpoints sensibles
 */
export const createRateLimiter = (windowMs = 15 * 60 * 1000, max = 100) => {
  return rateLimit({
    windowMs,
    max,
    message: 'Trop de requêtes, veuillez réessayer plus tard.',
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req: Request) => {
      return req.method === 'GET';
    },
  });
};

/**
 * Rate limiter stricte pour les formulaires
 */
export const formRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: 'Trop de soumissions, veuillez réessayer plus tard.',
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Middleware pour vérifier les requêtes CSRF
 */
export function csrfProtection(req: Request, res: Response, next: NextFunction) {
  const origin = req.get('origin');
  
  const allowedOrigins = [
    'https://procleanempire.com',
    'https://nettoyage-mwqnegfx.manus.space',
    'https://procleanempire-multiservice.manus.space',
    process.env.FRONTEND_URL,
  ];
  
  if (req.method !== 'GET' && origin && !allowedOrigins.includes(origin)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  next();
}

/**
 * Middleware pour sanitiser les données
 */
export function sanitizeInput(req: Request, res: Response, next: NextFunction) {
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key]
          .replace(/[<>]/g, '')
          .trim();
      }
    });
  }
  
  next();
}

/**
 * Middleware pour logger les erreurs de sécurité
 */
export function securityLogger(req: Request, res: Response, next: NextFunction) {
  const originalSend = res.send;
  
  res.send = function(data: any) {
    if (res.statusCode >= 400) {
      console.log(`[SECURITY] ${req.method} ${req.path} - Status: ${res.statusCode}`);
    }
    
    return originalSend.call(this, data);
  };
  
  next();
}

/**
 * Middleware pour ajouter les headers de sécurité supplémentaires
 */
export function additionalSecurityHeaders(req: Request, res: Response, next: NextFunction) {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  
  next();
}
