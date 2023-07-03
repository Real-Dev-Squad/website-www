const puppeteer = require('puppeteer');
const {correctData, incorrectData} = require('../mock-data/join/join');
let browser, page;
describe('testing for the join page', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
    });
   
    const page = await browser.newPage();
    await page.goto('https://dev.realdevsquad.com/join.html');
  });   

  it('testing for an input box area of introduction for correct data', async () => {

    let introductionSection = await page.$('#introduction');
    const boundingBox = await introductionSection.boundingBox();
    const x = boundingBox.x + boundingBox.width + 1; 
    const y = boundingBox.y + boundingBox.height + 1;
    await page.mouse.move(x, y);
    expect(countWords(correctData)).toEqual(100);
  
  });
  it('testing for an input box area of introduction for incorrect data', async () => {

    let introductionSection = await page.$('#introduction');
    const boundingBox = await introductionSection.boundingBox();
    const x = boundingBox.x + boundingBox.width + 1; 
    const y = boundingBox.y + boundingBox.height + 1;
    await page.mouse.move(x, y);
    expect(countWords(incorrectData)).toEqual(100);
  
  });

 
});