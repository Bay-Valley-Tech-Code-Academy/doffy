// https://medium.com/@seotanvirbd/scraping-indeed-com-a-step-by-step-guide-using-playwright-and-beautifulsoup-bcd55ac921d2

import { expect } from 'patchright/test';
import type { WebScraper } from './baseScrape';
import type { ScrapedJobInfo } from './webScraperTypes';

const scrapeDice = async (webScraper: WebScraper) => {
  const dicePage = await webScraper.navigateToPage(
    'https://www.dice.com/jobs?q=web%20developer&location=Modesto,%20CA,%20USA&latitude=37.6392595&longitude=-120.9970014&countryCode=US&locationPrecision=City&radius=30&radiusUnit=mi&page=1&pageSize=100&language=en',
  );
  const jobInfo: ScrapedJobInfo[] = [];
  const jobSearchCardsSelector = 'a.card-title-link';

  try {
    await dicePage.waitForTimeout(webScraper.getDelayTime());
    await dicePage.waitForSelector(jobSearchCardsSelector, { state: 'attached' });
    await expect(dicePage.locator(jobSearchCardsSelector).first()).toBeAttached();
    await dicePage.waitForSelector(jobSearchCardsSelector, { state: 'visible' });
    await expect(dicePage.locator(jobSearchCardsSelector).first()).toBeVisible();
    const jobSearchCards = await dicePage.locator(jobSearchCardsSelector).all();

    for (const job of jobSearchCards) {
      await expect(job).toBeAttached();
      await job.scrollIntoViewIfNeeded({ timeout: 3000 });
      await expect(job).toBeInViewport();
      await job.click({ button: 'left' });

      // Gets the newly opened tab.
      const currentContext = dicePage.context();
      const currentTab = await currentContext.waitForEvent('page');
      await currentTab.waitForLoadState();

      await dicePage.waitForTimeout(webScraper.getDelayTime());

      const jobTitle = await currentTab
        .locator('h1.flex.flex-wrap.text-center.ml-auto')
        .innerText();

      const jobCompany = await currentTab
        .locator('ul.companyInfo > li.mr-1 > a')
        .innerText();

      // Grabs the first instance of the li element containing this class, it will always be the li element containing the company name
      const jobLocation = await currentTab
        .locator('li.job-header_jobDetail__ZGjiQ')
        .first()
        .innerText();

      // Gets the job pay tab which is always the second tab so long as there are three overview tabs on the page
      let jobPay: string = await webScraper.checkNthElement(
        currentTab,
        'div.job-overview_detailContainer__TpXMD > div.job-overview_chipContainer__E4zOO > div > div.chip_chip__cYJs6 > span',
        1,
      );

      const isValidPay = webScraper.checkForNumber(jobPay);

      if (!isValidPay) jobPay = 'N/A';

      const jobDescription = await currentTab
        .getByTestId('jobDescriptionHtml')
        .allInnerTexts();

      const pageURL = currentTab.url();

      const currentJob: ScrapedJobInfo = {
        title: jobTitle,
        company: jobCompany,
        location: jobLocation,
        origin: 'Dice.com',
        pay: jobPay,
        url: pageURL,
        description: jobDescription.join('|'),
      };

      jobInfo.push(currentJob);

      await currentTab.close();
    }

    await dicePage.close();

    return { jobResults: jobInfo, error: false };
  } catch (err) {
    console.error('[ERROR]: scrapeIndeed', err);
    await dicePage.close();
    return { jobResults: jobInfo, error: true };
  }
};

export { scrapeDice };
