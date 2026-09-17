import { test, expect, chromium } from "@playwright/test";

// test.afterEach(async ({ page }, testInfo) => {
//   if (testInfo.status !== testInfo.expectedStatus) {
//     // Take screenshot directly to a buffer (no file path needed on disk)
//     const screenshot = await page.screenshot({ fullPage: true });
//     await testInfo.attach('Failure Screenshot', {
//       body: screenshot,
//       contentType: 'image/png',
//     });
//   }
// });


test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" ascre substring.
  await expect(page).toHaveTitle(/Playwright1/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright1/);
  await expect(page).toHaveTitle(/Playwright/);

  // await page.screenshot({path: `hello/screenshot${Date.now()}.png`, fullPage: true})

  // playwright logo
  // await page.getByAltText('Playwright logo').screenshot({path: 'element.png'})

  // Click the get started link.
  await page.getByRole("link", { name: "Get started", exact: true }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole("heading", { name: "Installation" }))
    .toBeVisible();



});

test('dummy', async ({page})=> {
  //capture broswer console
  // page.on('console', msg => console.log('Browser log: ', msg.text()))
  await chromium.launch({headless: false})
  // mock api response
  await page.route('**/api/user', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({name: 'Test user', age: 20})
    })
  })
  // modern, conceise way
  await page.route('**/api/user', async route => {
    await route.fulfill({
      status: 200,
      json: {name: 'Test user', age: 30}
    })
  })

  // block request (images)
  await page.route('**/*.{png,jpg,jpeg}', route => route.abort());
  // simulate server errror
  await page.route('**/api/data', async route => {
    await route.fulfill({
      status: 500,
      body: 'Internal Server Error'
    })
  })
})


test.only('verify homepage visual layout', async ({page}) => {
  await page.goto('https://playwright.dev/');

  // compare live page against 'homepage.png' baseline
  await expect(page).toHaveScreenshot('homepage.png', {
    maxDiffPixelRatio: 0.01, // tolerate up to 1% minor anti-aliasing diffs

  })

})



