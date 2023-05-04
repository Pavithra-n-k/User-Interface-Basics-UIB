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

let smallFontSize;
let mediumFontSize;
let largeFontSize;
let smallFontFamily;
let mediumFontFamily;
let largeFontFamily;

describe("Mobile breakpoint", () => {
    it("For screen size below 768px, a different font-size should be set", async () => {
        await page.setViewport({
            width: 375,
            height: 0,
        });
        smallFontSize = await page.$eval('main', el => getComputedStyle(el).fontSize);
        await page.setViewport({
            width: 768,
            height: 0,
        });
        mediumFontSize = await page.$eval('main', el => getComputedStyle(el).fontSize);
        expect(smallFontSize).not.toBe(mediumFontSize);
    });
    it("For screen size below 768px, a different font-family should be set", async () => {
        await page.setViewport({
            width: 375,
            height: 0,
        });
        smallFontFamily = await page.$eval('main', el => getComputedStyle(el).fontFamily);
        await page.setViewport({
            width: 768,
            height: 0,
        });
        mediumFontFamily = await page.$eval('main', el => getComputedStyle(el).fontFamily);
        expect(smallFontFamily).not.toBe(mediumFontFamily);
    });
});
describe("Tablet breakpoint", () => {
    it("For screen size 768px and up, a different font-size should be set", async () => {
        await page.setViewport({
            width: 776,
            height: 0,
        });
        mediumFontSize = await page.$eval('main', el => getComputedStyle(el).fontSize);
        // check if new font size is different from previous one
        expect(smallFontSize).not.toBe(mediumFontSize);
    });
    it("For screen size 768px and up, a different font-family should be set", async () => {
        await page.setViewport({
            width: 375,
            height: 0,
        });
        smallFontFamily = await page.$eval('main', el => getComputedStyle(el).fontFamily);
        await page.setViewport({
            width: 768,
            height: 0,
        });
        mediumFontFamily = await page.$eval('main', el => getComputedStyle(el).fontFamily);
        expect(smallFontFamily).not.toBe(mediumFontFamily);
    });
});
describe("Desktop breakpoint", () => {
    it("For screen size 1024px and up, a different font-size should be set", async () => {
        await page.setViewport({
            width: 1024,
            height: 0,
        });
        largeFontSize = await page.$eval('main', el => getComputedStyle(el).fontSize);
        expect(smallFontSize).not.toBe(largeFontSize);
        expect(mediumFontSize).not.toBe(largeFontSize);
    });
    it("For screen size 1024px and up, a different font-family should be set", async () => {
        await page.setViewport({
            width: 1024,
            height: 0,
        });
        largeFontFamily = await page.$eval('main', el => getComputedStyle(el).fontFamily);
        expect(smallFontFamily).not.toBe(largeFontFamily);
        expect(mediumFontFamily).not.toBe(largeFontFamily);
    });
});
