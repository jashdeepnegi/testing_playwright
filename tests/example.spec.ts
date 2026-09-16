import { test, expect, chromium } from "@playwright/test";

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    // Take screenshot directly to a buffer (no file path needed on disk)
    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('Failure Screenshot', {
      body: screenshot,
      contentType: 'image/png',
    });
  }
});


test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright1/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright1/);
  await expect(page).toHaveTitle(/Playwright/);

  await page.screenshot({path: `hello/screenshot${Date.now()}.png`, fullPage: true})

  // playwright logo
  await page.getByAltText('Playwright logo').screenshot({path: 'element.png'})

  // Click the get started link.
  await page.getByRole("link", { name: "Get started", exact: true }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole("heading", { name: "Installation" }))
    .toBeVisible();



});

test('dummy', async ({page})=> {
  //custom waiat by Js poling

})




