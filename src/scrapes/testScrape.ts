import type { WebScraper } from './baseScrape';

const scrapeTest = async (webScraper: WebScraper) => {
  try {
    const testPage = await webScraper.navigateToPage(
      `https://pixelscan.net/#what_website_see`,
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
