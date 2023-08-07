const timeout = 25000;

describe('Dummy Test ', () => {
  beforeAll(async () => {
    await page.goto('https://www.realdevsquad.com/', {
      waitUntil: 'domcontentloaded',
    });
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
