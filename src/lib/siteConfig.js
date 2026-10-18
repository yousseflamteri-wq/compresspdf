export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://compresspdf.online').replace(/\/$/, '');

export const siteName = 'Compress PDF Online';

export const mainSiteUrl = 'https://onlinepdflab.app';
export const mainSiteName = 'Online PDF Lab';

export const defaultTitle = 'Compress PDF Online – Reduce Size Privately in Browser';

export const defaultDescription =
  'Compress PDF files online without uploading them. Reduce PDF size to under 200KB for job portals and email limits while keeping text sharp.';

const ogImage = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: siteName,
};

/**
 * Builds the full metadata object for a page.
 * Next.js replaces (does not merge) openGraph and twitter set inside a page,
 * so every field is set here to keep social cards correct on every route.
 */
export function buildMetadata({
  title,
  description,
  path = '',
  type = 'website',
  publishedTime,
  modifiedTime,
}) {
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
      images: [ogImage],
      ...(type === 'article' ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url],
    },
  };
}