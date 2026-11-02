import type { Metadata, Viewport } from 'next';
import { site } from '@/content/site';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { artistStructuredData } from '@/content/structured-data';
export const metadata: Metadata = {
  metadataBase: new URL(site.url), title: 'Phenix Rhyder — Independent Recording Artist & Songwriter', description: site.metaDescription,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', url: site.url, siteName: site.name, title: 'Phenix Rhyder', description: site.description, images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Phenix Rhyder — independent music, Phenix Records' }] },
  twitter: { card: 'summary_large_image', title: site.name, description: site.metaDescription, images: ['/opengraph-image'] },
};
export const viewport: Viewport = { themeColor: '#08090e', colorScheme: 'dark' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(artistStructuredData).replace(/</g, '\\u003c') }} /><SiteHeader /><main id="main">{children}</main><SiteFooter /></body></html>;
}
