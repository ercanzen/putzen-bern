import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto('http://127.0.0.1:3001', { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(4000);

// About section
await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2));
await page.waitForTimeout(1500);
await page.screenshot({ path: 'ss_about.png' });
console.log('about done');

// Services
await page.evaluate(() => window.scrollTo(0, window.innerHeight * 3.5));
await page.waitForTimeout(1500);
await page.screenshot({ path: 'ss_services.png' });
console.log('services done');

// Before/After + Gallery area
await page.evaluate(() => window.scrollTo(0, window.innerHeight * 6));
await page.waitForTimeout(1500);
await page.screenshot({ path: 'ss_gallery1.png' });
console.log('gallery1 done');

await page.evaluate(() => window.scrollTo(0, window.innerHeight * 7.5));
await page.waitForTimeout(1500);
await page.screenshot({ path: 'ss_gallery2.png' });
console.log('gallery2 done');

await page.evaluate(() => window.scrollTo(0, window.innerHeight * 9));
await page.waitForTimeout(1500);
await page.screenshot({ path: 'ss_gallery3.png' });
console.log('gallery3 done');

await page.evaluate(() => window.scrollTo(0, window.innerHeight * 11));
await page.waitForTimeout(1500);
await page.screenshot({ path: 'ss_bottom.png' });
console.log('bottom done');

await browser.close();
console.log('ALL DONE');
