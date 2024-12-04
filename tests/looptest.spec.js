require('dotenv').config();
import { test, expect } from '@playwright/test';
import testData from '../test-data.json';
import login from './utils/login';

test.describe('Asana Ticket Verification', () => {
  test.beforeEach(async ({ page }) => {
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;

    // Use the imported login function
    await login(page, email, password);
  });

  for (const { testCase, page: projectPage, task, column, tags } of testData) {
    test(testCase, async ({ page }) => {
      await page.click(`text=${projectPage}`);

      const columnLocator = page.locator(`h3.HighlightSol:has-text("${column}")`)
        .locator('xpath=ancestor::div[contains(@class, "CommentOnlyBoardColumn CommentOnlyBoardBody-column")]');
      await expect(columnLocator).toBeVisible({ timeout: 10000 });

      const taskLocator = columnLocator.locator(
        `.CommentOnlyBoardColumnCardsContainer-itemContainer:has(.BoardCard-taskName:has-text("${task}"))`
      );
      await taskLocator.waitFor({ state: 'visible', timeout: 10000 });
      await expect(taskLocator).toBeVisible();

      for (const tag of tags) {
        await expect(taskLocator.locator(`text=${tag}`)).toBeVisible();
      }
    });
  }
});
