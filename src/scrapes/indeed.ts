// https://medium.com/@seotanvirbd/scraping-indeed-com-a-step-by-step-guide-using-playwright-and-beautifulsoup-bcd55ac921d2

import { chromium } from 'playwright';

const userAgent =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36';

const scrapeIndeed = async () => {
  const browser = await chromium.launch({
    headless: false,
  });

  try {
    const context = await browser.newContext({ userAgent });
    await context.addInitScript(
      "Object.defineProperty(navigator, 'webdriver', { get: () => undefined })",
    );
    const page = await context.newPage();

    await page.goto(
      `https://www.indeed.com/q-junior-full-stack-developer-jobs.html?vjk=5146d61fb228626c`,
    );

    // Should use page.locator functions instead
    await page.waitForTimeout(1000);

    console.log('Dom content loaded');

    await page
      .locator(
        '#jobsearch-ViewjobPaneWrapper > div.fastviewjob.jobsearch-ViewJobLayout--embedded.css-1sis433.eu4oa1w0.hydrated > div.jobsearch-JobComponent.css-1kw92ky.eu4oa1w0 > div.jobsearch-HeaderContainer.css-1obbpc8.eu4oa1w0',
      )
      .waitFor({ state: 'visible' })
      .then(async () => {
        const viewedPostingTitle = await page.$eval(
          '#jobsearch-ViewjobPaneWrapper > div.fastviewjob.jobsearch-ViewJobLayout--embedded.css-1sis433.eu4oa1w0.hydrated > div.jobsearch-JobComponent.css-1kw92ky.eu4oa1w0 > div.jobsearch-HeaderContainer.css-1obbpc8.eu4oa1w0 > div > div.css-1i8duct.e37uo190 > div > h2',
          (el) => el.innerHTML,
        );
        console.log('viewedPostingTitle', viewedPostingTitle);
      });

    await browser.close();
  } catch (err) {
    console.error('[ERROR]: scrapeIndeed', err);
    await browser.close();
  }
};

export { scrapeIndeed };
