import type { Metadata } from 'next';
import { site } from './site';
export const publicRoutes = ['/', '/music', '/projects', '/projects/prism', '/about', '/contact'] as const;
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return { title, description, alternates: { canonical: path },
    openGraph: { type: 'website', title, description, url: new URL(path, site.url), siteName: site.name, images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Phenix Rhyder — Phenix Records' }] },
    twitter: { card: 'summary_large_image', title, description, images: ['/opengraph-image'] },
  };
}
