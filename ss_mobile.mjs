import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

// Mobile - iPhone 375px
await page.setViewportSize({ width: 375, height: 812 });
await page.goto('http://127.0.0.1:3001', { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(3000);

await page.screenshot({ path: 'mob_hero.png' });
console.log('mob_hero done');

// CTA section
await page.evaluate(() => {
  const els = document.querySelectorAll('section');
  for (const el of els) {
    if (el.id === 'kontakt') { el.scrollIntoView(); break; }
  }
});
await page.waitForTimeout(1500);
await page.screenshot({ path: 'mob_cta.png' });
console.log('mob_cta done');

// Gallery on mobile
await page.evaluate(() => {
  const headings = document.querySelectorAll('h2');
  for (const h of headings) {
    if (h.textContent.includes('Auge')) { h.scrollIntoView(); break; }
  }
});
await page.waitForTimeout(1500);
await page.screenshot({ path: 'mob_gallery.png' });
console.log('mob_gallery done');

await browser.close();
console.log('ALL DONE');
