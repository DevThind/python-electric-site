# Hero opening replacement — 28 September 2026

Source: `C:/Users/91884/Downloads/Electricians_inspecting_exterior…_20260928205300.mp4` (8 seconds, 1280 × 720, 24 fps).

The new exterior inspection footage replaces the old opening. The existing EV charger and interior stair-lighting sequence remains. The previous montage also ended by fading back to the old opening; that return was removed and rebuilt using the new exterior clip.

The retained portion of the previous montage is 4.5–15.166667 seconds, excluding the baked transitions to the old opening. The new opening uses source time 0.5–5.5 seconds, giving five seconds at the start of playback. Its transition to the charger runs from playback time 4.5–5 seconds; the charger is fully visible at five seconds. The source's first half-second closes the loop. Half-second crossfades connect the segments so the end returns to the opening without a flash or black frame.

Final public asset: `public/videos/python-electric-hero.mp4`, 15.166667 seconds, 3,942,622 bytes, silent H.264/yuv420p, 1280 × 720 at 24 fps, fast-start MP4. The old montage used yuv444p; the new encode uses the more widely supported yuv420p format.

`public/images/python-electric-hero-poster.jpg` is a frame at one second from the supplied video. The source file was not modified. The previous public video and poster are saved here as `hero-before-opening-replacement.mp4` and `poster-before-opening-replacement.jpg`.

Presentation: the video has a CSS `brightness(1.08)` adjustment. The heavy uniform navy overlay was replaced with a lighter edge treatment and a central scrim behind the text. Mobile retains its readable poster overlay. Existing pause/play, offscreen pause, reduced-motion, small-screen, and Save-Data behavior is preserved.

Verification: FFmpeg decoded the complete final file without errors. Browser playback, seeks through all scenes, automatic looping, accessible pause/play, manual pause retention, and offscreen pause passed. Mobile, reduced motion, and Save-Data loaded the new poster without video requests. Typecheck, lint, and production build passed.

Contact sheets in this folder document the old sequence, supplied opening, and final sequence. Browser comparisons are under `notes/ui-redesign/`: `before-video-brightness-1440.png`, `after-video-opening-1440.png`, `after-video-charger-1440.png`, `after-video-stairs-1440.png`, `after-video-loop-1440.png`, and `after-video-poster-390.png`.
