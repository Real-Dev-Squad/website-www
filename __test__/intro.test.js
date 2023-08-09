const puppeteer = require('puppeteer');
const { user } = require('../mock-data/users');
const { allUsersIntroData } = require('../mock-data/intro');
describe('Tests the User Management User Listing Screen', () => {
  let browser;
  let page;
  let githubText;
  jest.setTimeout(30000);

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      ignoreHTTPSErrors: true,
      args: ['--incognito', '--disable-web-security'],
      devtools: true,
    });
    page = await browser.newPage();
    await page.setRequestInterception(true);

    page.on('request', async (interceptedRequest) => {
      const url = interceptedRequest.url();
      if (url.includes('/users/self')) {
        await interceptedRequest.respond({
          status: 200,
          contentType: 'application/json',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            Authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJvWHU0R1Z5MFVHTDZUalZCaGZ1aiIsImlhdCI6MTY5MTQzNDIyMCwiZXhwIjoxNjk0MDI2MjIwfQ.BCeP_D2IyWITUGTNuu_CcJ-qxGPGR6eG5d-fwLhi7GZMyYE90fWCbSjOTAN7_QhFXa7B1f2vMqJye_1tnbdXHhow8oq6QUXA1WHbKIey3wIb5iQZzPcEgk-8YVfUAg3KoXYpo1HeVgGMDSxvSaRcrkqPTwj5OyFUOyVyuYxI4fc',
          },
          body: JSON.stringify(user),
        });
      } else if (url.includes('/users/oXu4GVy0UGL6TjVBhfuj/intro')) {
        await interceptedRequest.respond({
          status: 200,
          contentType: 'application/json',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            Authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJvWHU0R1Z5MFVHTDZUalZCaGZ1aiIsImlhdCI6MTY5MTQzNDIyMCwiZXhwIjoxNjk0MDI2MjIwfQ.BCeP_D2IyWITUGTNuu_CcJ-qxGPGR6eG5d-fwLhi7GZMyYE90fWCbSjOTAN7_QhFXa7B1f2vMqJye_1tnbdXHhow8oq6QUXA1WHbKIey3wIb5iQZzPcEgk-8YVfUAg3KoXYpo1HeVgGMDSxvSaRcrkqPTwj5OyFUOyVyuYxI4fc',
          },
          body: JSON.stringify(allUsersIntroData[0]),
        });
      } else if (url.includes('/users/userId/oXu4GVy0UGL6TjVBhfuj')) {
        await interceptedRequest.respond({
          status: 200,
          contentType: 'application/json',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            Authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJvWHU0R1Z5MFVHTDZUalZCaGZ1aiIsImlhdCI6MTY5MTQzNDIyMCwiZXhwIjoxNjk0MDI2MjIwfQ.BCeP_D2IyWITUGTNuu_CcJ-qxGPGR6eG5d-fwLhi7GZMyYE90fWCbSjOTAN7_QhFXa7B1f2vMqJye_1tnbdXHhow8oq6QUXA1WHbKIey3wIb5iQZzPcEgk-8YVfUAg3KoXYpo1HeVgGMDSxvSaRcrkqPTwj5OyFUOyVyuYxI4fc',
          },
          body: JSON.stringify(user),
        });
      }
      interceptedRequest.continue();
    });

    await page.goto('http://localhost:5500/intro.html?id=oXu4GVy0UGL6TjVBhfuj');
    await page.waitForNetworkIdle();
    githubText = await page.waitForSelector('#render-page');
    console.log(githubText);
  });

  afterAll(async () => {
    await browser.close();
  });

  it('Checks the UI elements on user listing page.', async () => {
    expect(githubText).toBeTruthy();
  });
});
