import type { Browser, Page } from 'patchright';

export class WebScraper {
  _mainBrowser: Browser | null;

  constructor(mainBrowser: Browser) {
    this._mainBrowser = mainBrowser;
  }

  getRandomTimeInterval() {
    // Minimum time returned is 3 seconds or 3000 milliseconds.
    return Math.floor(Math.random() * 2000 + 3000);
  }

  async navigateToPage(searchURL: string) {
    try {
      const mainPage = await this._mainBrowser.newPage();

      await mainPage.waitForTimeout(this.getRandomTimeInterval());

      await mainPage.goto(searchURL, { waitUntil: 'networkidle' });

      await mainPage.waitForTimeout(this.getRandomTimeInterval());

      return mainPage;
    } catch (error) {
      console.error(error);
      await this.closeScraper();
    }
  }

  async getElementText(currentPage: Page, locatorTags: string) {
    try {
      const elementText = await currentPage.locator(locatorTags).innerText();

      return elementText
    } catch {
      return null;
    }
  }

  async getNthElementText(currentPage: Page, locatorTags: string, nth: number) {
    try {
      const elementText = await currentPage.locator(locatorTags).nth(nth).innerText();

      return elementText
    } catch {
      return "N/A";
    }
  }

  async closeScraper() {
    if (this._mainBrowser !== null) {
      await this._mainBrowser.close();
    }
  }
}
