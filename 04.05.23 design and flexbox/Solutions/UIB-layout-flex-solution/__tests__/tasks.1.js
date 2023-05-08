const puppeteer = require("puppeteer");
const path = require('path');

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch({headless: true});
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('challenges/01/index.html'));
}, 30000);

afterAll((done) => {
    try { 
        this.puppeteer.close(); 
    } catch (e) 
    {} 
    done();
});

describe("Challenge 01", () => {
    it("`divs` should be aligned using Flexbox", async () => {
        const divsDisplay = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('display')));
        expect(divsDisplay).toEqual(expect.arrayContaining(['flex']));
    });
    it("`divs` should be centered along the main-axis of the container", async () => {
        const justifyContent = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('justify-content')));
        expect(justifyContent).toEqual(expect.arrayContaining(['center']));
    });
});