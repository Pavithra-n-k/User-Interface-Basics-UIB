const puppeteer = require("puppeteer");
const path = require('path');

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('./index.html'));
}, 30000);

afterAll((done) => {
    try {
        this.puppeteer.close();
    } catch (e) { }
    done();
});

describe("keyframe 'lighting'", () => {
    it("Css 'Keyframes' property named 'lighting' should defined", async () => {
        try {
            const animation = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('animation')));
            expect(animation.some(e => e.includes('lighting'))).toBe(true);
        } catch (err) {
            throw new Error(err);
        }
    });
});

describe("animation-delay", () => {
    it("'animation-delay' on elements should be sequential", async () => {
        try {
            const animationDelay = await page.$$eval('*', el => Array.from(el).filter(e => getComputedStyle(e).getPropertyValue('animation-delay') !== '0s'));
            expect(animationDelay.length).toBeTruthy()
        } catch (err) {
            throw new Error(err);
        }
    });
}); 