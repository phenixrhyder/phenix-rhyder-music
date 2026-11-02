# Phenix Rhyder — official artist website

Version 1.0. Next.js App Router, TypeScript, Tailwind CSS. This repository is exclusively for the artist website, separate from `phenixrhyder/music-visualizer` (Prism).

## Local development

Use Node.js 22 LTS and pnpm 11.25.0 (the version specified in package.json).

```sh
corepack enable
corepack prepare pnpm@11.25.0 --activate
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000. Production checks: `pnpm typecheck`, `pnpm build`, then `pnpm start`.

## Editing content

Edit `content/site.ts` for releases, platform URLs, biography, professional email, and social accounts. October (album), Rich and Famous (single), Lost in Ohio (single), and the Apple Music and Spotify artist profiles are supplied and verified by the artist. Remaining unprovided information is explicitly labeled as a placeholder; null URLs render as noninteractive pending text. Do not add guessed accounts or releases.

- Release titles, types and original cover paths live in `site.releases`. Keep exactly the approved releases; add direct release URLs only when verified. Each cover toggles an inline official Apple Music listening panel. The separate release text link opens its verified individual release page in a new tab. The streaming section retains the verified artist profile. Unavailable embeds retain an artist-profile fallback; no release IDs are inferred.
- Replace the null biography with approved copy. Newlines are preserved.
- Set the verified professional email and add verified social objects to `socials`.
- Add more platforms only after verification.
- The supplied JPEG covers in `public/artwork/` are preserved byte-for-byte and displayed with `object-fit: contain`, without overlays, filters or cropping. Rich and Famous intentionally retains its longer legacy phrase in the artwork; its official interface and structured-data title is Rich and Famous. Keep the original cover files unchanged. No autoplay, database, tracking or backend is used.

Reusable elements live in `components/ui.tsx`; page composition in `app/page.tsx`; design tokens, responsive layouts and reduced-motion rules in `app/globals.css`.

## SEO

Canonical URL is https://phenixrhyder.com. Metadata includes Open Graph and Twitter large cards; `/opengraph-image` generates a 1200×630 PNG without external assets. `/sitemap.xml`, `/robots.txt`, and `/icon.svg` are included. MusicGroup JSON-LD identifies Phenix Rhyder as an independent recording artist and songwriter, links the verified Apple Music and Spotify profiles, and connects all three releases to Phenix Records. No release dates, tracks or personal details are inferred.

## Vercel deployment — manual, after review

No production deployment has been performed by this implementation.

1. Review and merge the feature PR into `main` when ready. Replace placeholders before a public launch as appropriate.
2. In Vercel, choose **Add New → Project**, connect GitHub, and import **phenixrhyder/phenix-rhyder-music**. Do not select the Prism repository.
3. Framework preset: **Next.js**. Root directory: repository root (`.`). Node.js: **22.x**. Install command: `pnpm install --frozen-lockfile`. Build command: `pnpm build`. Keep the default Next.js output directory. No environment variables are required.
4. Click **Deploy** only when production is approved. A new Vercel project's first deployment is production. For prelaunch review, run locally; alternatively create a Vercel preview deployment explicitly, without assigning production domains.
5. Under **Project Settings → Domains**, add `phenixrhyder.com` as the primary production domain. Add `www.phenixrhyder.com` with a permanent redirect to `phenixrhyder.com`.
6. Add `phenixrhydermusic.com` and `www.phenixrhydermusic.com`; set both to permanent redirects to `https://phenixrhyder.com`. Follow the exact DNS values Vercel displays for each domain at your registrar. DNS ownership and registrar access are required; no DNS has been changed here.
7. Wait for Vercel to verify DNS and issue TLS certificates. Confirm both secondary domains preserve paths and query strings when redirecting. `next.config.ts` also provides permanent host-based redirects as a fallback; redirects at the domain level are preferred.
8. Check the homepage on iPhone, tablet and desktop, keyboard focus, anchor navigation, verified streaming and email links, social preview, `/robots.txt`, and `/sitemap.xml`. Confirm canonical metadata points to the primary domain. Preview URLs should remain protected or unindexed through Vercel's preview settings.

Once connected to Vercel, future merges to the configured production branch can trigger automatic production deployments. Configure that workflow deliberately before pushing future changes.

Vercel reference: https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting

The release grid uses three columns above 900px, two from 601–900px, and one at 600px and below. All covers remain original, uncropped and unobscured.

## Verified release destinations

Located through the verified Apple Music artist profile and checked on November 1, 2026. All returned HTTP 200 and identify Phenix Rhyder as artist:

- October — Album: https://music.apple.com/us/album/october/1844034019
- Rich and Famous — Single: https://music.apple.com/us/album/rich-and-famous-single/6828209227
- Lost in Ohio — Single: https://music.apple.com/us/album/lost-in-ohio-single/1833474700

Cover controls are native buttons with release-specific labels, aria-expanded/aria-controls, visible focus rings and a desktop hover shadow. The effect adds no image overlay, filter, transform or crop; reduced-motion preferences disable transitions.

## Embedded listening panels

`components/release-grid.tsx` manages one open release. Covers toggle panels without navigation. Closing or switching releases unmounts the iframe (and stops its playback); Escape from panel controls closes it and restores focus to its cover. Escape inside a cross-origin player remains controlled by the provider. Enter/Space and touch use native button behavior. No iframe is rendered until activation, and `loading="lazy"` defers offscreen loading. No autoplay parameter or playback command is used.

Apple iframe URLs and permissions/sandbox attributes come from Apple's official generator at https://js-cdn.music.apple.com/musickit/v1/generate.js, documented at https://js-cdn.music.apple.com/musickit/v1/index.html. The generator ran only during development; no extra generator script is shipped. Preview/full-playback conditions follow https://artists.apple.com/support/1117-apple-music-marketing-tools. The iframe is not a custom streaming implementation.

Each panel states that previews and full playback depend on provider access, sign-in, subscription and region. A verified artist-profile fallback is always visible because cross-origin error pages and browser blocking cannot be reliably detected by iframe load events. A detected iframe error or missing embed URL displays an unavailable message. Spotify tabs appear only where both the individual release URL and official embed URL have been verified. Provider changes unmount the previous iframe. Tabs support Left/Right, Home/End, roving tab focus and labelled panels. Apple Music is the default every time a release is opened.

Validation: production build and TypeScript passed. In-browser checks confirmed all three embedded title/artist identities and track listings, initial iframe count zero, one iframe when open, switching removes the prior player, Enter/Space activation, Escape close/focus restoration, and no horizontal overflow at 390px. Physical iPhone Safari and signed-in subscription playback were not tested. Test those on a real device before launch; no access tokens or credentials are required by this website.

## Verified Spotify catalog and embeds

Artist: https://open.spotify.com/artist/7dIKBTLHelRJ6cmnHBCdf4

Verified November 1, 2026 by following the supplied artist catalog to each release page and checking title, release type and artist URI against `spotify:artist:7dIKBTLHelRJ6cmnHBCdf4`:

- October — Album: https://open.spotify.com/album/6aYkN40S5iNvoYolMlYO3e
- Rich and Famous — Single: https://open.spotify.com/album/2hS5J8ZFhHsh2JIl8pgAWC
- Lost in Ohio — Single: https://open.spotify.com/album/5nqKoSnr9lRUw4sFc5pFUV

All three returned HTTP 200. Official iframe code and embed URLs were retrieved from Spotify's public oEmbed endpoint for each verified URL, following https://developer.spotify.com/documentation/embeds/tutorials/creating-an-embed. There are no API keys, inferred IDs or autoplay parameters. Permissions in the official iframe code do not request playback; no playback command runs on load or tab selection.

Spotify browser validation: all three embedded players displayed the correct title and Phenix Rhyder artist name. Apple Music remained the initial selection; ArrowRight and Home switched providers with the selected tab focused. Exactly one iframe was mounted, none existed on initial load, and the Spotify player fit at 390px without horizontal overflow. Production build, TypeScript and production-HTML structured-data checks passed. Audio output, authenticated subscription playback and physical iPhone Safari remain untested.
