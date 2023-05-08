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

describe('Flex Container', () => {
    it("`.genres` should be a flex container", async () => {
        const genresContainer = await page.$eval('.genres', el => getComputedStyle(el).display);
        expect(genresContainer).toBe('flex');
    });
    it("Flex container should contain 6 sub-sections", async () => {
        const genres = await page.$$('.genres > *');
        expect(genres.length).toBeGreaterThan(5);
    });
});

describe('Genres Colors', () => {
    it("Genres should be styled with specified background colors", async () => {
        const backgroundColors = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('background-color')));
        expect(backgroundColors).toEqual(expect.arrayContaining([
            'rgb(30, 144, 255)',
            'rgb(190, 178, 178)',
            'rgb(255, 214, 30)',
            'rgb(0, 0, 0)',
            'rgb(169, 169, 169)',
            'rgb(255, 0, 0)',
        ]));
    });
});

describe('Flex items text alignment', () => {
    it("Each genre's text should be centered", async () => {
        const alignment = await page.$$eval('.genres > *', el => Array.from(el).map(e => {
            const style = getComputedStyle(e)
            return `${style.getPropertyValue('align-items')} ${style.getPropertyValue('text-align')}`
        }).join(" "));
        expect(alignment).toContain('center');
    });
});

describe('Flex items height & width', () => {
    it("Each flex item should have a width of 200px and a height of 100px", async () => {
        const width = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('width')));
        const height = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('height')));
        expect(width).toEqual(expect.arrayContaining([
            '200px',
        ]));
        expect(height).toEqual(expect.arrayContaining([
            '100px',
        ]));
    });
});

describe('Romance section', () => {
    it("'Romance' section should take up to 3x as much space as other sections", async () => {
        const romanceFlexGrow = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('flex-grow')));
        expect(romanceFlexGrow).toEqual(expect.arrayContaining([
            '3'
        ]));
    });
});

describe('Comedy section', () => {
    it("'Comedy' section should take up to 6x as much space as other sections", async () => {
        const comedyFlexGrow = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('flex-grow')));
        expect(comedyFlexGrow).toEqual(expect.arrayContaining([
            '6'
        ]));
    });
});
