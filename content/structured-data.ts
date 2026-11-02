import { site } from './site';

const artistId = `${site.url}/#artist`;
const labelId = `${site.url}/#phenix-records`;

// Include only supplied releases and verified profiles. No inferred dates, tracks or personal details.
export const artistStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MusicGroup',
      '@id': artistId,
      name: site.name,
      url: site.url,
      description: site.description,
      genre: ['Ambient', 'Lo-fi', 'Experimental', 'Alternative', 'Indie', 'Electronic'],
      sameAs: site.platforms.flatMap(platform => platform.url ? [platform.url] : []),
      album: site.releases.map(release => ({ '@id': `${site.url}/#${release.slug}` })),
    },
    { '@type': 'Organization', '@id': labelId, name: 'Phenix Records' },
    ...site.releases.map(release => ({
      '@type': 'MusicAlbum',
      '@id': `${site.url}/#${release.slug}`,
      name: release.title,
      ...(release.url ? { sameAs: release.url } : {}),
      albumReleaseType: `https://schema.org/${release.type === 'Single' ? 'SingleRelease' : 'AlbumRelease'}`,
      byArtist: { '@id': artistId },
      recordLabel: { '@id': labelId },
      image: new URL(release.artwork, site.url).href,
    })),
  ],
};
