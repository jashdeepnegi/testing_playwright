import { test, expect } from '@playwright/test';

// reset storagestate to empty for this file
test.use({ storageState: {cookies: [], origins: []}});

test('test', async ({ page }) => {
  await page.goto('https://news.google.com/home?hl=en-IN&gl=IN&ceid=IN:en');
  await page.getByLabel('For you').click();
  await page.getByRole('button', { name: 'No, thanks' }).click();
  await page.getByText('HomeFor youFollowingNews').click();
  await page.getByLabel('For you').click();
  await page.getByRole('button', { name: 'No, thanks' }).click();
  await page.goto('https://news.google.com/home?hl=en-IN&gl=IN&ceid=IN:en');
  await page.getByRole('combobox', { name: 'Search for topics, locations' }).click();
  await page.getByRole('combobox', { name: 'Search for topics, locations' }).click();
  await page.getByRole('combobox', { name: 'Search for topics, locations' }).fill('sports');
  await page.getByRole('combobox', { name: 'Search for topics, locations' }).press('Enter');
  await page.getByLabel('World', { exact: true }).click();
  await expect(page.getByText('HomeFor youFollowingNews')).toBeVisible();

  
});