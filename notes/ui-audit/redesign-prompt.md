You are a senior product designer and frontend engineer. Implement a cohesive UI/UX redesign of this existing Python Electric website. Work directly in the repository and complete the implementation and verification.

Read AGENTS.md and the relevant installed Next.js guides under node_modules/next/dist/docs before coding. Read README.md, lib/content.ts, and notes/ui-audit/review.md. Inspect the current site and audit screenshots. Preserve unrelated changes.

Design objective

Make Python Electric feel like a premium, approachable Vancouver electrical contractor. Keep the recognizable midnight navy, electric cyan, off-white palette and locally bundled DM Sans font. Use genuine installation photography, precise alignment, restrained typography, and clear service choices to establish credibility.

Create one deliberate visual system: semantic color tokens, consistent content widths and spacing, a restrained heading scale, readable body text, consistent buttons and borders, and clear hover/focus states. Retain strong typography in the hero, then use calmer mixed-case section headings. Reduce excessive uppercase text, extremely tight tracking, tiny labels, and oversized blank areas. Keep animation subtle and respect reduced motion.

Homepage

1. Refine the hero with a concrete headline such as “Electrical services for Vancouver homes and businesses,” concise supporting copy, one primary “Request a quote” button, and a secondary services link. Keep the existing desktop hero video, but improve text readability across its frames. Add an accessible pause/play control and pause offscreen/backgrounded playback. Use the poster on small screens, reduced-motion settings, and data-saving connections without unnecessarily downloading the video. Replace fixed mobile hero heights with responsive, content-aware sizing that works on short screens.
2. Keep the four existing service categories and URLs. Make the cards compact, consistent, and easy to scan. Surface examples such as repairs, lighting, renovations, panel/circuit work, charging, and restoration within the appropriate categories. Avoid a long uninterrupted dark service section.
3. Add a prominent “Selected installations” section with three carefully chosen genuine work photos from lib/content.ts and public/images/work-*.jpg, descriptive captions, and a link to /work. Preserve important image details when cropping. Service illustrations and the hero must not be presented as documented company projects.
4. Replace the oversized intake diagram and repetitive paragraphs with a brief, truthful company introduction and a compact enquiry process. Keep a useful FAQ and add a clear closing quote CTA. Rebalance existing space so these improvements do not simply make the page much longer.

Other pages and conversion

- Apply the same visual system to Services, all service details, Projects, About, Contact, Privacy, and error/empty states. Shorten oversized page introductions and bring useful content higher.
- Give the gallery deliberate spacing and readable captions. Add an accessible dialog name, previous/next buttons, keyboard arrow navigation, and an image counter. Preserve Escape, focus return, and correct modal scrolling.
- Make About explain the company and visible craftsmanship using the available facts. Remove repetitive form instructions.
- Make Contact compact: a short introduction followed immediately by the form on mobile, with a clear two-column composition on desktop. Use input text of at least 16px. Preserve service preselection, the email-or-phone requirement, “Not sure yet,” labels, validation, pending/success/error states, and entered values on failure.
- Use “Request a quote” consistently for primary navigation and page CTAs, preserving service query parameters. Keep submission wording appropriate to sending an enquiry.
- Since attachments are not implemented, say photos/plans can be shared during follow-up. Do not imply an upload capability.
- Render telephone/email links only if verified values exist in the content configuration; list missing business information in the handover.

Confirmed bugs and implementation quality

- Fix the mobile/tablet menu after scrolling. The compact header's backdrop-filter currently constrains its nested fixed backdrop to 68px high. Ensure the overlay covers the viewport, the background is inert, outside-click dismissal works, and keyboard focus/scroll locking behave correctly.
- Fix the open Services dropdown label contrast. Add an accessible disclosure control with keyboard, Escape, touch, and outside-click behavior while retaining a route to all services.
- Consolidate the historical styling layers in app/globals.css, app/editorial.css, and app/electrical.css. Use one semantic token system, remove confirmed unused rules, and avoid appending another override layer. Scoped styles are welcome; a new framework or component library is unnecessary.
- Preserve the existing route structure, redirects, quote API validation/rate limiting/honeypot/delivery behavior, SEO metadata, and preview noindex controls. Do not publish or send real enquiries as part of this design task.
- Do not invent ratings, testimonials, licence/insurance claims, years in business, response times, guarantees, emergency availability, contact details, coverage areas, project locations, or case-study outcomes. Keep missing facts out of public copy and report them separately.

Acceptance and handover

Run typecheck, lint, and a production build. Inspect the production preview and capture before/after screenshots at 390px and 1440px. Also check 360, 768, and 1024px widths, short landscape screens, and 200% zoom. Verify no horizontal overflow, clipped headings, hidden controls, or broken images.

Check keyboard navigation, dropdown states, the mobile menu before/after scrolling, gallery controls, FAQs, reduced motion, service-prefilled contact links, invalid input, and mocked delivery failure/value preservation. Run accessibility checks on both default and expanded states; manually inspect text over video. Update existing browser scripts that still expect the removed Lighting option or old service URLs, while retaining redirect checks. Do not claim production performance or accessibility scores without measuring them.

Finish with a concise summary of the design changes, actual checks and results, screenshot locations, and remaining verified-content or delivery requirements. Complete the implementation rather than stopping at a plan.
