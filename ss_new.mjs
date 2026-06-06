import { chromium } from 'playwright';

const browser = await chromium.launch();

// Desktop - navbar + references
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto('http://127.0.0.1:3001', { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(3500);

await page.screenshot({ path: 'new_navbar.png' });
console.log('navbar done');

await page.evaluate(() => {
  document.querySelectorAll('h2').forEach(h => {
    if (h.textContent.includes('Kunden')) h.scrollIntoView();
  });
});
await page.waitForTimeout(1500);
await page.screenshot({ path: 'new_refs.png' });
console.log('refs done');

// Stats section
await page.evaluate(() => window.scrollTo(0, 800));
await page.waitForTimeout(2000);
await page.screenshot({ path: 'new_stats.png' });
console.log('stats done');

// Mobile - sticky bar
const mob = await browser.newPage();
await mob.setViewportSize({ width: 375, height: 812 });
await mob.goto('http://127.0.0.1:3001', { waitUntil: 'load', timeout: 60000 });
await mob.waitForTimeout(3000);
await mob.evaluate(() => window.scrollTo(0, 1200));
await mob.waitForTimeout(1500);
await mob.screenshot({ path: 'new_mob_sticky.png' });
console.log('mob_sticky done');

await browser.close();
console.log('ALL DONE');
