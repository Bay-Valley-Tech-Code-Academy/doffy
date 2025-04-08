import type { WebScraper } from './baseScrape';
import type { ScrapedJobInfo } from './webScraperTypes';

const scrapeMonster = async (webScraper: WebScraper) => {
  const monsterPage = await webScraper.navigateToPage(
    'https://www.monster.com/jobs/search?q=Web+Developer&where=Modesto%2C+CA&page=1&so=m.s.sh',
  );
  const jobInfo: ScrapedJobInfo[] = [];

  try {
    await monsterPage.waitForTimeout(webScraper.getRandomTimeInterval());

    const jobSearchPane = await monsterPage.getByTestId('JobCard').all();

    await monsterPage.waitForTimeout(webScraper.getRandomTimeInterval());

    for (const job of jobSearchPane) {
      await job.scrollIntoViewIfNeeded();
      await job.click({ button: 'left' });

      await monsterPage.waitForTimeout(webScraper.getRandomTimeInterval());

      const jobTitle = await monsterPage
        .locator('h2.header-style__JobViewHeaderJobName-sc-ccb9c1ec-9')
        .innerText();

      const jobCompany = await monsterPage
        .locator('li.header-style__JobViewHeaderCompanyName-sc-ccb9c1ec-12')
        .innerText();

      // Grabs the first list item found on the page, which is the job location.
      const jobLocation = await monsterPage
        .locator('div.header-style__JobViewHeaderDetails-sc-ccb9c1ec-10 > ul > li')
        .first()
        .innerText();

      const jobPay = await webScraper.getElementText(
        monsterPage,
        'ul.header-style__JobViewHeaderTagsContainer-sc-ccb9c1ec-11 > li > div.indexmodern__TagComponent-sc-6pvrvp-0 > span.indexmodern__TagLabel-sc-6pvrvp-1',
      );

      const jobDescription = await monsterPage
        .getByTestId('svx-description-container-inner')
        .allInnerTexts();

      const pageURL = monsterPage.url();

      const currentJob: ScrapedJobInfo = {
        title: jobTitle,
        company: jobCompany,
        location: jobLocation,
        origin: 'monster.com',
        pay: jobPay,
        url: pageURL,
        description: jobDescription.join('|'),
      };

      jobInfo.push(currentJob);
    }

    await monsterPage.close();

    return { jobResults: jobInfo, error: false };
  } catch (error) {
    console.error(error);
    await monsterPage.close();
    return { jobResults: jobInfo, error: true };
  }
};

export { scrapeMonster };
