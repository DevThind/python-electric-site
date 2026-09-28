# Redesign verification — 28 September 2026

## Current implementation

The brief in `notes/ui-audit/redesign-prompt.md` has been implemented with the user's later changes: self-hosted Inter, a transparent homepage header, a centered three-line desktop hero, and removal of the homepage Selected installations section. Genuine installation photographs remain on Projects and appropriate interior pages. Illustrative service images are presented as service choices.

The latest services correction centers the introduction, uses a fluid container covering approximately 95% of the viewport up to 1800px, balances image/text widths, and aligns the four cards. Headings, card text, padding, and card height scale up on larger displays. Description text remains at least 16px through mobile breakpoints. Below 700px the cards use a single column. Existing service destinations remain intact.

The company introduction now follows the hero and precedes Services. It appears once, shares the wider content alignment, and has a restrained cyan accent, the existing headline, a clearer lead sentence, shorter supporting copy, and the More about us link. It becomes a single column on mobile.

The hero opening now uses five seconds of the supplied exterior inspection clip, with the charger fully visible at playback time five seconds. The existing EV charger and stair-lighting scenes remain, and the closing crossfade returns to the new opening. The video receives an 8% CSS brightness boost and a lighter overlay with a central scrim for readable text. The poster is a frame from the new opening. Media details and backups are in `notes/hero-media/`.

The shared CSS replaces the historical styling files. The quote form, accessible menu/dropdown, gallery navigation, video controls, reduced-motion/Save-Data policy, and follow-up attachment wording remain in place. No real enquiries were sent or external deployment performed.

## Actual results

- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run build`: passed, including the final image sizing adjustment.
- Typecheck, lint, and build passed again after the introduction enhancement. Visual inspection at 1872, 1440, 1024, 768, 390, and 360px confirmed the hero → introduction → services order, a single introduction, and no horizontal overflow.
- Typecheck, lint, and build passed after the video update. FFmpeg decoded the complete output without errors. `node notes/ui-redesign/video-check.mjs` passed decoding/playback, all scene seeks, loop playback, pause/play, manual pause retention, offscreen pause, and new-poster fallbacks for mobile, reduced motion, and Save-Data without video requests. The five-second opening edit produces a 15.166667-second loop; the scene timings and captures were updated for that edit.
- `node notes/ui-redesign/services-layout-check.mjs`: passed on the latest build at 1899, 1688, 1440, 1024, 900, 768, 700, 600, 390, 360, and 320px. Four original URLs, equal card heights, descriptions of at least 16px, visible keyboard focus, and no clipped text or horizontal overflow were checked. Wide-screen container coverage is at least 94% at the tested desktop widths.
- `node notes/ui-redesign/verify.mjs`: passed. Checked homepage at 1440, 1024, 768, 390, and 360px, short landscape, and 200% equivalent reflow. Services, EV detail, Projects, About, Contact, and Privacy passed desktop/mobile checks without broken images, horizontal overflow, clipped headings, or page errors.
- Menu checks passed after scrolling: full viewport coverage, inert background, scroll locking, focus trap, outside dismissal, Escape, and focus return.
- Services disclosure, FAQ disclosure, gallery next/counter/arrow keys/Escape/focus return, service preselection, invalid form input, and intercepted 503 delivery failure/value preservation passed.
- Reduced motion, small screens, Save-Data, video pause/play, manual pause retention, and offscreen pause checks passed.
- axe checks found zero violations in the six tested default/expanded states: desktop homepage, desktop open Services disclosure, mobile open menu, mobile Services, mobile Projects, and mobile Contact. This is an automated check, not certification of accessibility conformance.

The full browser suite ran on the earlier build. The focused services checks and screenshots were rerun after restoring the image `sizes` value and correcting the wide-screen container and typography. Typecheck, lint, and the production build passed again after the wide-screen correction.

## Screenshots and local preview

- `before-services-section-1440.png` / `after-services-section-1440.png`
- `after-services-section-1899.png` / `after-services-section-1688.png`
- `before-services-section-390.png` / `after-services-section-390.png`
- `after-home-1440.png` / `after-home-390.png`
- `after-contact-1440.png` / `after-contact-390.png`
- `after-contact-zoom-200.png`
- `reference-hero-video.png`
- `after-intro-1872.png` / `after-intro-1440.png` / `after-intro-390.png`
- `after-hero-intro-services-1872.png` / `after-hero-intro-services-1440.png` / `after-hero-intro-services-390.png`
- `before-video-brightness-1440.png` / `after-video-opening-1440.png`
- `after-video-charger-1440.png` / `after-video-stairs-1440.png` / `after-video-loop-1440.png`
- `after-video-poster-390.png`

Screenshots are in this folder. Section-only captures hide the fixed header and skip link to show the complete services section clearly. Original audit screenshots remain in `notes/ui-audit/`.

Production preview: `http://127.0.0.1:3100`. This is a local process; it must be restarted if the terminal session closes.

## Missing verified information

Verified phone/email, final enquiry recipient and delivery credentials, sender domain/inbox receipt confirmation, final logo, confirmed service priorities/coverage, any advertised hours/credentials/insurance, photo permissions and approved captions, and privacy retention/access practices remain launch requirements. No business history, reviews, guarantees, or project outcomes were invented. Photos/plans can be shared during follow-up; uploads are not implemented.

Routes, redirects, quote API protections, metadata, and preview indexing controls were preserved. Real delivery and external hosting remain unverified.
