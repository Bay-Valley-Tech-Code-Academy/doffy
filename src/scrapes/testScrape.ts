import type { WebScraper } from './baseScrape';

const scrapeTest = async (webScraper: WebScraper) => {
  const testPage = await webScraper.navigateToPage(
    `https://pixelscan.net/#what_website_see`,
  );

  try {
    await testPage.waitForTimeout(webScraper.getRandomTimeInterval());

    await testPage.waitForTimeout(10000);

    await testPage.close();

    return '';
  } catch (error) {
    console.error(error);
    await testPage.close();
    return null;
  }
};

export { scrapeTest };
