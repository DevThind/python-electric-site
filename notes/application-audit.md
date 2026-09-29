# Application audit — 29 September 2026

Audited the complete Python Electric website using a local Next.js production build and Microsoft Edge through Playwright. The current service content, supplied images, business details, service areas, contact address, mobile video behavior, and typography are included in the reviewed changes.

## Corrections made during review

- Quote-form success now requires `accepted: true` and a recognized response mode. Empty or malformed HTTP 200 responses show an error and preserve entered values.
- Phone-only enquiries require at least seven digits; punctuation-only values are rejected by both client and server.
- Request reads are bounded before decoding, while preserving the existing 8,000-character body limit and support for valid Unicode enquiry text.
- Redis and email delivery calls have ten-second timeouts. Invalid or fractional Redis counters fail without attempting delivery.
- Development and Vercel previews remain unindexable even when the indexing switch is enabled.
- Unknown service names that match inherited JavaScript object properties return the normal 404 page instead of entering the legacy redirect path.
- Contact email labels display above their addresses. The footer email has a natural wrap opportunity before the domain.
- Browser checks reflect the current mobile video behavior and explicit form acceptance contract. Temporary audit results remain outside Git.

## Verification

| Check | Result |
| --- | --- |
| Production build, TypeScript, ESLint, and Git whitespace checks | Passed |
| Full dependency audit, including development dependencies | Zero reported vulnerabilities |
| Isolated quote API and indexing checks | 40 passed; provider requests mocked |
| All ten public pages at 320, 390, 768, 1024, and 1440px | 50 page checks passed |
| Automated accessibility scans at 390 and 1440px | 20 page scans with no reported violations |
| Image loading, heading clipping, duplicate IDs, and horizontal overflow | Passed on all audited pages |
| Internal links | All 24 checked successfully |
| Legacy redirects, unknown routes, inherited-property route names, sitemap, robots, and unsupported API methods | Passed |
| Mobile menu, desktop dropdown, keyboard focus, FAQ disclosures, galleries, gallery wraparound, and modal accessibility | Passed |
| Form preselection, validation, pending state, test acceptance, reset, malformed acknowledgements, server validation focus, and network failure | Passed; no real email sent |
| Video decoding, loop, playback controls, manual pause retention, offscreen pause, and autoplay rejection | Passed on desktop and emulated iPhone 13 / Pixel 7 |
| Reduced motion and data saving | Poster displayed without video requests |
| Effective 200% zoom | No horizontal overflow |
| Production font rendering and local loading | Manrope headings and DM Sans body verified; homepage checked through 1920px |

Reproducible scripts are `scripts/quote-api-check.mjs`, `scripts/site-audit.mjs`, `scripts/production-smoke.mjs`, and the interaction, form, typography, and video checks in `notes/ui-redesign/`. Browser checks accept `SITE_URL`; the typography script accepts `TYPOGRAPHY_BASE_URL`. Screenshots and the detailed [site-audit results](ui-redesign/site-audit-results.json) stay local and are ignored by Git.

## Remaining external checks

Email delivery credentials and rate-limit provider settings are not configured locally. Production correctly returns a visible delivery error and offers the direct contact email. Actual inbox receipt requires provider configuration and an authorized delivery test. No real emails were sent during this audit.

The browser audit uses Chromium-based Edge. Device checks emulate mobile viewports and capabilities; they are not physical-device Safari or Firefox tests. Automated accessibility checks supplement the manual visual and keyboard review. Hosting, DNS, HTTPS, and live-site performance were not exercised by the local audit.
