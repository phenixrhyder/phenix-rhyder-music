// Edit this file to publish verified artist information. Null URLs render as pending, never as fake links.
export const appleMusicArtistUrl = 'https://music.apple.com/us/artist/phenix-rhyder/1795964759';

export const spotifyArtistUrl = 'https://open.spotify.com/artist/7dIKBTLHelRJ6cmnHBCdf4';

export const site = {
  name: 'Phenix Rhyder',
  url: 'https://phenixrhyder.com',
  description: 'Phenix Rhyder is an independent recording artist and songwriter associated with Phenix Records. Explore October (album), Rich and Famous (single), and Lost in Ohio (single).',
  biography: null as string | null,
  email: null as string | null,
  platforms: [
    { name: 'Apple Music', url: appleMusicArtistUrl as string | null, mark: '01' },
    { name: 'Spotify', url: spotifyArtistUrl as string | null, mark: '02' },
    { name: 'YouTube', url: 'https://www.youtube.com/channel/UCBnLNK0lWirXcviF3whqUbg' as string | null, mark: '03' },
    { name: 'iHeartRadio', url: 'https://www.iheart.com/artist/phenix-rhyder-45741687/' as string | null, mark: '04' },
  ],
  releases: [
    { title: 'October', type: 'Album', artwork: '/artwork/october.jpg', width: 1179, height: 1175, url: 'https://music.apple.com/us/album/october/1844034019' as string | null, slug: 'october', spotifyUrl: 'https://open.spotify.com/album/6aYkN40S5iNvoYolMlYO3e', spotifyEmbedUrl: 'https://open.spotify.com/embed/album/6aYkN40S5iNvoYolMlYO3e?utm_source=oembed', appleEmbedUrl: 'https://embed.music.apple.com/us/album/october/1844034019' },
    // The original artwork intentionally uses a longer legacy phrase. Keep the official title below.
    { title: 'Rich and Famous', type: 'Single', artwork: '/artwork/rich-and-famous.jpg', width: 1254, height: 1254, url: 'https://music.apple.com/us/album/rich-and-famous-single/6828209227' as string | null, slug: 'rich-and-famous', spotifyUrl: 'https://open.spotify.com/album/2hS5J8ZFhHsh2JIl8pgAWC', spotifyEmbedUrl: 'https://open.spotify.com/embed/album/2hS5J8ZFhHsh2JIl8pgAWC?utm_source=oembed', appleEmbedUrl: 'https://embed.music.apple.com/us/album/rich-and-famous-single/6828209227' },
    { title: 'Lost in Ohio', type: 'Single', artwork: '/artwork/lost-in-ohio.jpg', width: 1080, height: 1080, url: 'https://music.apple.com/us/album/lost-in-ohio-single/1833474700' as string | null, slug: 'lost-in-ohio', spotifyUrl: 'https://open.spotify.com/album/5nqKoSnr9lRUw4sFc5pFUV', spotifyEmbedUrl: 'https://open.spotify.com/embed/album/5nqKoSnr9lRUw4sFc5pFUV?utm_source=oembed', appleEmbedUrl: 'https://embed.music.apple.com/us/album/lost-in-ohio-single/1833474700' },
  ],
  socials: [] as { name: string; url: string }[],
};
