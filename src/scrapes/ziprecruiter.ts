import { WebScraper } from './baseScrape';

const scrapeZipRecruiter = async () => {
  const zipRecruiterScraper = new WebScraper(
    // `https://www.ziprecruiter.com/`
    'https://www.ziprecruiter.com/jobs-search?form=jobs-landing&search=Programming&location=Oakdale%2C+CA&lvk=BSzvspPKpdNhZ-Oz2ck87w.--NhWHNPoVg',
  );

  try {
    const zipRecruiterPage = await zipRecruiterScraper.initializeScraper();

    await zipRecruiterPage.waitForTimeout(zipRecruiterScraper.getRandomTimeInterval());

    const dialogPopUp = await zipRecruiterPage.getByRole("dialog").boundingBox();
    await zipRecruiterPage.mouse.click(dialogPopUp.x - 100, dialogPopUp.y);

    const jobSearchPane = await zipRecruiterPage
      .locator(
        'div.job_results_two_pane.flex.flex-col.items-center.overflow-y-scroll.overflow-x-hidden.divide-y-1.divide-divider.max-h-fit.w-lvw > div.job_result_two_pane.relative.h-full',
      )
      .all();

    const jobInfo = [];
    for (const job of jobSearchPane) {
      await job.locator(
        ' article.group.flex.w-full.flex-col.text-primary > div > div > div.mb-12.flex.flex-col.gap-12 > div > div > h2'
      ).scrollIntoViewIfNeeded();
      
      await job.locator(
        ' article.group.flex.w-full.flex-col.text-primary > div > div > div.mb-12.flex.flex-col.gap-12 > div > div > h2'
      ).click();

      await zipRecruiterPage.waitForTimeout(5000);

      await zipRecruiterPage
        .locator('div.grid > div.grid.gap-y-8 > h1.font-bold.text-primary.text-header-md')
        .scrollIntoViewIfNeeded();

      const jobName = await zipRecruiterPage
        .locator('div.grid > div.grid.gap-y-8 > h1.font-bold.text-primary.text-header-md')
        .innerText();
      
        const companyName = await zipRecruiterPage
        .locator('div.grid > div.grid.gap-y-8 > a.text-primary.normal-case.rounded-2.outline-none.w-fit.gap-4.items-center')
        .innerText();
       
        const jobLocation = await zipRecruiterPage
        .locator('div.grid > div.grid.gap-y-8 > div.mb-24 > p.text-primary.normal-case.text-body-md')
        .innerText();
        
        const variousInfo = await zipRecruiterPage
        .locator('div.flex.flex-col.gap-y-8 > div.flex.gap-x-12 > p.text-primary.normal-case.text-body-md')
        .allInnerTexts()
        
        const jobDescription = await zipRecruiterPage
        .locator('div.flex.flex-col.gap-y-48 > div.relative.flex.flex-col > div.text-primary.whitespace-pre-line.break-words')
        .allInnerTexts()

      jobInfo.push([jobName, companyName, jobLocation, variousInfo, jobDescription]);
    }

    await zipRecruiterPage.waitForTimeout(10000);

    await zipRecruiterScraper.closeScraper();

    return jobInfo;
  } catch (error) {
    console.error(error);
    await zipRecruiterScraper.closeScraper();
  }
};

export { scrapeZipRecruiter };
