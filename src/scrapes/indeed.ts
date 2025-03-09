// https://medium.com/@seotanvirbd/scraping-indeed-com-a-step-by-step-guide-using-playwright-and-beautifulsoup-bcd55ac921d2

import type { WebScraper } from './baseScrape';

const scrapeIndeed = async (webScraper: WebScraper) => {
  try {
    const indeedPage = await webScraper.navigateToPage(
      'https://www.indeed.com/jobs?q=web+developer&l=Modesto%2C+CA&from=searchOnDesktopSerp&cf-turnstile-response=0.lWFVbBUGcsMkPM17RcMOWlEQnoFnJ-aLx_RWf6VeF2Qz1KIyZl9bdmrtH48S9lmNEJ20OEyyRiXkdrfGAeCZKg5hBgRXM38GmfdRpCYTwGAx4RV3M9aPw5YiqbWvhKdVzHm9acEESHDHhGXzK4_ZAynQfxT9GdcshPbwKZJ3IwlaC5xEOfy94ruJDxHjkeyBowYB6Q72jWbQK1Y8rjaGFPIpQdrz_lvJp2LJY45KUtH2QA3tiHkqMqQ5jUPo9BmomsSIjB2HSDkm1T3tm8pAsE1fK1S61uTBIG7gRtSJnaK-lPWO50AdlWPfqzg26cl393VX2zLc6Bj53L_kA5bi5lhIOU1oxoYGJvfLcg1n_EHhrN6Pp-2ROU_sqb2Dl7y89sxSopvSDrnVVqgK_AzHgi9ZBcrOYNEYObTO7dRAkgaatvtpzvN-Bjg0qUrtlD8HGDntAq3PMdzbonze3sydmJ2tAFa8I3RxwM6q06dKfy2jJIp27lpbXga7K3e4jvQzZYfp4qXEUzmoWib8hR01LCaMxwTGjNmg3XU6vDJ4i9wUcbctF7Jct2w3cWUj_C8svvdpFdDpC0k4zE9cBvTC4SS9JzrBjNPgwgsO3O2r9qIGpxo9iDuyt-VnUUblAydZSK99m6mPWJ0vuhza3pPYhe94fX08ZI3Ht_RQlqvbEsV5AICpNH0ik8xzOUXZb9tc5uZLzuNsL-lia4vFuluGo3tHRExbf7GkHwlWNtb1rOFhM5palGjFCVjumqVwgjuyUWaNndAszkOx7D30I1MOIxlVf98g-9kvX4qWRiyQxo4.t8q0hCOHdnk1OrMGWDHlfg.c8ebefb6ad79c0740c5bcc71c57294a67f488379cced66c805b9a087d0f5f492&vjk=fa245539945789ea',
    );

    await indeedPage.waitForTimeout(10000);

    // const jobInfo = await indeedPage.$$eval(
    //   '#jobsearch-ViewjobPaneWrapper > div.fastviewjob.jobsearch-ViewJobLayout--embedded.css-1sis433.eu4oa1w0.hydrated > div.jobsearch-JobComponent.css-1kw92ky.eu4oa1w0 > div.jobsearch-HeaderContainer.css-1obbpc8.eu4oa1w0 > div > div.css-1i8duct.e37uo190 > div > h2',
    //   (elements) => {
    //     const data: string[] = [];
    //     for (const el of elements) {
    //       data.push(el.innerHTML);
    //     }
    //   },
    // );

    await indeedPage.waitForTimeout(10000);
    await indeedPage.close();

    return '';
  } catch (err) {
    console.error('[ERROR]: scrapeIndeed', err);
    await webScraper.closeScraper();
  }
};

export { scrapeIndeed };
