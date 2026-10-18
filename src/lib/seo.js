import { siteUrl, siteName } from './siteConfig';

export function pageMeta({ path, title, description, type = 'website' }) {
  const url = `${siteUrl}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      siteName,
      title,
      description,
      url,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}