import { test as setup, expect } from "@playwright/test";

setup("authenticate", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.getByRole("textbox", { name: "Username" }).fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.locator('[name="login-button"]').click();
  await page.waitForURL("**/inventory.html");
  await page.context().storageState({ path: "playwright/.auth/user.json" });
});
