import { NextResponse } from 'next/server';
import { ResponseBuilder } from '../../../../lib/response-builder';

import { db } from '~/server/db';
import { jobs } from '~/server/db/schema';
import type { ScrapedJobInfo } from '~/scrapes/webScraperTypes';

export const GET = async () => {
  try {
    const jobResults = await db.select().from(jobs);

    return new NextResponse(
      ResponseBuilder({
        data: jobResults,
        success: true,
        message: "Jobs pulled from database."
      }),
    );
  } catch (err) {
    console.error('error pulling job data', err);
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
