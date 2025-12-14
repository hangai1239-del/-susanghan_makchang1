const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8000/menu.html', { waitUntil: 'networkidle2' });

  const imgs = await page.$$eval('.menu-card-image img', imgs => imgs.map(i => ({ src: i.src, naturalWidth: i.naturalWidth, complete: i.complete })));
  console.log('imgs:', imgs);

  await page.screenshot({ path: 'menu-screenshot.png', fullPage: true });
  console.log('screenshot saved: menu-screenshot.png');

  // Also capture network responses for images
  const resources = await page.evaluate(() => window.__RESOURCE_LOG || []);
  console.log('resource log length (from page):', resources.length);

  await browser.close();
})();