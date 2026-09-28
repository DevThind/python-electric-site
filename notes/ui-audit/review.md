# Python Electric UI and UX review

Reviewed the current local Next.js site on 27 September 2026. Application source was not changed. This folder contains audit scripts, screenshots, results, and a separate ready-to-use redesign prompt.

## Overall assessment

The navy/cyan palette, local DM Sans typeface, service taxonomy, image assets, and functioning form interactions provide a useful foundation. The main weakness is the allocation of attention: very large promotional headings and repeated enquiry instructions dominate, while genuine installation photography and company identity receive little homepage space. The site should feel like an approachable, established local trade business through truthful content, stronger visual hierarchy, and visible workmanship.

## Prioritized recommendations

1. **Fix the mobile/tablet menu backdrop.** After scrolling the homepage, the compact header's backdrop-filter constrains the fixed backdrop nested within it. At 700 x 900, the backdrop measures only 700 x 68 while the drawer is 430 x 900. The rest of the page remains outside the backdrop hit area. Render the overlay outside the filtered header or use an equivalent robust modal structure. Evidence: `menu-scrolled-700.png`; `components/site-header.tsx`; `app/globals.css`.
2. **Show authentic work on the homepage.** The homepage contains hero, service cards, a large intake panel, and FAQs, but no selected installations. Add three carefully chosen supplied work photos before the repeated enquiry guidance. Keep descriptive captions and distinguish service illustrations from completed work. Evidence: `app/page.tsx`, `lib/content.ts`, `home-services-1440.png`.
3. **Calm the type hierarchy.** Heavy uppercase text, very tight tracking, and large section headings make too many elements equally emphatic. Preserve a strong headline, use mixed-case section titles, increase small navigation/action labels, and keep body copy around 16–18px. The services, contact, and about page introductions consume excessive space before their main content. Evidence: `home-1440-top.png`, `services-1440.png`, `contact-1440.png`, `about-390.png`.
4. **Bring the quote form forward.** At 1440px wide, the form begins approximately 728px down the document; at 390px wide, approximately 584px. Use a compact page introduction and put the form immediately below it on mobile. Retain the email-or-phone choice, service preselection, labels, validation, pending/error states, and value preservation. Mobile inputs currently compute to 15px; use at least 16px. Evidence: `results.json`, `contact-390.png`.
5. **Shorten and rebalance the homepage.** The current home document is approximately 4060px tall on desktop and 5415px at 390px width. The long dark service section and oversized intake graphic dominate. Make service cards more compact, use lighter surfaces for breathing room, and condense intake guidance into a short process section. Integrate project proof by replacing redundant space rather than indefinitely extending the page. Add a clear closing quote CTA.
6. **Make the copy more concrete.** Replace generic slogans with a location/service headline, explain what the business can help with, and standardize the primary CTA to “Request a quote.” About should focus on the business and visible craftsmanship, using only available facts. Text asks for photos/plans although the form has no attachment feature; say these can be shared during follow-up. Phone/email, team details, credentials, and reviews are missing verified content, not facts to invent.
7. **Improve interactive details.** The open Services dropdown fails the automated color-contrast check: its label is #526575 on #101F33. Add a clear disclosure button and Escape/outside-click behavior. Label the gallery dialog and add previous/next navigation and a counter. Preserve the successful Escape and focus-return behavior already present.
8. **Make hero motion deliberate.** Reduced-motion and Save-Data checks exist, but the video element is also mounted on normal mobile connections; there is no visible pause control. The mobile hero has a fixed 710px minimum height, and the tablet breakpoint uses 780px. Use content-aware sizing, a deliberate mobile poster policy, accessible playback controls, and pause when offscreen. A mobile browser may independently block autoplay; mounting the video is not proof it played in every environment.
9. **Consolidate the styles.** Root layout imports globals.css, editorial.css, and electrical.css in sequence. Multiple historical themes and obsolete component rules remain. These files total approximately 92.6 KB before compression. Replace accumulated overrides with one semantic token system and scoped component styles where helpful. Rename misleading amber/bronze tokens now used for cyan. This is a maintenance finding, not a measured performance failure.

## Verified strengths and limits

- Six principal pages were rendered at 1440px and 390px: home, services, EV detail, work, about, and contact. All returned 200 without page errors, broken images, or horizontal overflow in those checks.
- Additional homepage width checks passed at 360, 768, and 1024px. All other current service routes and privacy returned 200; the old lighting route redirected to services.
- Baseline WCAG-tagged axe checks reported no violations on the twelve page/viewport combinations. An additional check with the dropdown open found its contrast problem. Automated checks do not prove overall accessibility conformance.
- Skip-link order, mobile menu Escape/focus return, service preselection, first-invalid-field focus, and gallery Escape/focus return worked.
- An intercepted 503 response confirmed the form displays an error and preserves the message. No email was sent, and actual provider delivery was not verified.
- The screenshots use reduced motion to make the hero poster consistent. Next.js development UI appears in some captures and is not site content.
- This was a local development review, not a production Lighthouse report, field-performance measurement, Safari/device test, or full security assessment.

## Implementation boundary

Read README.md and lib/content.ts before rewriting copy. Do not fabricate telephone numbers, email addresses, licence/insurance claims, ratings, testimonials, years of experience, guarantees, emergency availability, service coverage, project locations, or client outcomes. Any verified information subsequently provided can be incorporated. Preserve quote API protections, current routes and redirects, metadata, and preview indexing controls.
