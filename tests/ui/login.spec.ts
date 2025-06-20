import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.ts';
import { RegisterPage } from '../pages/RegisterPage.ts';
import user from '../fixtures/user.json';

//tests for user Authentication
test('valid login', async ({ page }) => {  //Test for a valid login
    await page.goto('https://practicesoftwaretesting.com/auth/login');
    const login = new LoginPage(page)
    await login.EnterEmail(user.email);
    await login.EnterPassword(user.correct_password);
    await login.Login();
    if (await login.CheckErrorMessage()) {  //registering user in case the website does not retain login data
        login.GoToRegistration();
        const register = new RegisterPage(page);
        await register.EnterFirstName(user.first_name);
        await register.EnterLastName(user.last_name);
        await register.EnterDOB(user.dob);
        await register.EnterStreet(user.street);
        await register.EnterPostalCode(user.postal_code);
        await register.EnterCity(user.city);
        await register.EnterState(user.state);
        await register.SelectCountry(user.country);
        await register.EnterPhone(user.phone);
        await register.EnterEmail(user.email);
        await register.EnterPassword(user.correct_password);
        await register.Register();
        await page.waitForTimeout(2000);
        await login.EnterEmail(user.email);
        await login.EnterPassword(user.correct_password);
        await login.Login();
    }
    await page.waitForTimeout(3000);  //Accounting for slow login
    await expect(page.url()).toBe('https://practicesoftwaretesting.com/account');
    console.log('User logged in successfully - Test passed');
});

test('invalid password', async ({ page }) => {  //Test for an invalid login password
    await page.goto('https://practicesoftwaretesting.com/auth/login');
    const login = new LoginPage(page)
    await login.EnterEmail(user.email);
    await login.EnterPassword(user.incorrect_password);
    await login.Login();
    await login.VerifyLoginError();
    console.log('Invalid password! - Test Passed')
});

test('invalid account', async ({ page }) => {  //Test for an invalid account
    await page.goto('https://practicesoftwaretesting.com/auth/login');
    const login = new LoginPage(page)
    await login.EnterEmail(user.incorrect_email);
    await login.EnterPassword(user.correct_password);
    await login.Login();
    await login.VerifyLoginError();
    console.log('Invalid Account! - Test Passed');
});
