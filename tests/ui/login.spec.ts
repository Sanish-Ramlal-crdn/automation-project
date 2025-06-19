import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.ts'

//tests for user Authentication
test('user registration', async ({ page }) => {  //Test for a valid registration
    await page.goto('https://practicesoftwaretesting.com/');
    const login = new LoginPage(page)
    await login.GoToLoginPage()
    await page.locator('[data-test="register-link"]').click();
    await page.locator('[data-test="first-name"]').fill('John');
    await page.locator('[data-test="last-name"]').fill('Doe');
    await page.locator('[data-test="dob"]').fill('2001-01-01');
    await page.locator('[data-test="street"]').fill('Abbey Road');
    await page.locator('[data-test="postal_code"]').fill('12345');
    await page.locator('[data-test="city"]').fill('London');
    await page.locator('[data-test="state"]').fill('London');
    await page.locator('[data-test="country"]').selectOption('GB');
    await page.locator('[data-test="phone"]').fill('1234567');
    await page.locator('[data-test="email"]').fill('John.Doe@gmail.com');
    await page.locator('[data-test="password"]').fill('JohnDoe1+');
    await page.locator('[data-test="register-submit"]').click();
});

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
