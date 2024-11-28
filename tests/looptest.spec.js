const { test, expect } = require('@playwright/test');
const testData = require('../test-data.json');

test.describe('Asana Ticket Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('https://app.asana.com/-/login');
    await page.fill('input[name="e"]', 'ben+pose@workwithloop.com');
    await page.click('div.ButtonThemeablePresentation--isEnabled.LoginEmailForm-continueButton');
    await page.fill('input[name="p"]', 'Password123');
    await page.click('div[role="button"]:has-text("Log in")');
  });

  for (const { testCase, page: projectPage, task, column, tags } of testData) {
    test(testCase, async ({ page }) => {
      await page.click(`text=${projectPage}`);

      // Locate the column by its name
      const columnLocator = page.locator(`h3.HighlightSol:has-text("${column}")`)
      .locator('xpath=ancestor::div[contains(@class, "CommentOnlyBoardColumn CommentOnlyBoardBody-column")]');
      await expect(columnLocator).toBeVisible({ timeout: 10000 });

      // Locate the task within the column
      const taskLocator = columnLocator.locator(
        `.CommentOnlyBoardColumnCardsContainer-itemContainer:has(.BoardCard-taskName:has-text("${task}"))`);
      
      // Ensure the task is visible in the column
      await taskLocator.waitFor({ state: 'visible', timeout: 10000 });
      await expect(taskLocator).toBeVisible();

      // Verify task tags
      for (const tag of tags) {
        await expect(taskLocator.locator(`text=${tag}`)).toBeVisible();
      }
    });
  }
});
