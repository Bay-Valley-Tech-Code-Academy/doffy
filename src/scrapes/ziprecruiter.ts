import type { WebScraper } from './baseScrape';
import type { ScrapedJobInfo } from './webScraperTypes';
import { expect } from 'patchright/test';

const scrapeZipRecruiter = async (webScraper: WebScraper) => {
  const zipRecruiterPage = await webScraper.navigateToPage(
    'https://www.ziprecruiter.com/jobs-search?search=programmer&location=Modesto%2C+CA&refine_by_location_type=&radius=25&days=&refine_by_employment=employment_type%3Aall&refine_by_salary=&refine_by_salary_ceil=&lvk=tX5hI6CC3FTEfkefpJKSMw.--NmEAx2jsc',
  );
  const jobInfo: ScrapedJobInfo[] = [];

  try {
    await zipRecruiterPage.waitForTimeout(webScraper.getDelayTime());
    const dialogPopUp = zipRecruiterPage.getByRole('dialog');
    await dialogPopUp.waitFor({ state: 'visible' });

    await expect(dialogPopUp).toBeVisible();
    const boundingBox = await dialogPopUp.boundingBox();
    await zipRecruiterPage.mouse.click(boundingBox.x - 100, boundingBox.y);
    const jobSearchPaneSelector =
      'div.job_results_two_pane.flex.flex-col.items-center.overflow-y-scroll.overflow-x-hidden';
    let isNextPageAvailable = true;

    do {
      await zipRecruiterPage.waitForSelector(jobSearchPaneSelector, {
        state: 'attached',
        
      });

      await expect(
        zipRecruiterPage.locator(jobSearchPaneSelector),
      ).toBeAttached();
      const jobSearchPane = await zipRecruiterPage.locator("div.job_result_two_pane.relative.h-full.group").all();

      for (const job of jobSearchPane) {
        await expect(job).toBeAttached();
        
        const jobElementSelector =
        'article.group.flex.w-full.flex-col.text-primary > div > div > div.mb-12.flex.flex-col.gap-12 > div > div > h2';
        
        await job.locator(jobElementSelector).scrollIntoViewIfNeeded({ timeout: 3000 });
        
        await expect(job.locator(jobElementSelector)).toBeInViewport();

        await job.locator(jobElementSelector).click();
        
        await zipRecruiterPage.waitForLoadState('load');
        await zipRecruiterPage.waitForTimeout(webScraper.getDelayTime());

        const jobTitle = await zipRecruiterPage
          .locator(
            'div.grid > div.grid.gap-y-8 > h1.font-bold.text-primary.text-header-md',
          )
          .innerText();

        const jobCompany = await zipRecruiterPage
          .locator(
            'div.grid > div.grid.gap-y-8 > a.w-fit.gap-8.items-center.group.border-solid.border.rounded-2.border-transparent.flex',
          )
          .innerText();

        const jobLocation = await zipRecruiterPage
          .locator(
            'div.grid > div.grid.gap-y-8 > div.mb-24 > p.text-primary.normal-case.text-body-md',
          )
          .innerText();

        let jobPay = await webScraper.checkNthElement(
          zipRecruiterPage,
          'div.flex.flex-col.gap-y-8 > div.flex.gap-x-12 > p.text-primary.normal-case.text-body-md',
          0,
        );

        const isValidPay = webScraper.checkForNumber(jobPay);
        if (!isValidPay) jobPay = 'N/A';

        const jobDescription = await zipRecruiterPage
          .locator(
            'div.flex.w-full.flex-col.overflow-y-auto.overflow-x-hidden.px-72.py-48 > div.flex.flex-col > div.relative.flex.flex-col > div.text-primary.whitespace-pre-line.break-words',
          )
          .allInnerTexts();

        const pageURL = zipRecruiterPage.url();

        const currentJob: ScrapedJobInfo = {
          title: jobTitle,
          company: jobCompany,
          location: jobLocation,
          origin: 'ziprecruiter.com',
          pay: jobPay,
          url: pageURL,
          description: jobDescription.join('|'),
        };

        jobInfo.push(currentJob);
      }

      
      const nextPageElement = zipRecruiterPage.getByTitle('Next Page');
      const nextPageElementType = await nextPageElement.getAttribute('type');
      
      if (nextPageElementType !== 'button') {
        await nextPageElement.waitFor({ state: 'visible' });
        await expect(nextPageElement).toBeVisible();
        await nextPageElement.scrollIntoViewIfNeeded({ timeout: 3000 });
        await expect(nextPageElement).toBeInViewport();
        await nextPageElement.click({ button: 'left' });
        await zipRecruiterPage.waitForLoadState('networkidle');
      } else {
        isNextPageAvailable = false;
      }
    } while (isNextPageAvailable);

    await zipRecruiterPage.close();

    return { jobResults: jobInfo, error: false };
  } catch (error) {
    console.error(error);
    await zipRecruiterPage.close();
    return { jobResults: jobInfo, error: true };
  }
};

export { scrapeZipRecruiter };
