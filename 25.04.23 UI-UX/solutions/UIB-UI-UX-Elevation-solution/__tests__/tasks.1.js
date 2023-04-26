const puppeteer = require("puppeteer");
const path = require('path');

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true});
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('./index.html'));
}, 30000);

afterAll((done) => {
    try {
        this.puppeteer.close();
    } catch (e) { }
    done();
});

describe('Gradient', () => {
    it("Page has a linear gradient", async () => {
        const allBackgroundProperties = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('background-image')));
        const backgroundProperties = allBackgroundProperties.filter(e => e.includes('linear-gradient'));
        expect(backgroundProperties.length).toBeGreaterThan(0);
    });
});

describe('Elevation', () => {
    it("Page has elevation effect", async () => {
        const allBoxShadowProperties = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('box-shadow')));
        expect(allBoxShadowProperties.filter(e => e.includes('rgba')).length).toBeGreaterThan(0);
    });
});