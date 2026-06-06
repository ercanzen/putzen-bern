import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto('http://127.0.0.1:3001', { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(4000);

// Full page screenshot
await page.screenshot({ path: 'ss_full.png', fullPage: true });
console.log('full done');

await browser.close();
