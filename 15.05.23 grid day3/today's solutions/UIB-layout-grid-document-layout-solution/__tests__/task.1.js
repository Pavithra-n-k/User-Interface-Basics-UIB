const puppeteer = require("puppeteer")
const path = require("path")

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: true
    });
    page = await browser.newPage();
    await page.goto(`file:${path.join(__dirname, "../index.html")}`);
    await page.screenshot({ path: "screenshot.png" });

}, 30000);

afterAll((done) => {
    try {
        this.puppeteer.close();
    } catch (e) { }
    done();
});

describe('Grid', () => {
    it("Page should have a grid setup", async () => {
        const display = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('display')));
        expect(display.includes('grid')).toBeTruthy();
    });

    it("Main magazine section should be split into 4 grid columns", async () => {
        const columns = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('grid-template-columns')));
        expect(columns.filter(column => column.split(" ").length > 3).length).toBeGreaterThan(0);
    });

    it("`grid-template-areas` should be used", async () => {
        const gridTemplateAreas = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('grid-template-areas')));
        expect(gridTemplateAreas.filter(e => e !== 'none').length).toBeGreaterThan(0);
    });

    it("`grid-template-columns` should be used", async () => {
        const gridTemplateColumns = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('grid-template-columns')));
        expect(gridTemplateColumns.filter(e => e !== 'none').length).toBeGreaterThan(0);
    });

    it("`grid-template-rows` should be used", async () => {
        const gridTemplateRows = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('grid-template-rows')));
        expect(gridTemplateRows.filter(e => e !== 'none').length).toBeGreaterThan(0);
    });

    it("`grid-gap` should be used to set the spacing between columns", async () => {
        const gridGap = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('grid-gap')));
        expect(gridGap.filter(e => e !== 'normal normal').length).toBeGreaterThan(0);
    });
});

describe('Logo', () => {
    it("The logo is displayed on the page", async () => {
        const headerLogo = await page.$$eval('img', imgs => imgs.filter(img => img.src.includes('logo.png')));
        expect(headerLogo.length).toBeGreaterThan(0)
    });
});