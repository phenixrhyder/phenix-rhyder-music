'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { appleMusicArtistUrl, spotifyArtistUrl } from '@/content/site';
import { VerifiedLink } from './ui';

type Release = {
  title: string; type: string; slug: string; artwork: string;
  width: number; height: number; url: string | null; appleEmbedUrl: string | null; spotifyUrl: string | null; spotifyEmbedUrl: string | null;
};

type Provider = 'apple' | 'spotify';
const providerNames = { apple: 'Apple Music', spotify: 'Spotify' };

function ProviderPlayer({ release, provider }: { release: Release; provider: Provider }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const name = providerNames[provider];
  const src = provider === 'apple' ? release.appleEmbedUrl : release.spotifyEmbedUrl;
  const fallback = provider === 'apple' ? appleMusicArtistUrl : spotifyArtistUrl;
  return <>
    {src && !failed ? <>
      {!loaded && <p className="small muted" role="status">Loading {name} player…</p>}
      {provider === 'apple' ? <iframe src={src} title={`${release.title} — ${release.type} by Phenix Rhyder, Apple Music player`} height="450" className="apple-player" loading="lazy"
        allow="autoplay *; encrypted-media *;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
        onLoad={() => setLoaded(true)} onError={() => setFailed(true)} /> :
        <iframe src={src} title={`${release.title} — ${release.type} by Phenix Rhyder, Spotify player`} height="352" className="spotify-player" loading="lazy" allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />}
    </> : <p className="small" role="status">The embedded player is unavailable. Listen using the artist link below.</p>}
    <p className="small muted">Player unavailable or blocked by your browser? <a className="player-fallback" href={fallback} target="_blank" rel="noopener noreferrer">Open Phenix Rhyder on {name} <span className="sr-only">(opens in a new tab)</span>↗</a></p>
  </>;
}

function ListeningPanel({ release, onClose }: { release: Release; onClose: () => void }) {
  const [provider, setProvider] = useState<Provider>('apple');
  const tabs = useRef<Partial<Record<Provider, HTMLButtonElement | null>>>({});
  const providers: Provider[] = release.spotifyUrl && release.spotifyEmbedUrl ? ['apple', 'spotify'] : ['apple'];
  return <div className="listening-panel" onKeyDown={event => {
    if (event.key === 'Escape') { event.preventDefault(); onClose(); }
  }}>
    <div className="player-heading"><h4 id={`player-heading-${release.slug}`}>{release.title} · {providerNames[provider]}</h4><button type="button" className="close-player" onClick={onClose} aria-label={`Close ${release.title} listening panel`}>Close <span aria-hidden="true">×</span></button></div>
    <div role="tablist" aria-label={`${release.title} streaming service`} className="provider-tabs">{providers.map((item, index) => <button
      key={item} ref={element => { tabs.current[item] = element; }} type="button" role="tab" id={`${release.slug}-tab-${item}`}
      aria-selected={provider === item} aria-controls={`${release.slug}-provider-panel`} tabIndex={provider === item ? 0 : -1}
      onClick={() => setProvider(item)} onKeyDown={event => {
        let next: Provider | undefined;
        if (event.key === 'ArrowRight') next = providers[(index + 1) % providers.length];
        if (event.key === 'ArrowLeft') next = providers[(index + providers.length - 1) % providers.length];
        if (event.key === 'Home') next = providers[0];
        if (event.key === 'End') next = providers[providers.length - 1];
        if (next) { event.preventDefault(); setProvider(next); tabs.current[next]?.focus(); }
      }}>{providerNames[item]}</button>)}</div>
    <div role="tabpanel" id={`${release.slug}-provider-panel`} aria-labelledby={`${release.slug}-tab-${provider}`} tabIndex={0}>
      <p className="small muted">Previews are available where permitted. Full playback depends on {providerNames[provider]} sign-in, subscription, region, and provider permissions. Press play to listen.</p>
      <ProviderPlayer key={provider} release={release} provider={provider} />
    </div>
  </div>;
}

export function ReleaseGrid({ releases }: { releases: readonly Release[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const buttons = useRef<Record<string, HTMLButtonElement | null>>({});
  function close(slug: string) {
    setOpenSlug(null);
    buttons.current[slug]?.focus();
  }
  return <div className="release-grid">{releases.map(release => {
    const open = openSlug === release.slug;
    return <article className="release" key={release.slug}>
      <button ref={element => { buttons.current[release.slug] = element; }} type="button" className="artwork original-cover cover-link cover-toggle"
        id={`cover-${release.slug}`} aria-label={`Listen to ${release.title} — ${release.type} by Phenix Rhyder`} aria-expanded={open} aria-controls={`player-${release.slug}`}
        onClick={() => setOpenSlug(open ? null : release.slug)}>
        <Image src={release.artwork} alt={`${release.title} — ${release.type} original cover artwork`} width={release.width} height={release.height} sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 900px) calc((100vw - 72px) / 2), (max-width: 1432px) calc((100vw - 162px) / 3), 424px" unoptimized />
      </button>
      <div className="release-title"><h3>{release.title}</h3></div><p className="small muted">{release.type}</p>
      <p className="small muted listening-hint">{open ? 'Listening panel open below' : 'Select the cover to listen here'}</p>
      <VerifiedLink className="release-link" url={release.url ?? appleMusicArtistUrl}>Open in Apple Music</VerifiedLink>
      <div id={`player-${release.slug}`} role="region" aria-label={`${release.title} listening panel`} hidden={!open}>
        {open && <ListeningPanel key={release.slug} release={release} onClose={() => close(release.slug)} />}
      </div>
    </article>;
  })}</div>;
}
