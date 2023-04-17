const path = require('path');

describe('Logo', () => {
  beforeAll(async () => {
    await page.goto('file://' + path.resolve('./index.html'));
  });

  it('should be present', async () => {
    // find image tag where src ends with icon-cat.png
    await expect(page.$('img[src$="icon-cat.png"]')).resolves.toBeTruthy();
  });

  it('should be on the right', async () => {
    const left = await page.$eval('img[src$="icon-cat.png"]', logo => {
      return logo.getBoundingClientRect().left;
    });
    await expect(left).toBeGreaterThan(page.viewport().width/2);
  });
});