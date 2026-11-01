// Edit this file to publish verified artist information. Null URLs render as pending, never as fake links.
export const site = {
  name: 'Phenix Rhyder',
  url: 'https://phenixrhyder.com',
  description: 'The official home of Phenix Rhyder. Explore ambient, lo-fi, experimental, alternative, indie, and electronic music. Phenix Records.',
  biography: null as string | null,
  email: null as string | null,
  platforms: [
    { name: 'Apple Music', url: null as string | null, mark: '01' },
    { name: 'Spotify', url: null as string | null, mark: '02' },
    { name: 'YouTube', url: null as string | null, mark: '03' },
  ],
  releases: [
    { title: 'Release placeholder 01', detail: 'Title, artwork & release details to be added', artwork: null as string | null, url: null as string | null, style: 'haze' },
    { title: 'Release placeholder 02', detail: 'Title, artwork & release details to be added', artwork: null as string | null, url: null as string | null, style: 'wave' },
    { title: 'Release placeholder 03', detail: 'Title, artwork & release details to be added', artwork: null as string | null, url: null as string | null, style: 'eclipse' },
  ],
  socials: [] as { name: string; url: string }[],
};
