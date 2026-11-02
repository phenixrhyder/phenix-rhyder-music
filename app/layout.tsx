import type { Metadata, Viewport } from 'next';
import { site } from '@/content/site';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL(site.url), title: 'Phenix Rhyder — Independent Recording Artist & Songwriter', description: site.description,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', url: site.url, siteName: site.name, title: 'Phenix Rhyder', description: site.description, images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Phenix Rhyder — independent music, Phenix Records' }] },
  twitter: { card: 'summary_large_image', title: site.name, description: site.description, images: ['/opengraph-image'] },
};
export const viewport: Viewport = { themeColor: '#08090e', colorScheme: 'dark' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}
