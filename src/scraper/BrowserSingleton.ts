import puppeteer, { Browser } from "../dependencies/puppeteer.ts";

let browserInstance: Browser;

/**
 * Allows to get ahold of a singleton browser instance everywhere in the scraper.
 * Avoids having to pass a browser instance or a prepared page object through all sraper functions.
 * @returns a puppeteer Browser Instance (wrapped in a promise)
 */
export async function getBrowser(): Promise<Browser> {
  if (browserInstance === undefined) {
    /**
     * Init Puppeteer
     */
    browserInstance = await puppeteer.launch({
      headless: false,
      defaultViewport: { height: 720, width: 1280 },
    });
  }

  return browserInstance;
}

/**
 * a function to close the singleton browser
 */
export async function closeBrowser() {
  await browserInstance.close();
}
