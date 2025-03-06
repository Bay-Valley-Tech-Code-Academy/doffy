import { WebScraper } from './baseScrape';

const scrapeMonster = async () => {
  const zipRecruiterScraper = new WebScraper(
    // `https://www.ziprecruiter.com/`
    'https://www.monster.com/jobs/search?q=web+developer&where=Oakdale%2C+CA&page=2&so=m.h.s',
  );

  try {
    const zipRecruiterPage = await zipRecruiterScraper.initializeScraper();

    await zipRecruiterPage.waitForTimeout(zipRecruiterScraper.getRandomTimeInterval());

    await zipRecruiterPage.waitForTimeout(10000);

    await zipRecruiterPage.waitForSelector("div#JobCardGrid", {timeout: 5000});

    await zipRecruiterScraper.closeScraper();

    return '';
  } catch (error) {
    console.error(error);
    await zipRecruiterScraper.closeScraper();
  }
};

export { scrapeMonster };
