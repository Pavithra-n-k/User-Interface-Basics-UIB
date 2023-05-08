const puppeteer = require("puppeteer");
const path = require('path');

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch({headless: true});
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('challenges/06/index.html'));
}, 30000);

afterAll((done) => {
    try { 
        this.puppeteer.close(); 
    } catch (e) 
    {} 
    done();
});

describe("Challenge 06", () => {
    it("`divs` should be aligned using Flexbox", async () => {
        const divsDisplay = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('display')));
        expect(divsDisplay).toEqual(expect.arrayContaining(['flex']));
    });
    it("`divs` should be displayed as a column", async () => {
        const divsOrder = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('flex-direction')));
        expect(divsOrder).toEqual(expect.arrayContaining(['column']));
    });
    it("`divs` should be displayed in the center of the container", async () => {
        const divsOrder = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('align-items')));
        expect(divsOrder).toEqual(expect.arrayContaining(['center']));
    });
});