import test from 'node:test';
import assert from 'node:assert/strict';

// Run against a built, running site: STREAMING_TEST_URL=http://localhost:3100 pnpm test:streaming
const base = process.env.STREAMING_TEST_URL ?? 'http://localhost:3000';
const appleArtist = 'https://music.apple.com/us/artist/phenix-rhyder/1795964759';
const xProfile = 'https://x.com/phenix_rhyder';
const youtubeChannel = 'https://www.youtube.com/channel/UCBnLNK0lWirXcviF3whqUbg';
const amazonArtist = 'https://www.amazon.com/music/player/artists/B0DT9SYJK1/phenix-rhyder';
const iheartArtist = 'https://www.iheart.com/artist/phenix-rhyder-45741687/';
const spotifyArtist = 'https://open.spotify.com/artist/7dIKBTLHelRJ6cmnHBCdf4';
const response = await fetch(new URL('/music', base));
assert.equal(response.status, 200, 'Production music page must load');
const html = await response.text();
const profilesHtml = html + await (await fetch(new URL('/contact', base))).text();
const graph = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1] ?? '{}')['@graph'];

test('all official artist profiles are published in navigation and MusicGroup', () => {
  const artist = graph.find(item => item['@type'] === 'MusicGroup');
  assert.equal(artist.sameAs.length, new Set(artist.sameAs).size, 'Artist profiles must not be duplicated');
  for (const url of [appleArtist, spotifyArtist, youtubeChannel, iheartArtist, amazonArtist, xProfile]) {
    assert.ok(artist.sameAs.includes(url));
    assert.ok(profilesHtml.includes(`href="${url}"`));
  }
});

test('only the three approved releases and their verified catalog URLs are published', () => {
  const releases = graph.filter(item => item['@type'] === 'MusicAlbum');
  assert.deepEqual(releases.map(item => item.name), ['October', 'Rich and Famous', 'Lost in Ohio']);
  const expected = [
    ['AlbumRelease', 'https://music.apple.com/us/album/october/1844034019', 'https://open.spotify.com/album/6aYkN40S5iNvoYolMlYO3e'],
    ['SingleRelease', 'https://music.apple.com/us/album/rich-and-famous-single/6828209227', 'https://open.spotify.com/album/2hS5J8ZFhHsh2JIl8pgAWC'],
    ['SingleRelease', 'https://music.apple.com/us/album/lost-in-ohio-single/1833474700', 'https://open.spotify.com/album/5nqKoSnr9lRUw4sFc5pFUV'],
  ];
  releases.forEach((release, index) => {
    const [type, apple, spotify] = expected[index];
    assert.equal(release.albumReleaseType, `https://schema.org/${type}`);
    assert.deepEqual(release.sameAs, [apple, spotify]);
    assert.equal(release.byArtist['@id'], 'https://phenixrhyder.com/#artist');
  });
});

test('initial page cannot start an embedded player and all cover controls have valid targets', () => {
  assert.doesNotMatch(html, /<iframe\b/i);
  const controls = [...html.matchAll(/<button\b[^>]*aria-expanded="false"[^>]*aria-controls="(player-[^"]+)"[^>]*>/g)];
  assert.equal(controls.length, 3);
  for (const [, id] of controls) assert.ok(html.includes(`id="${id}"`));
});

test('all original covers are served as JPEGs', async () => {
  for (const name of ['october', 'rich-and-famous', 'lost-in-ohio']) {
    const image = await fetch(new URL(`/artwork/${name}.jpg`, base));
    assert.equal(image.status, 200);
    assert.match(image.headers.get('content-type'), /image\/jpeg/);
    const bytes = new Uint8Array(await image.arrayBuffer());
    assert.deepEqual([...bytes.slice(0, 3)], [255, 216, 255]);
  }
});


test('all public pages load directly with unique SEO, headings and self-referencing canonicals', async () => {
  const paths = ['/', '/music', '/projects', '/projects/prism', '/about', '/contact'];
  const titles = new Set();
  const descriptions = new Set();
  for (const path of paths) {
    const result = await fetch(new URL(path, base));
    assert.equal(result.status, 200, path);
    const page = await result.text();
    const title = page.match(/<title>(.*?)<\/title>/s)?.[1];
    const description = page.match(/<meta name="description" content="([^"]+)"/)?.[1];
    assert.ok(title); assert.ok(description);
    assert.ok(!titles.has(title), `Unique title: ${path}`);
    assert.ok(!descriptions.has(description), `Unique description: ${path}`);
    titles.add(title); descriptions.add(description);
    assert.equal((page.match(/<h1[ >]/g) ?? []).length, 1, `Single page heading: ${path}`);
    assert.ok(page.includes(`rel="canonical" href="https://phenixrhyder.com${path === '/' ? '' : path}"`) || page.includes(`rel="canonical" href="https://phenixrhyder.com${path}"`), path);
  }
  const sitemap = await (await fetch(new URL('/sitemap.xml', base))).text();
  for (const path of paths) assert.ok(sitemap.includes(`https://phenixrhyder.com${path === '/' ? '/' : path}`));
});

test('Prism is a linked showcase, not an embedded application', async () => {
  const prism = await (await fetch(new URL('/projects/prism', base))).text();
  assert.ok(prism.includes('href="https://huggingface.co/spaces/phenixrhyder/prism-music-visualizer"'));
  assert.ok(prism.includes('href="https://huggingface.co/phenixrhyder"'));
  assert.ok(prism.includes('Launch Prism'));
  assert.doesNotMatch(prism, /<iframe\b/i);
  const data = [...prism.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
  assert.ok(data.some(item => item['@type'] === 'CreativeWork' && item.name === 'PRISM'));
});
