import { NextResponse } from 'next/server';

import { ResponseBuilder } from '../../../../lib/response-builder';

import { scrapeIndeed } from '~/scrapes/indeed';

export const GET = async () => {
  try {
    const indeedResults = await scrapeIndeed();

    return new NextResponse(ResponseBuilder({ data: indeedResults, success: true }));
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
