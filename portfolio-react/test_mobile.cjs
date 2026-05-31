const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:5173');
  await page.waitForTimeout(2000); // Wait for shader to load
  await page.screenshot({ path: 'mobile_screenshot.png' });
  await browser.close();
})();
