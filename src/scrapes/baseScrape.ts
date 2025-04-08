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

  async getElement(currentPage: Page, locatorTags: string) {
    try {
      const elementText = currentPage.locator(locatorTags);

      return elementText;
    } catch {
      return null;
    }
  }

  async getElementText(currentPage: Page, locatorTags: string) {
    try {
      const elementLocator = currentPage.locator(locatorTags);

      if (await elementLocator.isVisible()) {
        const elementText = await elementLocator.innerText();

        return elementText;
      } else {
        return 'N/A';
      }
    } catch {
      return 'N/A';
    }
  }

  async getNthElementText(locatorOrigin: Page, locatorTags: string, nth: number) {
    try {
      const elementLocator = locatorOrigin.locator(locatorTags).nth(nth);

      if (await elementLocator.isVisible()) {
        const elementText = await elementLocator.innerText();
        return elementText;
      } else {
        return 'N/A';
      }
    } catch {
      return 'N/A';
    }
  }

  checkForNumber(textString: string) {
    for (const num of '1234567890'.split('')) {
      if (textString.includes(num)) return true;
    }

    return false;
  }

  async closeScraper() {
    if (this._mainBrowser !== null) {
      await this._mainBrowser.close();
    }
  }
}
