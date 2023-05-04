const puppeteer = require("puppeteer");
const path = require('path');

const browserOptions = {
    headless: true,
    ignoreHTTPSErrors: true,
    defaultViewport: null,
    devtools: false,
}
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
    } catch (e) 
    {} 
    done();
});

describe("0-375px breakpoint", () => {
    it("`body` should have **red** border", async () => {
        await page.setViewport({
            width: 375,
            height: 0,
        });
        const border = await page.$eval('body', el => getComputedStyle(el).border);
        expect(border).toContain('rgb(255, 0, 0)');
    });
});
describe("376-425px breakpoint", () => {
    it("`body` should have **blue** border", async () => {
        await page.setViewport({
            width: 378,
            height: 0,
        });
        const border = await page.$eval('body', el => getComputedStyle(el).border);
        expect(border).toContain('rgb(0, 0, 255)');
    });
});
describe("426-768px breakpoint", () => {
    it("`body` should have **green** border", async () => {
        await page.setViewport({
            width: 428,
            height: 0,
        });
        const border = await page.$eval('body', el => getComputedStyle(el).border);
        expect(border).toContain('rgb(0, 128, 0)');
    });
});
describe("769-1024px breakpoint", () => {
    it("`body` should have **yellow** border", async () => {
        await page.setViewport({
            width: 1000,
            height: 0,
        });
        const border = await page.$eval('body', el => getComputedStyle(el).border);
        expect(border).toContain('rgb(255, 255, 0)');
    });
});
describe("769-1024px breakpoint", () => {
    it("`body` should have **hotpink** border", async () => {
        await page.setViewport({
            width: 1150,
            height: 0,
        });
        const border = await page.$eval('body', el => getComputedStyle(el).border);
        expect(border).toContain('rgb(255, 105, 180)');
    });
});
describe("1441px and uo breakpoint", () => {
    it("`body` should have **azure** border", async () => {
        await page.setViewport({
            width: 1550,
            height: 0,
        });
        const border = await page.$eval('body', el => getComputedStyle(el).border);
        expect(border).toContain('rgb(240, 255, 255)');
    });
});