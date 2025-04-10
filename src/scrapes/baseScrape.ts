import type { Browser, Page } from 'patchright';

export class WebScraper {
  _mainBrowser: Browser | null;

  constructor(mainBrowser: Browser) {
    this._mainBrowser = mainBrowser;
  }

  async navigateToPage(searchURL: string) {
    try {
      const mainPage = await this._mainBrowser.newPage();

      await mainPage.goto(searchURL, { waitUntil: 'load' });

      return mainPage;
    } catch (error) {
      console.error(error);
      await this.closeScraper();
    }
  }

  async confirmElementExists(currentPage: Page, locatorTags: string): Promise<string | null> {
    try {
      const elementText = await currentPage.locator(locatorTags).innerText({timeout: 5000});

      return elementText;
    } catch {
      return null;
    }
  }

  async checkElement(currentPage: Page, locatorTags: string) {
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

  async checkNthElement(locatorOrigin: Page, locatorTags: string, nth: number) {
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
