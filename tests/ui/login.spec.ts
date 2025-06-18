import { test, expect } from '@playwright/test';

test('valid login', async ({ page }) => {  //Test for a valid login
    await page.goto('https://practicesoftwaretesting.com/');
    await page.locator('[data-test="nav-sign-in"]').click();

    await page.locator('[data-test="email"]').fill('John.Doe@gmail.com');
    await page.locator('[data-test="password"]').fill('JohnDoe1+');
    await page.locator('[data-test="login-submit"]').click();

    await page.goto('https://practicesoftwaretesting.com/accounts');
});

test('invalid password', async ({ page }) => {  //Test for an invalid login password
    await page.goto('https://practicesoftwaretesting.com/');
    await page.locator('[data-test="nav-sign-in"]').click();

    await page.locator('[data-test="email"]').fill('John.Doe@gmail.com');
    await page.locator('[data-test="password"]').fill('JohnDoe1+-');
    await page.locator('[data-test="login-submit"]').click();

    await expect(page.locator('[data-test="login-error"]')).toBeVisible;
    
    await page.pause()
});

test('invalid account', async ({ page }) => {  //Test for an invalid account
    await page.goto('https://practicesoftwaretesting.com/');
    await page.locator('[data-test="nav-sign-in"]').click();

    await page.locator('[data-test="email"]').fill('pohn.Doe@gmail.com');
    await page.locator('[data-test="password"]').fill('JohnDoe1+');
    await page.locator('[data-test="login-submit"]').click();

    await expect(page.locator('[data-test="login-error"]')).toBeVisible;

});
