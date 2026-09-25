import { chromium } from 'playwright';

const palettes = [
  { name: 'electric-blue', dark: '#101F33', accent: '#40ACD0', light: '#F5F8FC', ink: '#16283B', onAccent: '#101F33', onDarkAccent: '#40ACD0' },
  { name: 'carbon-red', dark: '#1A2228', accent: '#C83D33', light: '#F6F6F3', ink: '#182329', onAccent: '#FFFFFF', onDarkAccent: '#FF8A7D' },
  { name: 'deep-green', dark: '#14332E', accent: '#35BF91', light: '#F2F7F5', ink: '#16342E', onAccent: '#14332E', onDarkAccent: '#35BF91' },
];

const browser = await chromium.launch({ headless: true, channel: 'msedge' });
try {
  for (const palette of palettes) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.addStyleTag({ content: `
      :root { --paper: ${palette.light}; --paper-dark: ${palette.light}; --graphite: ${palette.dark}; --amber: ${palette.accent}; --bronze-ink: ${palette.ink}; }
      body, .reference-home { background: ${palette.light} !important; color: ${palette.ink} !important; }
      .reference-hero-video { visibility: hidden !important; }
      .site-header, body:has(.reference-home) .site-header.is-compact { background: ${palette.dark} !important; }
      body:has(.reference-home) .site-header:not(.is-compact) { background: linear-gradient(180deg, ${palette.dark}, transparent) !important; }
      .brand-name b, .reference-hero h1 em, .reference-services-intro .eyebrow, .reference-services-intro h2 em,
      .reference-service-top, .reference-service-link b { color: ${palette.onDarkAccent} !important; }
      .signal-dot { background: ${palette.accent} !important; }
      .header-quote, .reference-hero-actions .button-amber { background: ${palette.accent} !important; color: ${palette.onAccent} !important; }
      .header-quote:hover, .reference-hero-actions .button-amber:hover { background: ${palette.accent} !important; color: ${palette.onAccent} !important; filter: brightness(1.08); }
      .reference-services, .site-footer { background: ${palette.dark} !important; }
      .reference-service:hover { background: ${palette.dark} !important; filter: brightness(1.25); }
      .reference-all-services { border-color: ${palette.onDarkAccent} !important; }
      .trade-scope-copy h2 em, .trade-panel-title strong, .reference-heading-row h2 em,
      .reference-approach-title h2 em, .reference-faq h2 em { color: ${palette.ink} !important; }
      .closing-cta { background: ${palette.accent} !important; color: ${palette.onAccent} !important; }
    ` });
    await page.waitForTimeout(450);
    await page.screenshot({ path: `notes/screenshots/palette-${palette.name}.png` });
    await page.close();
  }
} finally {
  await browser.close();
}
