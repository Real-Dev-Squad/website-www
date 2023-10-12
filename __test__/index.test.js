const puppeteer = require('puppeteer');
const timeout = 25000;

describe('Dummy Test ', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: 'new',
    });
    page = await browser.newPage();
    await page.goto('https://www.realdevsquad.com/', {
      waitUntil: 'domcontentloaded',
    });
  });
  afterAll(async () => {
    await browser.close();
  });
  test(
    'Page title',
    async () => {
      const title = await page.title();
      expect(title).toBe('Real Dev Squad');
    },
    timeout,
  );
});

describe('Test index function ', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: 'new',
    });
    page = await browser.newPage();
    await page.goto('https://www.realdevsquad.com/', {
      waitUntil: 'domcontentloaded',
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  test(
    'Dialog close',
    async () => {
      let dialogOpened = false;
      page.on('dialog', async (dialog) => {
        dialogOpened = true;
        await dialog.dismiss();
      });
      expect(dialogOpened).toBe(false);
    },
    timeout,
  );
});
