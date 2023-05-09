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
    } catch (e) 
    {} 
    done();
});

describe("Styling", () => {
    it("Page should have a background oimage", async () => {
        const backgroundProperties = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).backgroundImage).filter(e => e !== 'none'));
        expect(backgroundProperties.length).toBeGreaterThan(0);
    });
    it("Input fields should have `outline-color` on focus", async () => {
        const labels = await page.$$('label');
        const fields = await page.$$('input');
        expect(labels.length).toBeGreaterThan(0);
        for (let i = 0; i < labels.length; i++) {
            await labels[i].click();
            // get computed style of the field
            const computedFocusedStyle = await page.evaluate(field => {
                return window.getComputedStyle(field).getPropertyValue('outline-color');
            }, fields[i]);
            expect(computedFocusedStyle).not.toBe('rgb(0, 0, 0)');
        }
    });
});

describe("Fields", () => {
    it("Form has 2 input fields", async () => {
        try {
            const labels = await page.$$('label');
            const fields = await page.$$('input');
            expect(labels.length).toBeGreaterThan(0);
            for (let i = 0; i < labels.length; i++) {
                await labels[i].click();
                // get computed style of the field
                const computedFocusedStyle = await page.evaluate(field => {
                    return window.getComputedStyle(field).getPropertyValue('outline-color');
                }, fields[i]);
                expect(computedFocusedStyle).not.toBe('rgb(0, 0, 0)');
            }
        } catch (err) {
            throw err;
        }
    });
    it("Input fields should have the 'required' attribute", async () => {
        try {
            const inputFields = await page.$$('input');
            expect(inputFields.length).toBe(2);
            expect(inputFields).toBeTruthy();
        } catch (err) {
            throw err;
        }
    });
});

describe("Labels", () => {
    it("Input fields have associated labels", async () => {
        const labels = await page.$$eval('input', els => els.filter(el => document.querySelector(`label[for="${el.id}"]`)));
        expect(labels.length).toBeGreaterThanOrEqual(2);
    });
});

describe("Form Buttons", () => {
    it("Page should have `Let's go` and `surprise me` buttons", async () => {
        try {
            // get element contains "me" text
            const me = await page.$eval('*', el => el.innerHTML.includes('me'));
            expect(me).toBeTruthy();
            // get element contains "go" text
            const go = await page.$eval('*', el => el.innerHTML.includes('go'));
            expect(go).toBeTruthy();
            
        } catch (err) {
            throw err;
        }
    });
    it("`Let's go` button should submit the form", async () => {
        try {
            // get element has attribute type='submit'
            const submit = await page.$x('//*[@type="submit"]');
            expect(submit.length).toBe(1);
        } catch (err) {
            throw err;
        }
    });
});
describe("On Submit", () => {
    it("Form is submitted on click on submit button", async () => {
        try {
            const inputFields = await page.$$('input');
            await inputFields[0].type('London');
            await inputFields[1].type('Paris');
            const goButton = await page.$x('//*[contains(text(), "go")]');
            await goButton[0].click();
            await page.waitForNavigation();
            expect(page.url()).toBe('file://' + path.resolve('./index.html?from=London&to=Paris'));
        } catch (err) {
            throw err;
        }
    });
});
