import type { WebScraper } from './baseScrape';

const scrapeMonster = async (webScraper: WebScraper) => {
  try {
    const monsterPage = await webScraper.navigateToPage(
      'https://www.monster.com/jobs/search?q=web+developer&where=Oakdale%2C+CA&page=2&so=m.h.s',
    );

    await monsterPage.waitForTimeout(webScraper.getRandomTimeInterval());

    await monsterPage.waitForTimeout(10000);

    await monsterPage.waitForSelector('div#JobCardGrid', { timeout: 5000 });

    await monsterPage.close();

    return '';
  } catch (error) {
    console.error(error);
    await webScraper.closeScraper();
  }
};

export { scrapeMonster };
