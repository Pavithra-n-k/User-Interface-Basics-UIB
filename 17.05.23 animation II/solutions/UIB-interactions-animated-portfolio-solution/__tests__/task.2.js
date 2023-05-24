const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
let browser;
let page;
const browserOptions = {
    headless: true,
    defaultViewport: null,
    devtools: true
};

beforeAll(async () => {
    browser = await puppeteer.launch(browserOptions);
    page = await browser.newPage();
    await page.goto('file://' + path.join(__dirname, '../index.html'));
    await page.setViewport({
        width: 1920,
        height: 1080
    });
}, 30000);

afterAll(async () => {
    await browser.close();
});

describe("Sub-menus", () => {
    test("Navigation has submenus that are revealed on hover", async () => {
        const elements = await page.$$("body *")
        let changesOnHover
        for(let j=0; j<elements.length; j++) {
            const el = elements[j]
            try {
                const children = await page.evaluate(e => [...e.querySelectorAll("*")].map(i => getComputedStyle(i).display).join(" "), el)
                await el.hover()
                const childrenOnHover = await page.evaluate(e => [...e.querySelectorAll("*")].map(i => getComputedStyle(i).display).join(" "), el)
                if(children !== childrenOnHover) {
                    changesOnHover = el
                    break
                }
            } catch (error) {
                //console.error(error)
            }
        }
        expect(changesOnHover).toBeDefined()
    })
})
describe("Info icon", () => {
    test("clip-path animation is used to reveal the content on hover over info icon", async () => {
        const elements = await page.$$("body *")
        let changesOnHover
        for(let j=0; j<elements.length; j++) {
            const el = elements[j]
            try {
                const clipPath = await page.evaluate(e => getComputedStyle(e).clipPath, el)
                const child = await page.evaluateHandle(e => e.firstElementChild, el)
                await child.hover()
                await page.waitForTimeout(20);
                const clipPathOnHover = await page.evaluate(e => getComputedStyle(e).clipPath, el)
                if(clipPath !== clipPathOnHover) {
                    changesOnHover = el
                    break
                }
            } catch (error) {
                //console.error(error)
            }
        }
        expect(changesOnHover).toBeDefined()
    })
})
describe("Animated text", () => {
    test("Looping animation is applied to the text at center of page", async () => {
        const animationIteration = await page.$$eval("body *", els => {
            for(el of els) {
                if(getComputedStyle(el).animationIterationCount === "infinite") return true
            }
        })
        expect(animationIteration).toBeTruthy()
    })
})
describe("Images", () => {
    test("Images provided in `images` are used", async () => {
        const images = await page.$$eval("img", els => els.map(el => el.src).join(" "))
        expect(images).toContain("logo.png")
    })
})