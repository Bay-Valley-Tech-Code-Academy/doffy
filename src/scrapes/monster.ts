import type { WebScraper } from './baseScrape';

const scrapeMonster = async (webScraper: WebScraper) => {
  const monsterPage = await webScraper.navigateToPage(
    'https://www.monster.com/jobs/search?q=Web+Developer&where=Modesto%2C+CA&page=1&so=m.s.sh',
  );

  try {
    await monsterPage.waitForTimeout(webScraper.getRandomTimeInterval());

    const jobSearchPane = await monsterPage.getByTestId('JobCard').all();

    await monsterPage.waitForTimeout(webScraper.getRandomTimeInterval());

    const jobInfo = [];
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

      const jobDescription = await monsterPage
        .getByTestId('svx-description-container-inner')
        .allInnerTexts();

      jobInfo.push([jobTitle, jobCompany, jobLocation, jobDescription.join('|')]);
    }

    await monsterPage.close();

    return jobInfo;
  } catch (error) {
    console.error(error);
    await monsterPage.close();
    return null;
  }
};

export { scrapeMonster };
