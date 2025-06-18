import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.ts'

//tests for user Authentication
test('valid login', async ({ page }) => {  //Test for a valid login
    await page.goto('https://practicesoftwaretesting.com/');
    const login = new LoginPage(page)
    await login.GoToLoginPage()

    await login.Login('John.Doe@gmail.com','JohnDoe1+')

    await page.goto('https://practicesoftwaretesting.com/accounts');
});

test('invalid password', async ({ page }) => {  //Test for an invalid login password
    await page.goto('https://practicesoftwaretesting.com/');
    const login = new LoginPage(page)
    await login.GoToLoginPage()

    await login.Login('John.Doe@gmail.com','JohnDoe1+-')
    await expect(page.locator('[data-test="login-error"]')).toBeVisible;


});

test('invalid account', async ({ page }) => {  //Test for an invalid account
    await page.goto('https://practicesoftwaretesting.com/');
    const login = new LoginPage(page)
    await login.GoToLoginPage()

    await login.Login('pohn.Doe@gmail.com','JohnDoe1+')

    await expect(page.locator('[data-test="login-error"]')).toBeVisible

});
