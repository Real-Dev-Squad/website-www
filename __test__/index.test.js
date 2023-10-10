const puppeteer = require('puppeteer');
const timeout = 25000;
const checkDialog = require('../js/index');

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

describe('index function test case', () => {
  test('should show dialog if open in phone', () => {
    const regexp = /android|iphone|kindle|ipad/i; // for Mobile phone
    const result = checkDialog(regexp);
    expect(result).toBe('true');
  });
  test(`don't show dialog if not open in phone`, () => {
    const regexp = /Windows|macOS|/i; // for PC
    const result = checkDialog(regexp);
    expect(result).toBe('false');
  });
});
