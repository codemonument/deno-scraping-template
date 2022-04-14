import puppeteer, {
  Browser,
  BrowserConnectOptions,
  ChromeArgOptions,
  LaunchOptions,
  Product,
} from "../dependencies/puppeteer.ts";
import { log } from "../dependencies/log.std.ts";

let browserInstance: Browser;

// inits a new browser instance, but only, if it does not exist already!
export async function initBrowser(options:
  & LaunchOptions
  & ChromeArgOptions
  & BrowserConnectOptions
  & {
    product?: Product;
    extraPrefsFirefox?: Record<string, unknown>;
  } = {}): Promise<Browser> {
  if (browserInstance === undefined) {
    log.info(`[initBrowser] Creating a new Browser instance`);

    /**
     * Init Puppeteer
     */
    browserInstance = await puppeteer.launch({
      headless: false,
      defaultViewport: { height: 720, width: 1280 },
      ...options,
    });
  } else {
    log.info(`[initBrowser] Using an existing browserInstance`);
  }

  return browserInstance;
}

/**
 * Allows to get ahold of a singleton browser instance everywhere in the scraper.
 * Avoids having to pass a browser instance or a prepared page object through all sraper functions.
 * @returns a puppeteer Browser Instance (wrapped in a promise)
 */
export function getBrowser(): Browser {
  if (browserInstance === undefined) {
    throw new Error(
      `[getBrowser] browserInstance undefined - please run initBrowser first`,
    );
  }

  log.info(`[getBrowser] Using an existing browserInstance`);
  return browserInstance;
}

/**
 * a function to close the singleton browser
 */
export async function closeBrowser() {
  await browserInstance.close();
}
