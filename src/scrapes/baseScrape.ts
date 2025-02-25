import type { Browser, BrowserContext } from 'playwright';
// import { chromium } from 'playwright';
import { chromium } from 'playwright-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

chromium.use(StealthPlugin());

export class WebScraper {
  _userAgent: string;
  _userAgentHTTPHeaders: {
    'Accept-Language': string;
    'Accept-Encoding': string;
    Accept: string;
    Connection: string;
  };
  _launchOptions: {
    headless: boolean;
  };
  _browserContext: {
    userAgent: string;
    viewport: {
      width: number;
      height: number;
    };
  };
  _initScript: string;
  _searchURL: string;
  _mainBrowser: Browser | null;
  _mainContext: BrowserContext | null;

  constructor(searchURL: string) {
    const userAgentStrings = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
    ];

    this._userAgent =
      userAgentStrings[Math.floor(Math.random() * userAgentStrings.length)];
    this._userAgentHTTPHeaders = {
      'Accept-Encoding': 'gzip, deflate, br',
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      Connection: 'keep-alive',
      'Accept-Language': 'en-US,en;q=0.9',
    };
    this._launchOptions = {
      headless: false,
    };
    this._browserContext = {
      userAgent: this._userAgent,
      viewport: { width: 1280, height: 720 },
    };
    this._initScript =
      "Object.defineProperty(navigator, 'webdriver', { get: () => undefined })";

    this._searchURL = searchURL;

    this._mainBrowser = null;
    this._mainContext = null;
  }

  getRandomTimeInterval() {
    return Math.round(Math.random() * 1000);
  }

  async initializeScraper() {
    this._mainBrowser = await chromium.launch(this._launchOptions);

    try {
      this._mainContext = await this._mainBrowser.newContext(this._browserContext);
      await this._mainContext.addInitScript(this._initScript);

      const mainPage = await this._mainContext.newPage();

      await mainPage.setExtraHTTPHeaders(this._userAgentHTTPHeaders);

      await mainPage.goto(this._searchURL);

      await mainPage.waitForTimeout(this.getRandomTimeInterval());

      return mainPage;
    } catch (error) {
      console.error(error);
      await this.closeScraper();
    }
  }

  async closeScraper() {
    if (this._mainContext !== null) {
      await this._mainContext.close();
    }

    if (this._mainBrowser !== null) {
      await this._mainBrowser.close();
    }
  }
}
