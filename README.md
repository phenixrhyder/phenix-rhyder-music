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

Edit `content/site.ts` for releases, platform URLs, biography, professional email, and social accounts. October (album), Rich and Famous (single), Lost in Ohio (single), and the Apple Music artist profile are supplied and verified by the artist. Remaining unprovided information is explicitly labeled as a placeholder; null URLs render as noninteractive pending text. Do not add guessed accounts or releases.

- Release titles, types and original cover paths live in `site.releases`. Keep exactly the approved releases; add direct release URLs only when verified. Until individual release URLs are supplied, each release card explicitly links to the verified Apple Music artist profile. The Apple Music URL is an artist profile, not a guessed release destination.
- Replace the null biography with approved copy. Newlines are preserved.
- Set the verified professional email and add verified social objects to `socials`.
- Add more platforms only after verification.
- The supplied JPEG covers in `public/artwork/` are preserved byte-for-byte and displayed with `object-fit: contain`, without overlays, filters or cropping. Rich and Famous intentionally retains its longer legacy phrase in the artwork; its official interface and structured-data title is Rich and Famous. Keep the original cover files unchanged. No autoplay, database, tracking or backend is used.

Reusable elements live in `components/ui.tsx`; page composition in `app/page.tsx`; design tokens, responsive layouts and reduced-motion rules in `app/globals.css`.

## SEO

Canonical URL is https://phenixrhyder.com. Metadata includes Open Graph and Twitter large cards; `/opengraph-image` generates a 1200×630 PNG without external assets. `/sitemap.xml`, `/robots.txt`, and `/icon.svg` are included. MusicGroup JSON-LD identifies Phenix Rhyder as an independent recording artist and songwriter, links the verified Apple Music profile, and connects all three releases to Phenix Records. No release dates, tracks or personal details are inferred.

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
