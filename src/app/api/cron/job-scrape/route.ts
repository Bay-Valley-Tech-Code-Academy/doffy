import { NextResponse } from 'next/server';

import { ResponseBuilder } from '../../../../lib/response-builder';

import { scrapeIndeed } from '~/scrapes/indeed';
import { scrapeZipRecruiter } from '~/scrapes/ziprecruiter';
import { scrapeMonster } from '~/scrapes/monster';

import { chromium } from 'patchright';
import { WebScraper } from '~/scrapes/baseScrape';
import type { ScrapedJobInfo } from '~/scrapes/webScraperTypes';

export const GET = async () => {
  const mainBrowser = await chromium.launch({
    headless: false,
    channel: 'chrome',
  });
  const webScraper = new WebScraper(mainBrowser);

  try {
    const indeedResults: ScrapedJobInfo[] | null = await scrapeIndeed(webScraper);
    const zipRecruiter: ScrapedJobInfo[] | null = await scrapeZipRecruiter(webScraper);
    const monster: ScrapedJobInfo[] | null = await scrapeMonster(webScraper);

    await webScraper.closeScraper();

    const scraperData: ScrapedJobInfo[][] = [];

    for (const scraperResults of [zipRecruiter, indeedResults, monster]) {
      if (scraperResults !== null) {
        scraperData.push(scraperResults);
      }
    }

    return new NextResponse(
      ResponseBuilder({
        data: scraperData,
        success: true,
      }),
    );
  } catch (err) {
    await webScraper.closeScraper();
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
