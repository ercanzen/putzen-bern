import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 1200 });
await page.goto('http://127.0.0.1:3001', { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(4000);

// Find gallery section by its background color
await page.evaluate(() => {
  const sections = document.querySelectorAll('section');
  for (const s of sections) {
    if (getComputedStyle(s).backgroundColor === 'rgb(249, 249, 249)') {
      s.scrollIntoView({ block: 'start' });
      break;
    }
  }
});
await page.waitForTimeout(2000);
await page.screenshot({ path: 'ss_gallery_full.png' });
console.log('gallery_full done');

// scroll down a bit to see the bottom of gallery
await page.evaluate(() => window.scrollBy(0, 600));
await page.waitForTimeout(1500);
await page.screenshot({ path: 'ss_gallery_bottom.png' });
console.log('gallery_bottom done');

await browser.close();
console.log('ALL DONE');
