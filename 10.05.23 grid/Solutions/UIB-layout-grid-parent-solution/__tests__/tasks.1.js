const puppeteer = require("puppeteer");
const path = require('path');

const browserOptions = {
    headless: true,
    ignoreHTTPSErrors: true,
}

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch(browserOptions);
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('./index.html'));
}, 30000);

afterAll((done) => {
    try { this.puppeteer.close(); } catch (e) { }
    done();
});

describe("Grid images", () => {
    it("Page should contain the sport images from the `assets` folder", async () => {
        const images = await page.$$eval('img', (el) => Array.from(el).map((img) => img.src));
        expect(images.length).toBeGreaterThan(5);
        images.forEach((src) => {
            expect(src).toMatch(/assets\/(football|golf|swimming|tennis|volleyball|racing)|diving|hockey|baseball/);
        })
    });
});

describe('Grid', () => {
    it("Element with `.container` class should be set up to be a CSS grid container", async () => {
        const display = await page.$eval('.container', el => getComputedStyle(el).display);
        expect(display).toBe('grid');
    });
    it("Element with `.container` class should be set up to have multiple grid columns", async () => {
        const gridTemplateColumns = await page.$eval('.container', el => getComputedStyle(el).gridTemplateColumns);
        const gridTemplateColumnsNum = parseInt(gridTemplateColumns.replace(/\D/g, ''));
        expect(gridTemplateColumnsNum).toBeGreaterThan(0);
    });
    it("The grid of element with `.container` class should have a gap set", async () => {
        const gridGap = await page.$eval('.container', el => getComputedStyle(el).gap);
        const gap = parseInt(gridGap.replace('px', ''));
        expect(gap).toBeGreaterThan(1);
    });
});
