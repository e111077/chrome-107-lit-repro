import {test, expect} from '@playwright/test';

test.describe('Home page', () => {
  test('splashLogo accessible.', async ({page}) => {
    await page.goto('/');
  });
});