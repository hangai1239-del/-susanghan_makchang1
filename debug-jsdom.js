const fs = require('fs');
const { JSDOM } = require('jsdom');

(async () => {
  const html = fs.readFileSync('menu.html', 'utf8');
  const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable', url: 'http://localhost:8000/menu.html?debug=1' });

  // Wait for scripts to run
  await new Promise((resolve) => {
    dom.window.document.addEventListener('DOMContentLoaded', () => {
      setTimeout(resolve, 200); // give extra time for resources
    });
  });

  const imgs = Array.from(dom.window.document.querySelectorAll('.menu-card-image img'));
  console.log('Images found:', imgs.length);
  imgs.forEach((img, i) => console.log(i + 1, img.getAttribute('src'), 'naturalWidth:', img.naturalWidth, 'complete:', img.complete));

  // Check console errors captured by jsdom
  if (dom.window.consoleMessages) {
    console.log('Console messages captured:', dom.window.consoleMessages);
  }

  // Print any JS errors
  // jsdom doesn't provide a direct API for errors; we'll listen to window.error
  dom.window.addEventListener('error', (e) => {
    console.error('Window error:', e.error ? e.error.stack : e.message);
  });
})();