const puppeteer = require('puppeteer');
const path = require('path');

const browserOptions = {
  headless: true,
  ignoreHTTPSErrors: true,
  defaultViewport: null,
  devtools: false,
};
let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch(browserOptions);
  page = await browser.newPage();
  await page.goto('file://' + path.resolve('./index.html'));
}, 30000);

afterAll((done) => {
  try {
    this.puppeteer.close();
  } catch (e) {}
  done();
});

describe('UIB Warp Club - Flexbox layout', () => {
  it('Index file should contain appropriate meta tags', async () => {
    const metaTags = await page.$$('meta');
    expect(metaTags.length).toBeGreaterThan(1);
  });
  it('Stylesheet Should be properly linked in index.html file', async () => {
    const stylesheet = await page.$('link[rel="stylesheet"]');
    expect(stylesheet).toBeTruthy();
  });
  it('Index file Should contain a title tag that is not empty', async () => {
    const title = await page.$eval('title', (el) => el.innerHTML);
    expect(title).not.toBe('');
  });
  it('Jura Google font should be imported and Used', async () => {
    const fontFamily = await page.$eval(
      'body',
      (el) => getComputedStyle(el).fontFamily
    );
    expect(fontFamily).toMatch(/jura|sans-serif/);
  });

  it('Images provided in the assets folder should be used', async () => {
    const images = await page.$$eval('*', (all) =>
      all.map((el) =>
        el.tagName == 'IMG' ? el.src : getComputedStyle(el).backgroundImage
      )
    );
    expect(images.join(' ')).toMatch(
      /^(?=.*\bbackground.jpg\b)(?=.*\bmain.jpg\b).*$/i
    );
  });

  it('Navbar should exist with the specified anchor tags', async () => {
    const anchorText = await page.$$eval('a', (anchors) =>
      anchors.map((anchor) => anchor.innerText)
    );
    expect(anchorText).toEqual(
      expect.arrayContaining(['events', 'artists', 'community', 'contact'])
    );
  });
  it("The text 'Warp club' Should exist on the page, as the main headline", async () => {
    const showcaseText = await page.$eval('h1', (el) => el.innerHTML);
    expect(showcaseText).toMatch(/warp club/i);
  });
  it('Page should be divided into two equal sections containing heading and image', async () => {
    const column1 = await page.$eval(
      '.column1',
      (el) => getComputedStyle(el).width
    );

    const column2 = await page.$eval(
      '.column2',
      (el) => getComputedStyle(el).width
    );

    const body = await page.$('body');
    const bodyBox = await body.boundingBox();
    const halfOfPage = `${bodyBox.width / 2}px`;

    expect(column1).toBe(halfOfPage);
    expect(column2).toBe(halfOfPage);
  });
});
