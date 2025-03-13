import type { WebScraper } from './baseScrape';

const scrapeMonster = async (webScraper: WebScraper) => {
  try {
    const monsterPage = await webScraper.navigateToPage(
      'https://www.monster.com/jobs/search?q=web+developer&where=Oakdale%2C+CA&page=2&so=m.h.s',
    );

    await monsterPage.waitForTimeout(webScraper.getRandomTimeInterval());

    const jobSearchPane = await monsterPage
      .locator('div#JobCardGrid > div.indexmodern__StyledJobCardsContainer-sc-9vl52l-40')
      .all();

    const jobInfo = [];
    for (const job of jobSearchPane) {
      await job.scrollIntoViewIfNeeded();
      await job.click({ button: 'left' });

      await monsterPage.waitForTimeout(webScraper.getRandomTimeInterval());
    }

    await monsterPage.close();

    return jobInfo;
  } catch (error) {
    console.error(error);
    await webScraper.closeScraper();
  }
};

export { scrapeMonster };
