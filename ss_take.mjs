import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto('http://127.0.0.1:3001', { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(4000);

await page.screenshot({ path: 'ss_hero.png' });
console.log('hero done');

await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2.5));
await page.waitForTimeout(1500);
await page.screenshot({ path: 'ss_mid.png' });
console.log('mid done');

await page.evaluate(() => window.scrollTo(0, window.innerHeight * 5));
await page.waitForTimeout(1500);
await page.screenshot({ path: 'ss_gallery.png' });
console.log('gallery done');

await page.evaluate(() => window.scrollTo(0, window.innerHeight * 7.5));
await page.waitForTimeout(1500);
await page.screenshot({ path: 'ss_lower.png' });
console.log('lower done');

await browser.close();
console.log('ALL DONE');
