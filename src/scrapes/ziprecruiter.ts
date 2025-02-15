import { chromium } from "playwright";

// Provides a user agent to the browser in multiple ways to appear less like a bot.
const userAgent =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36';
const userAgentHTTPHeaders = {
  'Accept-Language': 'en-US,en;q=0.9',
};

const scrapeZipRecruiter = async () => {
  const launchOptions = {
    headless: true,
  };

  const mainBrowser = await chromium.launch(launchOptions);

    try {
          const mainContext = await mainBrowser.newContext({
            userAgent,
            viewport: { width: 1280, height: 720 }
           });

          await mainContext.addInitScript(
            "Object.defineProperty(navigator, 'webdriver', { get: () => undefined })",
          );

          const newPage = await mainContext.newPage();

          await newPage.setExtraHTTPHeaders(userAgentHTTPHeaders);

          await newPage.goto('https://www.ziprecruiter.com/jobs-search?form=jobs-landing&search=Programming&location=Oakdale%2C+CA&lvk=K3VL4e3ZonyLWph8RCo7tA.--NhxyzRG0J');

          const jobInfo = await newPage.$$eval('div.job_result_two_pane.relative.h-full', (divs) => {
            console.log('Found all dom elements.')
            const data: Array<string | null> = [];
            for (const div of divs) {
              console.log('Iterated through a dom element')
              data.push(`${div.textContent}\n`);
            };
            console.log('Returning data')
            return data;
          })

          await mainContext.close();

          await mainBrowser.close();

          return jobInfo;
      } catch (error) {
          console.error(error);
          await mainBrowser.close();
    }
};

export { scrapeZipRecruiter };
