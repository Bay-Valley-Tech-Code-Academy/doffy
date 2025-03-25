import { NextResponse } from 'next/server';

import { ResponseBuilder } from '../../../../lib/response-builder';

import { scrapeIndeed } from '~/scrapes/indeed';
import { scrapeZipRecruiter } from '~/scrapes/ziprecruiter';
import { scrapeMonster } from '~/scrapes/monster';
import { scrapeDice } from '~/scrapes/dice';

import { chromium } from 'patchright';
import { WebScraper } from '~/scrapes/baseScrape';
import type { ScrapedJobInfo } from '~/scrapes/webScraperTypes';

import { db } from '~/server/db';
import { jobs } from '~/server/db/schema';

export const GET = async () => {
  const mainBrowser = await chromium.launch({
    headless: false,
    channel: 'chrome',
  });
  const webScraper = new WebScraper(mainBrowser);

  try {
    const diceResults: ScrapedJobInfo[] | null = await scrapeDice(webScraper);
    const indeedResults: ScrapedJobInfo[] | null = await scrapeIndeed(webScraper);
    const zipRecruiter: ScrapedJobInfo[] | null = await scrapeZipRecruiter(webScraper);
    const monster: ScrapedJobInfo[] | null = await scrapeMonster(webScraper);

    await webScraper.closeScraper();

    for (const scraperResults of [zipRecruiter, indeedResults, monster, diceResults]) {
      if (scraperResults !== null) {
        for (const jobResults of scraperResults) {
          await db.insert(jobs).values({
            title: jobResults.title,
            company: jobResults.company,
            location: jobResults.location,
            description: jobResults.description,
          });
        }
      }
    }

    return new NextResponse(
      ResponseBuilder({
        data: null,
        success: true,
        message: 'Jobs added to database.',
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
