import { WebScraper } from './baseScrape';

const scrapeZipRecruiter = async () => {
  const zipRecruiterScraper = new WebScraper(
    'https://www.ziprecruiter.com/jobs-search?form=jobs-landing&search=Programming&location=Oakdale%2C+CA&lvk=K3VL4e3ZonyLWph8RCo7tA.--NhxyzRG0J',
  );

  try {
    const data = [];
    const zipRecruiterPage = await zipRecruiterScraper.initializeScraper();

    const jobSearchPane = await zipRecruiterPage.locator("div.job_results_two_pane.flex.flex-col.items-center.overflow-y-scroll.overflow-x-hidden.divide-y-1.divide-divider.max-h-fit.w-lvw > div.job_result_two_pane.relative.h-full").all();

    const jobInfo = [];
    for (const job of jobSearchPane) {
      await job.click();
      
      await zipRecruiterPage.locator("div.flex.flex-col > div.grid.gap-y-8").waitFor({state: "visible"});

      const jobName = await zipRecruiterPage.locator("div.flex.flex-col > div.grid.gap-y-8 > h1.font-bold text-primary text-header-md").innerHTML();

      jobInfo.push(jobName);
    }

    await zipRecruiterPage.waitForTimeout(zipRecruiterScraper.getRandomTimeInterval());

    await zipRecruiterScraper.closeScraper();

    return jobInfo;
  } catch (error) {
    console.error(error);
    await zipRecruiterScraper.closeScraper();
  }
};

export { scrapeZipRecruiter };
