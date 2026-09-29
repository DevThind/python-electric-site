# Python Electric typography review

Reviewed 29 September 2026. Recommendation: Manrope V5 for headings and the wordmark, with DM Sans for body copy and interface text.

The site combines architectural photography, navy backgrounds, cyan accents, large headlines, and practical service information. Typography should communicate care and competence, give the headlines character, and remain easy to read in the enquiry form. The comparisons below are design judgments for this site, rather than a universal ranking of fonts.

| Family | Assessment on this website | Decision |
| --- | --- | --- |
| Inter (previous font) | Clear interface text, but using it for everything gives the website a familiar application-like appearance. | Replace. |
| Satoshi | Polished, balanced headlines and good mobile fit. Visually closer to the previous Inter treatment than Manrope in the page comparisons. | Strong alternative. |
| Barlow | Compact and practical, with a utilitarian character. Fits the electrical trade, but feels less suited to the architectural photography. | Alternative for a more industrial direction. |
| Manrope V5 | Geometric letterforms complement the architecture and create distinctive headlines. The original 800-weight hero treatment was visually heavy. | Use 700 for the hero, 650 for other headings, and 800 for the wordmark. |
| DM Sans | Comfortable paragraph, navigation, button, and form text. Keeps the smaller type calm alongside Manrope's geometric headings. | Use for body and interface text. |

The original page sizes and line heights are retained. Heading tracking is tuned to the new family. Both font files are locally hosted through `next/font/local`, with `swap` loading and metric-adjusted Arial fallbacks. The two WOFF2 files total 87,968 bytes, compared with 48,256 bytes for the previous Inter file. The original Manrope V5 file is preserved without modification, with its license and attribution; the existing DM Sans OFL is retained.

The designer recommends the official Manrope download over the Google Fonts version and notes that variable fonts may render differently at small sizes on some platforms. Manrope is therefore used for display text; DM Sans handles smaller reading and interface text. Manrope has no true italic, which fits the site's existing upright heading treatment.

Compared the candidates on the actual homepage and services page at 1440px and 390px. Verified the applied pairing across the homepage at 320, 360, 390, 768, 1024, 1440, and 1920px, and across services, all four service detail pages, projects, about, contact, and privacy at 320, 390, and 1440px. Checks cover actual rendered font families, hero weight and line height, external font requests, horizontal overflow, and clipped headings.

Preview captures: [desktop homepage](ui-redesign/after-manrope-top-1440.png), [mobile homepage](ui-redesign/after-manrope-top-390.png), and [mobile services](ui-redesign/after-manrope-services-390.png).

Primary sources: [official Manrope description, download, rendering notes, and license](https://www.sharanda.com/manrope), [Satoshi from Fontshare](https://www.fontshare.com/fonts/satoshi), [Barlow designer repository](https://github.com/jpt/barlow), and [DM Sans project](https://github.com/googlefonts/dm-fonts). Next.js integration follows the installed version's documentation in `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md` and `01-app/03-api-reference/02-components/font.md`.
