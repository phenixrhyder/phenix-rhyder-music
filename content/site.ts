// Edit this file to publish verified artist information. Null URLs render as pending, never as fake links.
export const appleMusicArtistUrl = 'https://music.apple.com/us/artist/phenix-rhyder/1795964759';

export const site = {
  name: 'Phenix Rhyder',
  url: 'https://phenixrhyder.com',
  description: 'Phenix Rhyder is an independent recording artist and songwriter associated with Phenix Records. Explore October (album), Rich and Famous (single), and Lost in Ohio (single).',
  biography: null as string | null,
  email: null as string | null,
  platforms: [
    { name: 'Apple Music', url: appleMusicArtistUrl as string | null, mark: '01' },
    { name: 'Spotify', url: null as string | null, mark: '02' },
    { name: 'YouTube', url: null as string | null, mark: '03' },
  ],
  releases: [
    { title: 'October', type: 'Album', artwork: '/artwork/october.jpg', width: 1179, height: 1175, url: 'https://music.apple.com/us/album/october/1844034019' as string | null, slug: 'october', appleEmbedUrl: 'https://embed.music.apple.com/us/album/october/1844034019' },
    // The original artwork intentionally uses a longer legacy phrase. Keep the official title below.
    { title: 'Rich and Famous', type: 'Single', artwork: '/artwork/rich-and-famous.jpg', width: 1254, height: 1254, url: 'https://music.apple.com/us/album/rich-and-famous-single/6828209227' as string | null, slug: 'rich-and-famous', appleEmbedUrl: 'https://embed.music.apple.com/us/album/rich-and-famous-single/6828209227' },
    { title: 'Lost in Ohio', type: 'Single', artwork: '/artwork/lost-in-ohio.jpg', width: 1080, height: 1080, url: 'https://music.apple.com/us/album/lost-in-ohio-single/1833474700' as string | null, slug: 'lost-in-ohio', appleEmbedUrl: 'https://embed.music.apple.com/us/album/lost-in-ohio-single/1833474700' },
  ],
  socials: [] as { name: string; url: string }[],
};
