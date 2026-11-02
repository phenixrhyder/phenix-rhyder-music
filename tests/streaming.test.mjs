import test from 'node:test';
import assert from 'node:assert/strict';

// Run against a built, running site: STREAMING_TEST_URL=http://localhost:3100 pnpm test:streaming
const base = process.env.STREAMING_TEST_URL ?? 'http://localhost:3000';
const appleArtist = 'https://music.apple.com/us/artist/phenix-rhyder/1795964759';
const youtubeChannel = 'https://www.youtube.com/channel/UCBnLNK0lWirXcviF3whqUbg';
const iheartArtist = 'https://www.iheart.com/artist/phenix-rhyder-45741687/';
const spotifyArtist = 'https://open.spotify.com/artist/7dIKBTLHelRJ6cmnHBCdf4';
const response = await fetch(base);
assert.equal(response.status, 200, 'Production homepage must load');
const html = await response.text();
const graph = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1] ?? '{}')['@graph'];

test('all official artist profiles are published in navigation and MusicGroup', () => {
  const artist = graph.find(item => item['@type'] === 'MusicGroup');
  for (const url of [appleArtist, spotifyArtist, youtubeChannel, iheartArtist]) {
    assert.ok(artist.sameAs.includes(url));
    assert.ok(html.includes(`href="${url}"`));
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
  const controls = [...html.matchAll(/<button\b[^>]*aria-expanded="false"[^>]*aria-controls="([^"]+)"[^>]*>/g)];
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
