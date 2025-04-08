// https://medium.com/@seotanvirbd/scraping-indeed-com-a-step-by-step-guide-using-playwright-and-beautifulsoup-bcd55ac921d2

import type { WebScraper } from './baseScrape';
import type { ScrapedJobInfo } from './webScraperTypes';

const scrapeDice = async (webScraper: WebScraper) => {
  const dicePage = await webScraper.navigateToPage(
    'https://www.dice.com/jobs?q=web%20developer&location=Modesto,%20CA,%20USA&latitude=37.6392595&longitude=-120.9970014&countryCode=US&locationPrecision=City&radius=30&radiusUnit=mi&page=1&pageSize=100&language=en',
  );
  const jobResults: ScrapedJobInfo[] = [];

  try {
    await dicePage.waitForTimeout(webScraper.getRandomTimeInterval());

    const jobSearchCards = await dicePage.locator('a.card-title-link').all();

    for (const job of jobSearchCards) {
      await job.scrollIntoViewIfNeeded();
      await job.click({ button: 'left' });

      await dicePage.waitForTimeout(webScraper.getRandomTimeInterval());

      // Gets the newly opened tab.
      const currentTabs = dicePage.context().pages();
      const currentTab = currentTabs[currentTabs.length - 1];

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
      let jobPay: string = await webScraper.getNthElementText(
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

      jobResults.push(currentJob);

      await dicePage.waitForTimeout(webScraper.getRandomTimeInterval());

      await currentTab.close();
    }

    await dicePage.waitForTimeout(webScraper.getRandomTimeInterval());
    await dicePage.close();

    return jobResults;
  } catch (err) {
    console.error('[ERROR]: scrapeIndeed', err);
    await dicePage.close();
    return jobResults;
  }
};

export { scrapeDice };
