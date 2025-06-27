import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.ts";
import { RegisterPage } from "../pages/RegisterPage.ts";
import user from "../fixtures/user.json";
import { LoginUser, RegisterUser } from "../utils.ts";

//tests for user Authentication
test.only("valid login", async ({ page }) => {
  //Test for a valid login
  await page.goto("https://practicesoftwaretesting.com/auth/login");
  const login = new LoginPage(page);
  LoginUser(page, login);
  if (await login.CheckErrorMessage()) {
    //registering user in case the website does not retain login data
    login.GoToRegistration();
    const register = new RegisterPage(page);
    RegisterUser(page, register, login);
  }
  await page.waitForTimeout(3000); //Accounting for slow login
  await expect(page.url()).toBe("https://practicesoftwaretesting.com/account");
  console.log("User logged in successfully - Test passed");
});

test("invalid password", async ({ page }) => {
  //Test for an invalid login password
  await page.goto("https://practicesoftwaretesting.com/auth/login");
  const login = new LoginPage(page);
  await login.EnterEmail(user.email);
  await login.EnterPassword(user.incorrect_password);
  await login.Login();
  await login.VerifyLoginError();
  console.log("Invalid password! - Test Passed");
});

test("invalid account", async ({ page }) => {
  //Test for an invalid account
  await page.goto("https://practicesoftwaretesting.com/auth/login");
  const login = new LoginPage(page);
  await login.EnterEmail(user.incorrect_email);
  await login.EnterPassword(user.correct_password);
  await login.Login();
  await login.VerifyLoginError();
  console.log("Invalid Account! - Test Passed");
});
