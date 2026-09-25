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
- `app/globals.css`: base component and layout styles. `app/editorial.css`: earlier shared styling. `app/electrical.css`: current trade-focused palette, service layout, and responsive visual direction.
- `public/images/`: web JPEG versions of all supplied work photos, plus eight illustrative `service-*.webp` images used on the home-page cards. The service images are not presented as completed projects. Use `scripts/convert-heic.ps1` when the original HEIC files are available. The script requires the Windows HEIC image decoder.
- `public/videos/python-electric-hero.mp4`: desktop hero video, 12.4 seconds and about 2.2 MB. The opening exterior shot is two seconds shorter; the original video is backed up at `notes/python-electric-hero-original.mp4`. Smaller screens, reduced-motion preferences, and data-saving connections use the hero poster instead.
- `notes/asset-map.md`: every original filename, visible content, dimensions, crop guidance, and website placement.

The simple text wordmark is provisional. The selected website palette uses midnight blue (`#101F33`), pale blue-grey (`#F5F8FC`), and electric blue (`#40ACD0`). The current design uses a locally bundled DM Sans font and keeps the original opening video, followed by a service-first layout. The font license is in `app/fonts/OFL.txt`.

## Fact and draft boundary

**Confirmed in the brief:** Python Electric; intended domain; Vancouver, BC; broad electrical offering; client supplied Instagram URL; the supplied work photographs.

**Proposed for client review:** The eight service categories and their descriptions, property and audience wording, enquiry instructions, process steps, FAQ answers, image captions, and page copy. These are intentionally conservative and contain no unverified licence, 24/7, review, pricing, warranty, or coverage claims. The visible portfolio is limited to the lighting work shown in the photos. No case studies were invented.

**Missing for launch:** Verified phone and email; final quote recipient; actual logo and brand colours if any; confirmed service priorities and coverage areas; operating and emergency hours if advertised; licence and insurance details if advertised; photo captions and project permissions; approval of the separate hero poster and video; genuine review sources if reviews are desired; privacy retention and inbox access practices. Confirm specialist audiences before making stronger public claims.

Keep `PUBLIC_SITE_INDEXABLE=0` until copy, privacy details, contact delivery, and deployment are approved. This makes the site `noindex`, disallows crawling in `robots.txt`, and leaves the sitemap empty. Setting it to `1` enables the canonical production sitemap; Vercel preview and development environments remain `noindex` regardless of that setting.

## Quote delivery

Copy `.env.example` to `.env.local` and configure these server-side variables in the deployment host:

| Variable | Purpose |
| --- | --- |
| `QUOTE_TO_EMAIL` | Verified inbox for enquiries |
| `QUOTE_FROM_EMAIL` | Sender on a domain verified in Resend |
| `RESEND_API_KEY` | Resend API key |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash standard REST token |
| `RATE_LIMIT_SECRET` | Long random secret used to hash request address for the rate-limit key |
| `PUBLIC_SITE_INDEXABLE` | `0` for preview; `1` only after launch review |

The API validates input on the server, limits body size, rejects a filled honeypot, and uses an atomic Upstash transaction for a five-request fixed one-hour limit per network address. The expiry is set on the first request and is not extended by retries. It calls Resend only after validation and rate limiting. Any unavailable provider or missing configuration returns an error; the UI preserves entered values and never reports success before the provider accepts the request. An accepted Resend API request still needs a real inbox receipt check before launch. Do not send a test to the client without their approval.

The `QUOTE_TEST_MODE=1` override only works under `next dev` and returns a clearly labelled local test acceptance. It does not send email or exercise Upstash/Resend. Production delivery remains unverified until the verified inbox and credentials are supplied.

## Deployment

1. Use a commercial-appropriate Vercel account or another host that runs Next.js server functions and image optimization. [Vercel states its Hobby plan is for non-commercial personal use](https://vercel.com/docs/plans/hobby); check the current Pro terms and account ownership before committing to hosting.
2. Import the repository into the chosen host, set the server environment variables above, and deploy a protected preview with `PUBLIC_SITE_INDEXABLE=0`.
3. Verify the final recipient and sender domain in Resend, configure Upstash Redis, then test invalid input, request limiting, provider failure, and one authorized real inbox receipt.
4. Confirm copy, privacy, photos, logo, and contact details. Add `www.pythonelectric.ca` as the primary domain and configure an apex-to-www redirect; [Vercel documents this setup](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting). Follow the host's displayed DNS records and verify HTTPS before switching indexing on. No DNS or publishing change has been made here.

External services for this implementation are a Next.js host, [Resend for enquiry mail](https://resend.com/pricing), and [Upstash Redis for durable limits](https://upstash.com/pricing/redis). Resend and Upstash list free tiers with usage limits and paid options; Vercel Pro has recurring billing and possible usage charges. Confirm current pricing, currency, taxes, expected volume, and ownership with the client before purchase. The website itself adds no analytics subscription.

## Verification notes

The local build, type check, lint check, and browser checks are recorded in the handover. Current home previews are `notes/screenshots/electrical-home-desktop-top.png` and `electrical-home-mobile-top.png`. Other screenshots in that directory document earlier layouts and references. A local synthetic browser run is not a Lighthouse or field performance result. Real provider delivery, DNS, HTTPS, and production indexing remain launch checks.
