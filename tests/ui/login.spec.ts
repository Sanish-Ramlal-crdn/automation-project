import { test, expect } from '@playwright/test';

test('valid login', async ({ page }) => {  //Test for a valid login
    await page.goto('https://practicesoftwaretesting.com/');
    await page.locator('[data-test="nav-sign-in"]').click();

    await page.locator('[data-test="email"]').fill('John.Doe@gmail.com');
    await page.locator('[data-test="password"]').fill('JohnDoe1+');
    await page.locator('[data-test="login-submit"]').click();

    await page.goto('https://practicesoftwaretesting.com/accounts');
});

test.only('invalid login', async ({ page }) => {  //Test for an invalid login
    await page.goto('https://practicesoftwaretesting.com/');
    await page.locator('[data-test="nav-sign-in"]').click();

    await page.locator('[data-test="email"]').fill('John.Doe@gmail.com');
    await page.locator('[data-test="password"]').fill('JohnDoe1+');
    await page.locator('[data-test="login-submit"]').click();

    await expect(page).not.toHaveTitle("Overview - Practice Software Testing - Toolshop - v5.0");
});