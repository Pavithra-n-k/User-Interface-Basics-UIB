const path = require('path');

describe('Footer', () => {
  beforeAll(async () => {
    await page.goto('file://' + path.resolve('./index.html'));
  });

  it('should be present', async () => {
    // get elements with bg color #222
    const greyBoxes = await page.$$eval('*', (els) => 
      els.filter((el) => getComputedStyle(el).backgroundColor === 'rgb(34, 34, 34)')
    );
    await expect(greyBoxes.length).toBeGreaterThan(0);
  });

  it('should be at the bottom', async () => {
    const greyBoxesBottomPositions = await page.$$eval('*', (els) =>
      els
        .filter((el) => getComputedStyle(el).backgroundColor === 'rgb(34, 34, 34)')
        .map((el) => el.getBoundingClientRect().bottom)
    );
    await expect(greyBoxesBottomPositions).toEqual(
      expect.arrayContaining([page.viewport().height])
    );
  });

  it('should be as wide as the viewport', async () => {
    const greyBoxesWidths = await page.$$eval('*', (els) =>
      els
        .filter((el) => getComputedStyle(el).backgroundColor === 'rgb(34, 34, 34)')
        .map((el) => el.getBoundingClientRect().width)
    );
    await expect(greyBoxesWidths).toEqual(
      expect.arrayContaining([page.viewport().width])
    );
  });
});