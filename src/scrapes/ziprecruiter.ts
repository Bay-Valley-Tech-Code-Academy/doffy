import type { WebScraper } from './baseScrape';
import type { ScrapedJobInfo } from './webScraperTypes';

const scrapeZipRecruiter = async (webScraper: WebScraper) => {
  const zipRecruiterPage = await webScraper.navigateToPage(
    'https://www.ziprecruiter.com/jobs-search?search=programmer&location=Modesto%2C+CA&refine_by_location_type=&radius=25&days=&refine_by_employment=employment_type%3Aall&refine_by_salary=&refine_by_salary_ceil=&lvk=tX5hI6CC3FTEfkefpJKSMw.--NmEAx2jsc',
  );
  const jobInfo: ScrapedJobInfo[] = [];

  try {
    await zipRecruiterPage.waitForTimeout(webScraper.getRandomTimeInterval());

    const dialogPopUp = await zipRecruiterPage.getByRole('dialog').boundingBox();
    await zipRecruiterPage.mouse.click(dialogPopUp.x - 100, dialogPopUp.y);
    const jobSearchPaneSelector =
      'div.job_results_two_pane.flex.flex-col.items-center.overflow-y-scroll.overflow-x-hidden.divide-y-1.divide-divider.max-h-fit.w-lvw > div.job_result_two_pane.relative.h-full';
    let isNextPageAvailable = true;

    do {
      await zipRecruiterPage.waitForSelector(jobSearchPaneSelector, {
        state: 'attached',
      });
      const jobSearchPane = await zipRecruiterPage.locator(jobSearchPaneSelector).all();

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
          .locator(
            'div.grid > div.grid.gap-y-8 > h1.font-bold.text-primary.text-header-md',
          )
          .scrollIntoViewIfNeeded();

        const jobTitle = await zipRecruiterPage
          .locator(
            'div.grid > div.grid.gap-y-8 > h1.font-bold.text-primary.text-header-md',
          )
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

        let jobPay = await webScraper.getNthElementText(
          zipRecruiterPage,
          'div.flex.flex-col.gap-y-8 > div.flex.gap-x-12 > p.text-primary.normal-case.text-body-md',
          0,
        );

        const isValidPay = webScraper.checkForNumber(jobPay);
        if (!isValidPay) jobPay = 'N/A';

        const jobDescription = await zipRecruiterPage
          .locator(
            'div.flex.flex-col.gap-y-48 > div.relative.flex.flex-col > div.text-primary.whitespace-pre-line.break-words',
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

      await zipRecruiterPage.waitForTimeout(webScraper.getRandomTimeInterval());

      const nextPageElement = zipRecruiterPage.getByTitle('Next Page');
      const nextPageElementType = await nextPageElement.getAttribute('type');

      if (nextPageElementType !== 'button') {
        await nextPageElement.scrollIntoViewIfNeeded();
        await nextPageElement.click({ button: 'left' });
        await zipRecruiterPage.waitForTimeout(webScraper.getRandomTimeInterval());
      } else {
        isNextPageAvailable = false;
      }
    } while (isNextPageAvailable);

    await zipRecruiterPage.close();

    return jobInfo;
  } catch (error) {
    console.error(error);
    await zipRecruiterPage.close();
    return jobInfo;
  }
};

export { scrapeZipRecruiter };
