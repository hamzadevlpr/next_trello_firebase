import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
});

test.describe('Task Manager - Add, Edit, and Save Task', () => {
  test('should login and rename a task', async ({ page }) => {
    await page.fill('//input[@data-id="email"]', 'hamzaxeverse@gmail.com');
    await page.waitForTimeout(1000);
    await page.fill('//input[@data-id="password"]', 'hamza123');
    await page.waitForTimeout(1000);
    await page.click('//button[@data-id="loginbtn"]');
    await page.waitForTimeout(2000);

    await page.waitForSelector('//img[@alt="Logo"]');
    await expect(page.locator('//img[@alt="Logo"]')).toBeVisible();
    await page.waitForTimeout(1000);

    await (await page.waitForSelector('//button[@button-click="add-column"]')).click();
    await page.waitForTimeout(2000);

    await (await page.waitForSelector('//button[@btn-task="addTask"]')).click();
    await page.waitForTimeout(2000);

    await page.click('//button[@title="Edit Task"]');
    await page.waitForTimeout(2000);

    await page.keyboard.press('Control+A');
    await page.waitForTimeout(2000);
    await page.keyboard.press('Backspace');
    await page.waitForTimeout(2000);

    await page.keyboard.type('Hello World!');
    await page.waitForTimeout(1000);

    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);

    const originalTask = await page.locator('//p[@contenteditable="false" and text()="Task 1"]');
    await expect(originalTask).toHaveCount(0);
    await page.waitForTimeout(2000);
    await page.click('//button[@title="DeleteTask"]');
    await page.waitForTimeout(2000);
    await page.click('//button[@title="deleteColumn"]');
    await page.waitForTimeout(2000);
    await page.click('//button[@data-btn="signout"]');
  });
});
