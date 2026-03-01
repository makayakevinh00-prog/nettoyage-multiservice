import type { Express } from 'express';

export function registerSitemapRoute(app: Express) {
  app.get('/sitemap.xml', (req, res) => {
    const protocol = req.get('x-forwarded-proto') || req.protocol || 'https';
    const host = req.get('host') || 'procleanempire.com';
    const baseUrl = `${protocol}://${host}`;

    const urls = [
      {
        loc: `${baseUrl}/`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '1.0',
      },
      {
        loc: `${baseUrl}/#services`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.9',
      },
      {
        loc: `${baseUrl}/#booking`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.9',
      },
      // Service pages
      {
        loc: `${baseUrl}/#booking?service=automobile`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.8',
      },
      {
        loc: `${baseUrl}/#booking?service=terrasse`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.8',
      },
      {
        loc: `${baseUrl}/#booking?service=tapis`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.8',
      },
      {
        loc: `${baseUrl}/#booking?service=balcon`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.8',
      },
      {
        loc: `${baseUrl}/#booking?service=jardin`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.8',
      },
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    res.type('application/xml');
    res.send(sitemap);
  });

  // Robots.txt route
  app.get('/robots.txt', (req, res) => {
    const protocol = req.get('x-forwarded-proto') || req.protocol || 'https';
    const host = req.get('host') || 'procleanempire.com';
    const baseUrl = `${protocol}://${host}`;

    const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /.env
Disallow: /node_modules/

Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Allow Google Bot
User-agent: Googlebot
Allow: /
Crawl-delay: 0

# Allow Bing Bot
User-agent: Bingbot
Allow: /
Crawl-delay: 1`;

    res.type('text/plain');
    res.send(robotsTxt);
  });
}
