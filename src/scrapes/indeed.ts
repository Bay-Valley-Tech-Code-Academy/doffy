import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

const startIndeedScrape = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewport({ width: 800, height: 600 });

  console.log('Starting indeed scrape');

  await page.goto('https://developer.chrome.com/');

  // Set screen size.
  await page.setViewport({width: 1080, height: 1024});

  // Type into search box.
  await page.locator('.devsite-search-field').fill('automate beyond recorder');

  // Wait and click on first result.
  await page.locator('.devsite-result-item-link').click();

  // Locate the full title with a unique string.
  const textSelector = await page
    .locator('text/Customize and automate')
    .waitHandle();
  const fullTitle = await textSelector?.evaluate(el => el.textContent);

  // Print the full title.
  console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close();

  return `The title of this blog post is ${fullTitle}.`;
}

export { startIndeedScrape }
