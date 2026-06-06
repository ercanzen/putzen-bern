import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 1100 });
await page.goto('http://127.0.0.1:3001', { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(4000);

// Scroll to gallery by evaluating
await page.evaluate(() => {
  const headings = document.querySelectorAll('h2');
  for (const h of headings) {
    if (h.textContent.includes('Auge') || h.textContent.includes('Detail')) {
      h.scrollIntoView({ block: 'start' });
      return;
    }
  }
});
await page.waitForTimeout(2000);
await page.screenshot({ path: 'ss_gal_top.png' });
console.log('gal_top done');

await page.evaluate(() => window.scrollBy(0, 800));
await page.waitForTimeout(1500);
await page.screenshot({ path: 'ss_gal_mid.png' });
console.log('gal_mid done');

await page.evaluate(() => window.scrollBy(0, 800));
await page.waitForTimeout(1500);
await page.screenshot({ path: 'ss_gal_bot.png' });
console.log('gal_bot done');

await browser.close();
console.log('ALL DONE');
