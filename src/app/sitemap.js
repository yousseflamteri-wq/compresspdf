import { siteUrl } from '../lib/siteConfig';

export default function sitemap() {
  const routes = [
    '',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/blog',
    '/blog/how-to-compress-a-pdf-on-mac',
    '/blog/how-to-compress-pdf-on-iphone',
    '/blog/compress-pdf-without-adobe-acrobat',
    '/blog/how-to-compress-pdf-file-size',
  ];

  const lastModifiedDate = '2026-10-14T00:00:00.000Z';

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: lastModifiedDate,
    changeFrequency: route.startsWith('/blog/') ? 'monthly' : 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/blog/') ? 0.8 : 0.6,
  }));
}