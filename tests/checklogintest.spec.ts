import {test, expect} from '@playwright/test';

test.use({storageState: 'playwright/.auth/user.json'})

test('view homepage', async ({page}) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    // check I am at logo
    await expect(page.locator('.app_logo')).toBeVisible();
    
})


