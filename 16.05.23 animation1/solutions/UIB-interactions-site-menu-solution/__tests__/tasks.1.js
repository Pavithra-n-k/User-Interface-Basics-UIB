const puppeteer = require("puppeteer");
const path = require('path');
const fs = require('fs');

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

describe('Links', () => {
    it("Page Should contain 4 navigation links", async () => {
        const navigationLinks = await page.$$('a[href]');
        expect(navigationLinks.length).toBeGreaterThan(3);
    });
    it("Links should have unique background colors on hover", async () => {
        const stylesheet = fs
            .readFileSync("./style.css")
            .toString("utf-8")
            .replace(/ /g, "");
        const colors = stylesheet.match(/background-color:([^;]+);/g);
        const areDifferent = colors.every((color, index, array) => {
            return color !== array[index + 1];
        });
        expect(areDifferent).toBe(true);

    });
});

describe('Transition and transform', () => {
    it("Links should use `transform` and `transition` css properties", async () => {
        const stylesheet = fs
            .readFileSync("./style.css")
            .toString("utf-8")
            .replace(/ /g, "");
        const animation = stylesheet.match(/(transform|transition):([^;]+);/g);
        expect(animation.length).toBeGreaterThanOrEqual(2);
    });
});