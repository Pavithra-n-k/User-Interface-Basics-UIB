const puppeteer = require("puppeteer");
const path = require('path');
const fs = require('fs');
const browserOptions = {
    headless: true,
    ignoreHTTPSErrors: true,
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
    } catch (e) { }
    done();
});

describe('Flex layout', () => {
    it("Page uses a flex layout dividing the page into 3 parts horizontally", async () => {
        const horizontalFlexContainersContaningThreeColumns = await page.$$eval('*', els => els.filter(el => {
            const styles = getComputedStyle(el)
            return styles.display == 'flex' && styles.flexDirection == 'row' && el.children.length == 3
        }));
        expect(horizontalFlexContainersContaningThreeColumns.length).toBeTruthy();
    });
    
    it("Flex Container should take the full height of the viewport", async () => {
        const viewportHeight = await page.evaluate(() => window.innerHeight);
        const flexHeights = await page.$$eval('*', els => {
            const found = els.filter(el => {
                const styles = getComputedStyle(el)
                return styles.display == 'flex' && styles.flexDirection == 'row' && el.children.length == 3
            })
            return found.map(el => el.offsetHeight)
        });
        expect(flexHeights).toContain(viewportHeight);
    })
});

describe('Fonts and Icons', () => {
    it("Font awesome should be used", async () => {
        const fontAwesome = await page.evaluate(() => {
            return document.querySelector('link[href*="fontawesome"]');
        });
        expect(fontAwesome).toBeTruthy();
    });
    it("Google fonts should be used", async () => {
        const linkTag = await page.$('link[href*="fonts.googleapis.com"]')
        const importTag = fs.readFileSync(path.resolve('./style.css'), 'utf8').match(/@import url\(.*fonts\.googleapis\.com.*\)/i);
        expect(linkTag || importTag).toBeTruthy()
    });
})