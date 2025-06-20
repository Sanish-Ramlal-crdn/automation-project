import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.ts'
import { RegisterPage } from '../pages/RegisterPage.ts'

//tests for user Authentication
test('user registration', async ({ page }) => {  //Test for a valid registration
    await page.goto('https://practicesoftwaretesting.com/auth/register');
    const register = new RegisterPage(page);
    await register.EnterFirstName("John");
    await register.EnterLastName("Doe");
    await register.EnterDOB("2001-01-01");
    await register.EnterStreet("Abbey Road");
    await register.EnterPostalCode("12345");
    await register.EnterCity("London");
    await register.EnterState("London");
    await register.SelectCountry("GB");
    await register.EnterPhone("1234567");
    await register.EnterEmail("Pohn.Doe@gmail.com");
    await register.EnterPassword("JohnDoe1+");
    await register.Register();
    await page.waitForTimeout(2000);
    await expect(page.url()).toBe('https://practicesoftwaretesting.com/auth/login');
    console.log('User registered successfully');
});

test('valid login', async ({ page }) => {  //Test for a valid login
    await page.goto('https://practicesoftwaretesting.com/auth/login');
    const login = new LoginPage(page)
    await login.EnterEmail('John.Doe@gmail.com');
    await login.EnterPassword('JohnDoe1+');
    await login.Login();
    await page.waitForTimeout(2000);  //Accounting for slow login
    await expect(page.url()).toBe('https://practicesoftwaretesting.com/account');
    console.log('User logged in successfully');
});

test('invalid password', async ({ page }) => {  //Test for an invalid login password
    await page.goto('https://practicesoftwaretesting.com/auth/login');
    const login = new LoginPage(page)
    await login.EnterEmail('John.Doe@gmail.com');
    await login.EnterPassword('JohnDoe1+');
    await login.Login();
    await expect(page.locator('[data-test="login-error"]')).toBeVisible;
    console.log('Invalid password!')
});

test('invalid account', async ({ page }) => {  //Test for an invalid account
    await page.goto('https://practicesoftwaretesting.com/auth/login');
    const login = new LoginPage(page)
    await login.EnterEmail('John.Doe@gmail.com');
    await login.EnterPassword('JohnDoe1+');
    await login.Login();

    await expect(page.locator('[data-test="login-error"]')).toBeVisible
    console.log('Invalid Account!');
});
