const path = require('path');

describe('Header', () => {
  beforeAll(async () => {
    await page.goto('file://' + path.resolve('./index.html'));
  });

  it('should be present', async () => {
    const orangeBoxes = await page.$$eval('*', (els) =>
      els.filter((el) => getComputedStyle(el).backgroundColor === 'rgb(243, 81, 54)')
    );
    await expect(orangeBoxes.length).toBeGreaterThan(0);
  });

  it('should be 0 pixels from the top', async () => {
    const orangeBoxesTopPositions = await page.$$eval('*', (els) =>
      els
        .filter((el) => getComputedStyle(el).backgroundColor === 'rgb(243, 81, 54)')
        .map((el) => el.getBoundingClientRect().top)
    );

    await expect(orangeBoxesTopPositions).toEqual(expect.arrayContaining([0]));
  });

  it('should be as wide as the viewport', async () => {
    const orangeBoxesWidths = await page.$$eval('*', (els) =>
      els
        .filter((el) => getComputedStyle(el).backgroundColor === 'rgb(243, 81, 54)')
        .map((el) => el.getBoundingClientRect().width)
    );
    await expect(orangeBoxesWidths).toEqual(expect.arrayContaining([page.viewport().width]));
  });
});