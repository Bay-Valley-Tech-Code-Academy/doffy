import { NextResponse } from "next/server";
import ResponseBuilder from "~/lib/response-builder";

import { scrapeZipRecruiter } from "~/scrapes/ziprecruiter";

export const GET = async () => {
    try {
        const jobsArray: string[] = await scrapeZipRecruiter();

        return new NextResponse(ResponseBuilder({ data: jobsArray, success: true }));
    } catch (error) {
        console.error(error);
        return new NextResponse(
            ResponseBuilder({ success: false }, 'Error running scrapes', true),
        );
    }
}