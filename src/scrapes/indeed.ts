// https://medium.com/@seotanvirbd/scraping-indeed-com-a-step-by-step-guide-using-playwright-and-beautifulsoup-bcd55ac921d2

import { WebScraper } from './baseScrape';

const scrapeIndeed = async () => {
  const indeedScraper = new WebScraper(`https://www.indeed.com/`);

  try {
    const indeedPage = await indeedScraper.initializeScraper();

    await indeedPage.waitForTimeout(10000);

    await indeedPage
      .locator(
        '#jobsearch-ViewjobPaneWrapper > div.fastviewjob.jobsearch-ViewJobLayout--embedded.css-1sis433.eu4oa1w0.hydrated > div.jobsearch-JobComponent.css-1kw92ky.eu4oa1w0 > div.jobsearch-HeaderContainer.css-1obbpc8.eu4oa1w0 > div > div.css-1i8duct.e37uo190 > div > h2',
      )
      .waitFor({ state: 'visible' });

    const jobInfo = await indeedPage.$$eval(
      '#jobsearch-ViewjobPaneWrapper > div.fastviewjob.jobsearch-ViewJobLayout--embedded.css-1sis433.eu4oa1w0.hydrated > div.jobsearch-JobComponent.css-1kw92ky.eu4oa1w0 > div.jobsearch-HeaderContainer.css-1obbpc8.eu4oa1w0 > div > div.css-1i8duct.e37uo190 > div > h2',
      (elements) => {
        const data: string[] = [];
        for (const el of elements) {
          data.push(el.innerHTML);
        }
      },
    );

    await indeedScraper.closeScraper();

    return jobInfo;
  } catch (err) {
    console.error('[ERROR]: scrapeIndeed', err);
    await indeedScraper.closeScraper();
  }
};

export { scrapeIndeed };
