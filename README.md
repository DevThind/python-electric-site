# Python Electric website

A reviewable Next.js App Router site for Python Electric, based in Vancouver, BC. The intended production origin is `https://www.pythonelectric.ca`; it is metadata configuration, not a claim that hosting or DNS is active.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The form has no delivery credentials by default and returns a visible error. For a safe local acceptance test, set `QUOTE_TEST_MODE=1` while running `npm run dev`; the confirmation then states that no email was sent. Test mode is disabled in a production build.

```bash
npm run typecheck
npm run lint
npm run build
```

## Edit content and images

- `lib/content.ts`: confirmed business identity, service taxonomy and proposed copy, image descriptions, captions, and quote links.
- `app/globals.css`: the shared semantic tokens, components, and responsive styles.
- `public/images/`: web JPEG versions of all supplied work photos, plus eight illustrative `service-*.webp` images used on the home-page cards. The service images are not presented as completed projects. Use `scripts/convert-heic.ps1` when the original HEIC files are available. The script requires the Windows HEIC image decoder.
- `public/videos/python-electric-hero.mp4`: hero video for desktop and mobile, 15.2 seconds and about 3.9 MB, with a five-second exterior inspection opening followed by the existing EV charger and stair-lighting footage. Half-second fades connect the opening and loop ending. It uses silent H.264/yuv420p at 1280 × 720 and 24 fps, with fast-start MP4 metadata. The previous montage and poster are backed up in `notes/hero-media/`; the earlier original is retained at `notes/python-electric-hero-original.mp4`. Reduced-motion preferences and data-saving connections use a frame from the new opening as the poster instead.
- `notes/asset-map.md`: every original filename, visible content, dimensions, crop guidance, and website placement.

The simple text wordmark is provisional. The selected website palette uses midnight blue (`#101F33`), pale blue-grey (`#F5F8FC`), and electric blue (`#40ACD0`). Typography pairs locally hosted Manrope V5 for headings and the wordmark with DM Sans for body copy, navigation, buttons, and forms. Both use variable WOFF2 files and adjusted Arial fallbacks; visitors make no external font requests. Font licenses are in `app/fonts/Manrope-LICENSE.txt` and `app/fonts/OFL.txt`. The design includes a hero video with playback controls on desktop and mobile, four service choices, and a separate Projects gallery of genuine work photographs.

## Fact and draft boundary

**Confirmed in the brief:** Python Electric; intended domain; Vancouver, BC; broad electrical offering; client supplied Instagram URL; contact email and enquiry recipient `Pythonelectric07@gmail.com`; the supplied work photographs.

**Proposed for client review:** The four service categories and their descriptions, property and audience wording, enquiry instructions, process steps, FAQ answers, image captions, and page copy. These are intentionally conservative and contain no unverified licence, 24/7, review, pricing, warranty, or coverage claims. The visible portfolio is limited to the lighting work shown in the photos. No case studies were invented.

**Missing for launch:** Verified phone; quote delivery credentials and an inbox receipt check; actual logo and brand colours if any; confirmed service priorities and coverage areas; operating and emergency hours if advertised; licence and insurance details if advertised; photo captions and project permissions; approval of the separate hero poster and video; genuine review sources if reviews are desired; privacy retention and inbox access practices. Confirm specialist audiences before making stronger public claims.

Keep `PUBLIC_SITE_INDEXABLE=0` until copy, privacy details, contact delivery, and deployment are approved. This makes the site `noindex`, disallows crawling in `robots.txt`, and leaves the sitemap empty. Setting it to `1` enables the canonical production sitemap; Vercel preview and development environments remain `noindex` regardless of that setting.

## Quote delivery

Copy `.env.example` to `.env.local` and configure these server-side variables in the deployment host:

| Variable | Purpose |
| --- | --- |
| `QUOTE_TO_EMAIL` | Enquiry recipient; defaults to `Pythonelectric07@gmail.com` |
| `QUOTE_FROM_EMAIL` | Sender on a domain verified in Resend |
| `RESEND_API_KEY` | Resend API key |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash standard REST token |
| `RATE_LIMIT_SECRET` | Long random secret used to hash request address for the rate-limit key |
| `PUBLIC_SITE_INDEXABLE` | `0` for preview; `1` only after launch review |

The API validates input on the server, bounds request reads before applying the body-size limit, rejects a filled honeypot, and uses an atomic Upstash transaction for a five-request fixed one-hour limit per network address. The expiry is set on the first request and is not extended by retries. It calls Resend only after validation and rate limiting. Each provider call has a ten-second timeout. Any unavailable provider or missing configuration returns an error; the UI preserves entered values and requires an explicit acceptance response before displaying success. An accepted Resend API request still needs a real inbox receipt check before launch. Do not send a test to the client without their approval.

The website contact email and default enquiry recipient are `Pythonelectric07@gmail.com`. A `QUOTE_TO_EMAIL` environment variable can override the delivery recipient. The sender address, Resend API key, and Upstash rate-limit settings still need configuration before the form can send emails.

The `QUOTE_TEST_MODE=1` override only works under `next dev` and returns a clearly labelled local test acceptance. It does not send email or exercise Upstash/Resend. Production delivery remains unverified until the delivery credentials are supplied and inbox receipt is confirmed.

## Deployment

1. Use a commercial-appropriate Vercel account or another host that runs Next.js server functions and image optimization. [Vercel states its Hobby plan is for non-commercial personal use](https://vercel.com/docs/plans/hobby); check the current Pro terms and account ownership before committing to hosting.
2. Import the repository into the chosen host, set the server environment variables above, and deploy a protected preview with `PUBLIC_SITE_INDEXABLE=0`.
3. Verify the final recipient and sender domain in Resend, configure Upstash Redis, then test invalid input, request limiting, provider failure, and one authorized real inbox receipt.
4. Confirm copy, privacy, photos, logo, and contact details. Add `www.pythonelectric.ca` as the primary domain and configure an apex-to-www redirect; [Vercel documents this setup](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting). Follow the host's displayed DNS records and verify HTTPS before switching indexing on. No DNS or publishing change has been made here.

External services for this implementation are a Next.js host, [Resend for enquiry mail](https://resend.com/pricing), and [Upstash Redis for durable limits](https://upstash.com/pricing/redis). Resend and Upstash list free tiers with usage limits and paid options; Vercel Pro has recurring billing and possible usage charges. Confirm current pricing, currency, taxes, expected volume, and ownership with the client before purchase. The website itself adds no analytics subscription.

## Verification notes

The local build, type check, lint check, and browser checks are recorded in the handover and `notes/application-audit.md`. Run `node scripts/quote-api-check.mjs` for isolated API and indexing checks; every delivery-provider call is mocked. With a local production server running at port 3100, run `node scripts/site-audit.mjs` for the complete responsive, accessibility, image, link, and route audit. Set `SITE_URL` to use another local server. The browser scripts use a locally installed Microsoft Edge executable on Windows and axe-core from the dependency tree.

Current before/after previews are in `notes/ui-redesign/`; `notes/ui-audit/` holds the original review. Audit screenshots, generated results, and video editing backups stay local and are ignored by Git; the website's required public video and poster are versioned. A local synthetic browser run is not a Lighthouse or field performance result. Real provider delivery, DNS, HTTPS, and production indexing remain launch checks.
