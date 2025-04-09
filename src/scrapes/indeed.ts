import type { WebScraper } from './baseScrape';
import type { ScrapedJobInfo } from './webScraperTypes';
import { expect } from 'patchright/test';

const scrapeIndeed = async (webScraper: WebScraper) => {
  const indeedPage = await webScraper.navigateToPage(
    'https://www.indeed.com/jobs?q=web+developer&l=Modesto%2C+CA&from=searchOnDesktopSerp&cf-turnstile-response=0.lWFVbBUGcsMkPM17RcMOWlEQnoFnJ-aLx_RWf6VeF2Qz1KIyZl9bdmrtH48S9lmNEJ20OEyyRiXkdrfGAeCZKg5hBgRXM38GmfdRpCYTwGAx4RV3M9aPw5YiqbWvhKdVzHm9acEESHDHhGXzK4_ZAynQfxT9GdcshPbwKZJ3IwlaC5xEOfy94ruJDxHjkeyBowYB6Q72jWbQK1Y8rjaGFPIpQdrz_lvJp2LJY45KUtH2QA3tiHkqMqQ5jUPo9BmomsSIjB2HSDkm1T3tm8pAsE1fK1S61uTBIG7gRtSJnaK-lPWO50AdlWPfqzg26cl393VX2zLc6Bj53L_kA5bi5lhIOU1oxoYGJvfLcg1n_EHhrN6Pp-2ROU_sqb2Dl7y89sxSopvSDrnVVqgK_AzHgi9ZBcrOYNEYObTO7dRAkgaatvtpzvN-Bjg0qUrtlD8HGDntAq3PMdzbonze3sydmJ2tAFa8I3RxwM6q06dKfy2jJIp27lpbXga7K3e4jvQzZYfp4qXEUzmoWib8hR01LCaMxwTGjNmg3XU6vDJ4i9wUcbctF7Jct2w3cWUj_C8svvdpFdDpC0k4zE9cBvTC4SS9JzrBjNPgwgsO3O2r9qIGpxo9iDuyt-VnUUblAydZSK99m6mPWJ0vuhza3pPYhe94fX08ZI3Ht_RQlqvbEsV5AICpNH0ik8xzOUXZb9tc5uZLzuNsL-lia4vFuluGo3tHRExbf7GkHwlWNtb1rOFhM5palGjFCVjumqVwgjuyUWaNndAszkOx7D30I1MOIxlVf98g-9kvX4qWRiyQxo4.t8q0hCOHdnk1OrMGWDHlfg.c8ebefb6ad79c0740c5bcc71c57294a67f488379cced66c805b9a087d0f5f492&vjk=fa245539945789ea',
  );
  const jobInfo: ScrapedJobInfo[] = [];

  try {
    const jobSearchPaneSelector =
      'div.job_seen_beacon > table > tbody > tr > td.resultContent';
    let isNextPageAvailable = true;

    do {
      await indeedPage.waitForSelector(jobSearchPaneSelector, { state: 'attached' });
      await expect(indeedPage.locator(jobSearchPaneSelector).first()).toBeAttached();
      const jobSearchPane = await indeedPage.locator(jobSearchPaneSelector).all();

      for (const job of jobSearchPane) {
        await expect(job).toBeAttached();
        await job.scrollIntoViewIfNeeded({ timeout: 3000 });
        await expect(job).toBeInViewport();
        await job.click({ button: 'left' });

        await indeedPage.waitForLoadState('networkidle');

        const jobTitle = await indeedPage
          .locator('div.jobsearch-InfoHeaderContainer > div > div > h2')
          .innerText();

        let jobCompany = await webScraper.getElement(
          indeedPage,
          'div.jobsearch-InfoHeaderContainer > div > div > div > span > a',
        );

        if (jobCompany === null) {
          jobCompany = await webScraper.getElement(
            indeedPage,
            'div.jobsearch-InfoHeaderContainer > div > div > div > span',
          );
        }

        let jobLocation = await webScraper.getElement(
          indeedPage,
          'div.jobsearch-InfoHeaderContainer > div > div > div > div > div',
        );

        if (jobLocation === null) {
          jobLocation = await webScraper.getElement(
            indeedPage,
            'div.jobsearch-InfoHeaderContainer > div > div > div > div > div > div',
          );
        }

        let jobPay = await webScraper.getNthElementText(
          indeedPage,
          'div.js-match-insights-provider-16m282m > div.js-match-insights-provider-e6s05i > div.js-match-insights-provider-kyg8or > ul > li > div > div > div > div > span',
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

      const nextPageElement = indeedPage.getByTestId('pagination-page-next');

      if (await nextPageElement.isVisible()) {
        await nextPageElement.scrollIntoViewIfNeeded();
        await nextPageElement.click({ button: 'left' });
        await indeedPage.waitForLoadState('networkidle');
      } else {
        isNextPageAvailable = false;
      }
    } while (isNextPageAvailable);

    await indeedPage.close();

    return { jobResults: jobInfo, error: false };
  } catch (err) {
    console.error('[ERROR]: scrapeIndeed', err);
    await indeedPage.close();
    return { jobResults: jobInfo, error: true };
  }
};

export { scrapeIndeed };
