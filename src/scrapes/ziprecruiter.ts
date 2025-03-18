import type { WebScraper } from './baseScrape';
import type { ScrapedJobInfo } from './webScraperTypes';

const scrapeZipRecruiter = async (webScraper: WebScraper) => {
  const zipRecruiterPage = await webScraper.navigateToPage(
    'https://www.ziprecruiter.com/jobs-search?form=jobs-landing&search=Programming&location=Oakdale%2C+CA&lvk=BSzvspPKpdNhZ-Oz2ck87w.--NhWHNPoVg',
  );

  try {
    await zipRecruiterPage.waitForTimeout(webScraper.getRandomTimeInterval());

    const dialogPopUp = await zipRecruiterPage.getByRole('dialog').boundingBox();
    await zipRecruiterPage.mouse.click(dialogPopUp.x - 100, dialogPopUp.y);

    const jobSearchPane = await zipRecruiterPage
      .locator(
        'div.job_results_two_pane.flex.flex-col.items-center.overflow-y-scroll.overflow-x-hidden.divide-y-1.divide-divider.max-h-fit.w-lvw > div.job_result_two_pane.relative.h-full',
      )
      .all();

    const jobInfo: ScrapedJobInfo[] = [];
    for (const job of jobSearchPane) {
      await job
        .locator(
          ' article.group.flex.w-full.flex-col.text-primary > div > div > div.mb-12.flex.flex-col.gap-12 > div > div > h2',
        )
        .scrollIntoViewIfNeeded();

      await job
        .locator(
          ' article.group.flex.w-full.flex-col.text-primary > div > div > div.mb-12.flex.flex-col.gap-12 > div > div > h2',
        )
        .click();

      await zipRecruiterPage.waitForTimeout(webScraper.getRandomTimeInterval());

      await zipRecruiterPage
        .locator('div.grid > div.grid.gap-y-8 > h1.font-bold.text-primary.text-header-md')
        .scrollIntoViewIfNeeded();

      const jobTitle = await zipRecruiterPage
        .locator('div.grid > div.grid.gap-y-8 > h1.font-bold.text-primary.text-header-md')
        .innerText();

      const jobCompany = await zipRecruiterPage
        .locator(
          'div.grid > div.grid.gap-y-8 > a.text-primary.normal-case.rounded-2.outline-none.w-fit.gap-4.items-center',
        )
        .innerText();

      const jobLocation = await zipRecruiterPage
        .locator(
          'div.grid > div.grid.gap-y-8 > div.mb-24 > p.text-primary.normal-case.text-body-md',
        )
        .innerText();

      // const variousInfo = await zipRecruiterPage
      //   .locator(
      //     'div.flex.flex-col.gap-y-8 > div.flex.gap-x-12 > p.text-primary.normal-case.text-body-md',
      //   )
      //   .allInnerTexts();

      const jobDescription = await zipRecruiterPage
        .locator(
          'div.flex.flex-col.gap-y-48 > div.relative.flex.flex-col > div.text-primary.whitespace-pre-line.break-words',
        )
        .allInnerTexts();

      const currentJob: ScrapedJobInfo = {
        jobTitle,
        jobCompany,
        jobLocation: jobLocation,
        jobDescription: jobDescription.join('|'),
      };

      jobInfo.push(currentJob);
    }

    await zipRecruiterPage.waitForTimeout(webScraper.getRandomTimeInterval());

    await zipRecruiterPage.close();

    return jobInfo;
  } catch (error) {
    console.error(error);
    await zipRecruiterPage.close();
    return null;
  }
};

export { scrapeZipRecruiter };
