// https://medium.com/@seotanvirbd/scraping-indeed-com-a-step-by-step-guide-using-playwright-and-beautifulsoup-bcd55ac921d2

import type { WebScraper } from './baseScrape';
import type { ScrapedJobInfo } from './webScraperTypes';

const scrapeIndeed = async (webScraper: WebScraper) => {
  const indeedPage = await webScraper.navigateToPage(
    'https://www.indeed.com/jobs?q=web+developer&l=Modesto%2C+CA&from=searchOnDesktopSerp&cf-turnstile-response=0.lWFVbBUGcsMkPM17RcMOWlEQnoFnJ-aLx_RWf6VeF2Qz1KIyZl9bdmrtH48S9lmNEJ20OEyyRiXkdrfGAeCZKg5hBgRXM38GmfdRpCYTwGAx4RV3M9aPw5YiqbWvhKdVzHm9acEESHDHhGXzK4_ZAynQfxT9GdcshPbwKZJ3IwlaC5xEOfy94ruJDxHjkeyBowYB6Q72jWbQK1Y8rjaGFPIpQdrz_lvJp2LJY45KUtH2QA3tiHkqMqQ5jUPo9BmomsSIjB2HSDkm1T3tm8pAsE1fK1S61uTBIG7gRtSJnaK-lPWO50AdlWPfqzg26cl393VX2zLc6Bj53L_kA5bi5lhIOU1oxoYGJvfLcg1n_EHhrN6Pp-2ROU_sqb2Dl7y89sxSopvSDrnVVqgK_AzHgi9ZBcrOYNEYObTO7dRAkgaatvtpzvN-Bjg0qUrtlD8HGDntAq3PMdzbonze3sydmJ2tAFa8I3RxwM6q06dKfy2jJIp27lpbXga7K3e4jvQzZYfp4qXEUzmoWib8hR01LCaMxwTGjNmg3XU6vDJ4i9wUcbctF7Jct2w3cWUj_C8svvdpFdDpC0k4zE9cBvTC4SS9JzrBjNPgwgsO3O2r9qIGpxo9iDuyt-VnUUblAydZSK99m6mPWJ0vuhza3pPYhe94fX08ZI3Ht_RQlqvbEsV5AICpNH0ik8xzOUXZb9tc5uZLzuNsL-lia4vFuluGo3tHRExbf7GkHwlWNtb1rOFhM5palGjFCVjumqVwgjuyUWaNndAszkOx7D30I1MOIxlVf98g-9kvX4qWRiyQxo4.t8q0hCOHdnk1OrMGWDHlfg.c8ebefb6ad79c0740c5bcc71c57294a67f488379cced66c805b9a087d0f5f492&vjk=fa245539945789ea',
  );

  try {
    await indeedPage.waitForTimeout(webScraper.getRandomTimeInterval());

    const jobSearchPane = await indeedPage
      .locator('div.job_seen_beacon > table > tbody > tr > td.resultContent')
      .all();

    const jobInfo: ScrapedJobInfo[] = [];
    // for (const job of jobSearchPane) {
    for (let i = 0; i < 5; i++) {
      const job = jobSearchPane[i];
      await job.scrollIntoViewIfNeeded();
      await job.click({ button: 'left' });

      await indeedPage.waitForTimeout(webScraper.getRandomTimeInterval());

      const jobTitle = await indeedPage
        .locator('div.jobsearch-InfoHeaderContainer > div > div > h2')
        .innerText();

      // Evaluates if the company name functions as a link, if so the text from the a element is grabbed, else the text from the span is grabbed.
      const jobCompany = await indeedPage
        .locator('div.jobsearch-InfoHeaderContainer > div > div > div > span > a')
        .or(
          indeedPage
            .locator('div.jobsearch-InfoHeaderContainer > div > div > div > span')
            .first(),
        )
        .first()
        .innerText();

      const jobLocation = await indeedPage
        .locator('div.jobsearch-InfoHeaderContainer > div > div > div > div > div')
        .or(
          indeedPage.locator(
            'div.jobsearch-InfoHeaderContainer > div > div > div > div > div > div',
          ),
        )
        .first()
        .innerText();

        // Currently not working, fails to grab the job pay element
      let jobPay = await webScraper.getNthElementText(
        indeedPage,
        'div.js-match-insights-provider-16m282m > div.js-match-insights-provider-e6s05i > div.js-match-insights-provider-kyg8or > ul > li > div > div > div > span',
        0,
      );

      const isValidPay = webScraper.checkForNumber(jobPay);

      if (!isValidPay) jobPay = 'N/A';

      const jobDescription = await indeedPage
        .locator('div.jobsearch-JobComponent-description > div#jobDescriptionText')
        .allInnerTexts();

      const pageURL = indeedPage.url();

      const currentJob: ScrapedJobInfo = {
        title: jobTitle,
        company: jobCompany,
        location: jobLocation,
        origin: 'indeed.com',
        pay: jobPay,
        url: pageURL,
        description: jobDescription.join('|'),
      };

      jobInfo.push(currentJob);
    }

    await indeedPage.waitForTimeout(webScraper.getRandomTimeInterval());
    await indeedPage.close();

    return jobInfo;
  } catch (err) {
    console.error('[ERROR]: scrapeIndeed', err);
    await indeedPage.close();
    return null;
  }
};

export { scrapeIndeed };
