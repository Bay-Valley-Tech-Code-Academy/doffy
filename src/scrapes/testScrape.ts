import type { WebScraper } from './baseScrape';

const scrapeTest = async (webScraper: WebScraper) => {
  try {
    const testPage = await webScraper.navigateToPage(
        'https://www.monster.com/jobs/search?q=web+developer&where=Oakdale%2C+CA&page=2&so=m.h.s'
    );

    await testPage.waitForTimeout(webScraper.getRandomTimeInterval());

    await testPage.waitForTimeout(10000);

    await testPage.close();

    return '';
  } catch (error) {
    console.error(error);
    await webScraper.closeScraper();
  }
};

export { scrapeTest };
