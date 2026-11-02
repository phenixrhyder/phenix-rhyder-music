import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { publicRoutes } from '@/content/metadata';
export default function sitemap(): MetadataRoute.Sitemap { return publicRoutes.map(path=>({url:new URL(path,site.url).href,changeFrequency:'monthly',priority:path==='/'?1:0.8})); }
