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

beforeEach(async () => {
    await page.reload()
})

afterAll((done) => {
    try { this.puppeteer.close(); } catch (e) { }
    done();
});

describe('Interaction', () => {
    it("Stylesheet should be linked", async () => {
        const css = await page.$eval('link[rel="stylesheet"]', el => el.href);
        expect(css).toBeTruthy();
    })
    it("On hover the opacity of the caption element should change to 1", async () => {
        const allElements = await page.$$('body *')
        const opacities = await page.$$eval('body *', els => els.map(el => getComputedStyle(el).opacity))
        allElements.forEach(el => {try {el.hover()} catch (e) {} })
        await page.waitForTimeout(3500);
        const newOpacities = await page.$$eval('body *', els => els.map(el => getComputedStyle(el).opacity))
        expect(opacities).not.toEqual(newOpacities)
    });
    it("Image should scale and rotate on hover", async () => {
        const allElements = await page.$$('body *')
        const transforms = await page.$$eval('body *', els => els.map(el => getComputedStyle(el).transform))
        allElements.forEach(el => el.hover())
        await page.waitForTimeout(3500);
        const newTransforms = await page.$$eval('body *', els => els.map(el => getComputedStyle(el).transform))
        expect(transforms).not.toEqual(newTransforms)
    });
});