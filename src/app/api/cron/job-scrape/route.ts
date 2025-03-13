import { NextResponse } from 'next/server';

import { ResponseBuilder } from '../../../../lib/response-builder';

import { scrapeIndeed } from '~/scrapes/indeed';
import { scrapeZipRecruiter } from '~/scrapes/ziprecruiter';
import { scrapeMonster } from '~/scrapes/monster';
import { scrapeTest } from '~/scrapes/testScrape';

import { chromium } from 'patchright';
import { WebScraper } from '~/scrapes/baseScrape';

export const GET = async () => {
  try {
    const mainBrowser = await chromium.launch({
      headless: false,
      channel: 'chrome',
    });
    const webScraper = new WebScraper(mainBrowser);

    // const testScrape = await scrapeTest(webScraper);
    const zipRecruiter = await scrapeZipRecruiter(webScraper);
    const indeedResults = await scrapeIndeed(webScraper);
    const monster = await scrapeMonster(webScraper);

    await webScraper.closeScraper();

    return new NextResponse(
      ResponseBuilder({
        data: [zipRecruiter, indeedResults, monster],
        success: true,
      }),
    );
  } catch (err) {
    console.error('error running scrapes', err);
    return new NextResponse(
      ResponseBuilder({ success: false }, 'Error running scrapes', true),
    );
  }
};

// Saving this here. This is to be put in the vercel.json file that we will create when we want actually set up the cron on Vercel
// {
//   "crons": [
//     {
//       "path": "/api/cron/job-scrape",
//       "schedule": "0 3 * * *"
//     }
//   ]
// }
