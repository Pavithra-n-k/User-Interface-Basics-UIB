const puppeteer = require('puppeteer');
const path = require('path');
const assert = require('assert');

beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto('file://' + path.join(__dirname, '../index.html'));
}, 30000);

afterAll((done) => {
    try {
        this.puppeteer.close();
    } catch (e) { }
    done();
});

describe('Images', () => {
    test("Provided images show up on screen", async () => {
        const rect = await page.evaluate(() => {
            const img = document.querySelector('img');
            const { top, left, bottom, right } = img.getBoundingClientRect();
            return { top, left, bottom, right };
        });
        assert.ok(rect.top < rect.bottom && rect.left < rect.right, 'visible to the user');
    });
});

describe('Animation', () => {
    test('Multi step animations are used', async () => {
        const animation = await page.$$eval('*', els => els.map(el => el.getAnimations().map(a => a.effect.getKeyframes())))
        expect(animation).toEqual(expect.arrayContaining([
            expect.arrayContaining([
                expect.arrayContaining([
                    expect.objectContaining({offset: expect.any(Number)}),
                    expect.objectContaining({offset: expect.any(Number)})
                ])
            ])
        ]))
    });
    test('A looping animation is used', async () => {
        const fillMode = await page.$$eval('*', els => els.map(el => getComputedStyle(el)).filter(s => s.animationFillMode == "none" && s.animationName !== "none"))
        expect(fillMode.length).toBeGreaterThan(0)
    });
    test('An animation is used that persists the final state', async () => {
        const fillMode = await page.$$eval('*', els => els.map(el => getComputedStyle(el).animationFillMode))
        expect(fillMode).toEqual(expect.arrayContaining(["forwards"]))
    });
    test('Animations run sequentially as opposed to parallel (some start with a delay)', async () => {
        const delay = await page.$$eval('*', els => els.map(el => parseInt(getComputedStyle(el).animationDelay)).filter(d => d > 0))
        expect(delay).toEqual(expect.arrayContaining([expect.any(Number)]))
    });
});
