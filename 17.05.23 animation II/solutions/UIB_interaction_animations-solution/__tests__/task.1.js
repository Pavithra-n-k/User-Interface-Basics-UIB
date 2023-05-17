const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

let browser;
let page;

const browserOptions = {
    headless: true,
    defaultViewport: null,
    devtools: true,
};
beforeAll(async () => {

    browser = await puppeteer.launch(browserOptions);
    page = await browser.newPage();
    await page.goto(`file://${path.resolve(__dirname, '../index.html')}`);

}, 30000);

afterAll(async () => {
    await browser.close();
});

describe('Navigation markup', () => {
    it('`nav` tag should exist', () => {
        const indexPath = path.join(__dirname, '../index.html');
        const indexContent = fs.readFileSync(indexPath, 'utf8');
        expect(indexContent).toMatch(/<nav/);
    });

    it('`nav` should contain  3 `li` items', async () => {
        const navMenu = await page.$('nav');
        expect(navMenu).not.toBe(null);
        const navMenuItems = await navMenu.$$('li');
        expect(navMenuItems.length).toBe(3);
    });

    it('`nav` should contain "Start", "Profile" and "Logout" items', async () => {
        const navItemTexts = await page.$$eval('nav li', nodes => nodes.map(node => node.textContent));
        expect(navItemTexts.join(' ')).toMatch(/^(?=.*\bStart\b)(?=.*\bProfile\b)(?=.*\bLogout\b).*$/i)
    });
});
describe('Navigation styles', () => {
    it('Menu items should change background color on hover', async () => {
        const menuColors = await page.$eval('li', el => getComputedStyle(el).getPropertyValue('background-color'));
        await page.hover('li');
        const menuColorsHover = await page.$eval('li', el => getComputedStyle(el).getPropertyValue('background-color'));
        expect(menuColors).not.toBe(menuColorsHover);
    });
});