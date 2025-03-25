// https://medium.com/@seotanvirbd/scraping-indeed-com-a-step-by-step-guide-using-playwright-and-beautifulsoup-bcd55ac921d2

import type { WebScraper } from './baseScrape';
import type { ScrapedJobInfo } from './webScraperTypes';

const scrapeDice = async (webScraper: WebScraper) => {
  const dicePage = await webScraper.navigateToPage(
    'https://www.dice.com/jobs?q=web%20developer&location=Modesto,%20CA,%20USA&latitude=37.6392595&longitude=-120.9970014&countryCode=US&locationPrecision=City&radius=30&radiusUnit=mi&page=1&pageSize=100&language=en',
  );

  try {
    await dicePage.waitForTimeout(webScraper.getRandomTimeInterval());
    
    const jobSearchCards = await dicePage.locator("a.card-title-link").all();
    
    for (const job of jobSearchCards) {
        await job.scrollIntoViewIfNeeded();
        await job.click({button: 'left'})
        
        await dicePage.waitForTimeout(webScraper.getRandomTimeInterval());

        
        // Gets the current tabs and closes the newest one.
        const currentTabs = dicePage.context().pages();
        await currentTabs[currentTabs.length - 1].close();
    }

    await dicePage.waitForTimeout(webScraper.getRandomTimeInterval());
    await dicePage.close();

    return '';
  } catch (err) {
    console.error('[ERROR]: scrapeIndeed', err);
    await dicePage.close();
    return null;
  }
};

export { scrapeDice };
