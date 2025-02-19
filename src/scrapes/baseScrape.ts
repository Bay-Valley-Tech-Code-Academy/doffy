import type { Browser } from "playwright";
import { chromium } from "playwright";

class WebScraper {
    userAgent: string;
    userAgentHTTPHeaders: {
        "Accept-Language": string;
    };
    launchOptions: {
        headless: boolean
    };
    browserContext: {
        userAgent: string;
        viewport: {
            width: number;
            height: number;
        }
    }
    initScript: string;
    mainBrowser: Browser;

    constructor() {
        this.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36';
        this.userAgentHTTPHeaders = {
            'Accept-Language': 'en-US,en;q=0.9',
          };
        this.launchOptions = {
            headless: true,
          };
        this.browserContext = {
            userAgent: this.userAgent,
            viewport: { width: 1280, height: 720 },
          };
        this.initScript = "Object.defineProperty(navigator, 'webdriver', { get: () => undefined })";
    }

    getRandomTimeInterval() {
        return Math.round(Math.random() * 1000);
    }

    async initializeBrowser(searchURL: string) {
        this.mainBrowser = await chromium.launch(this.launchOptions);
        const mainContext = await this.mainBrowser.newContext({userAgent: this.userAgent});
        await mainContext.addInitScript(this.initScript);

        const mainPage = await mainContext.newPage();

        await mainPage.goto(searchURL);

        await mainPage.waitForTimeout(this.getRandomTimeInterval());

        return mainPage;
    }

    async closeBrowser() {
        if (this.mainBrowser) {
            await this.mainBrowser.close();
        }
    }

}