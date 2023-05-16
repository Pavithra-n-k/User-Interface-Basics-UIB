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

describe('SVGs', () => {
    it("Page should contain `SVG's` from the images directory", async () => {
        const images = await page.$x("//img[contains(@src, '.svg')]");
        expect(images.length).toBeGreaterThanOrEqual(2);
    });
});

describe('Buttons', () => {
    it("Page Should contain 3 `button` tags", async () => {
        const buttons = await page.$x("//button");
        expect(buttons.length).toBeGreaterThanOrEqual(3)
    });
});

describe('Buttons Styling', () => { 
    it("Button elements CSS `box-shadow` property should be defined", async () => {
        const buttonShadow = await page.$eval('button', btn => getComputedStyle(btn).getPropertyValue('box-shadow'));
        expect(buttonShadow).toBeDefined();
        expect(buttonShadow).toBeTruthy();
        expect(buttonShadow).toMatch(/inset/);
        expect(buttonShadow).toMatch(/rgba/);
    });
    it("Button elements CSS `transition` property should be defined", async () => {
        const buttonTransition = await page.$eval('button', btn => getComputedStyle(btn).getPropertyValue('transition'));
        expect(buttonTransition).toBeDefined();
        expect(buttonTransition).toBeTruthy();
        expect(buttonTransition).toMatch(/[box\-shadow|all]/);
    });
 });

 describe('Hover', () => {
    it("Button elements `box-shadow` property value should change on hover", async () => {
        const buttons = await page.$x("//button");
        const buttonShadow = await page.$eval('button', btn => getComputedStyle(btn).getPropertyValue('box-shadow'));
        await buttons[0].hover();
        const buttonShadowHover = await page.$eval('button', btn => getComputedStyle(btn).getPropertyValue('box-shadow'));
        expect(buttonShadow).not.toBe(buttonShadowHover);
    });
});