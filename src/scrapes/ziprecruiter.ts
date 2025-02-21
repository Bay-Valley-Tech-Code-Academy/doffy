import { WebScraper } from './baseScrape';

const scrapeZipRecruiter = async () => {
  const zipRecruiterScraper = new WebScraper(
    'https://www.ziprecruiter.com/jobs-search?form=jobs-landing&search=Programming&location=Oakdale%2C+CA&lvk=K3VL4e3ZonyLWph8RCo7tA.--NhxyzRG0J',
  );

  try {
    const zipRecruiterPage = await zipRecruiterScraper.initializeScraper();

    const jobInfo = await zipRecruiterPage.$$eval(
      'div.job_result_two_pane.relative.h-full',
      (divs) => {
        console.log('Found all dom elements.');
        const data: Array<string | null> = [];
        for (const div of divs) {
          console.log('Iterated through a dom element');
          data.push(`${div.textContent}\n`);
        }
        console.log('Returning data');
        return data;
      },
    );

    await zipRecruiterScraper.closeScraper();

    return jobInfo;
  } catch (error) {
    console.error(error);
    await zipRecruiterScraper.closeScraper();
  }
};

export { scrapeZipRecruiter };
