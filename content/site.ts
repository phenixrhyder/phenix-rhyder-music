// Edit this file to publish verified artist information. Null URLs render as pending, never as fake links.
export const site = {
  name: 'Phenix Rhyder',
  url: 'https://phenixrhyder.com',
  description: 'Phenix Rhyder is an independent recording artist and songwriter associated with Phenix Records. Explore October (album) and Rich and Famous (single).',
  biography: null as string | null,
  email: null as string | null,
  platforms: [
    { name: 'Apple Music', url: 'https://music.apple.com/us/artist/phenix-rhyder/1795964759' as string | null, mark: '01' },
    { name: 'Spotify', url: null as string | null, mark: '02' },
    { name: 'YouTube', url: null as string | null, mark: '03' },
  ],
  releases: [
    { title: 'October', type: 'Album', artwork: '/artwork/october.jpg', width: 1179, height: 1175, url: null as string | null, slug: 'october' },
    // The original artwork intentionally uses a longer legacy phrase. Keep the official title below.
    { title: 'Rich and Famous', type: 'Single', artwork: '/artwork/rich-and-famous.jpg', width: 1254, height: 1254, url: null as string | null, slug: 'rich-and-famous' },
  ],
  socials: [] as { name: string; url: string }[],
};
