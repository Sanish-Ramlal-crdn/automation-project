import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage.ts'
import { CartPage } from '../pages/CartPage.ts'
import { LoginPage } from '../pages/LoginPage.ts'
import { CheckoutPage } from '../pages/CheckoutPage.ts'

//Testing for how 1 product is added to the cart
test.only('valid checkout', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');

    await page.locator('h5.card-title:has-text("Combination Pliers")').click();

    const product = new ProductPage(page);
    await product.AddToCart();
    await page.getByRole('alert', { name: 'Product added to shopping' }).click();
    await page.locator('[data-test="nav-cart"]').click();

    //Checking if the proper item has been added to the cart;
    await expect(page.locator('[data-test="product-title"]')).toHaveText('Combination Pliers');

    //Login
    const cart = new CartPage(page);
    await cart.GoToLogin();
    const login = new LoginPage(page)
    await page.pause();
    await login.Login('John.Doe@gmail.com', 'JohnDoe1+');


    const isLoginErrorVisible = await page.locator('[data-test="login-error"]').isVisible();

    if (isLoginErrorVisible) {
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
        const login = new LoginPage(page)
        await login.Login('John.Doe@gmail.com', 'JohnDoe1+');
        await page.locator('[data-test="nav-cart"]').click();
        const cart = new CartPage(page);
        await cart.GoToLogin();
    } 

    await cart.GoToBilling();
    await cart.GoToCheckout();
    await page.locator('[data-test="payment-method"]').selectOption('bank-transfer');
    const checkout = new CheckoutPage(page);
    await checkout.CompleteOrder("Test Bank", "Test Account", "1234567");
    await checkout.ConfirmOrder();

    await page.locator('div#order-confirmation').click();

    // Getting the inovice number
    const invoiceNumber = await page.$eval('div#order-confirmation span', element => element.textContent);
    console.log(`Order ${invoiceNumber} placed and verified successfully!`);


});

//Testing invalid checkout with invalid payment
test('invalid checkout', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');

    await page.locator('h5.card-title:has-text("Combination Pliers")').click();

    const product = new ProductPage(page);
    await product.AddToCart();
    await page.getByRole('alert', { name: 'Product added to shopping' }).click();
    await page.locator('[data-test="nav-cart"]').click();

    //Checking if the proper item has been added to the cart;
    await expect(page.locator('[data-test="product-title"]')).toHaveText('Combination Pliers');

    //Login
    const cart = new CartPage(page);
    await cart.GoToLogin();
    const login = new LoginPage(page)
    await login.Login('John.Doe@gmail.com', 'JohnDoe1+')

        const isLoginErrorVisible = await page.locator('[data-test="login-error"]').isVisible();

    if (isLoginErrorVisible) {
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
        const login = new LoginPage(page)
        await login.Login('John.Doe@gmail.com', 'JohnDoe1+');
        await page.locator('[data-test="nav-cart"]').click();
        const cart = new CartPage(page);
        await cart.GoToLogin();
    } 

    await cart.GoToBilling();
    await cart.GoToCheckout();
    await page.locator('[data-test="payment-method"]').selectOption('bank-transfer');
    const checkout = new CheckoutPage(page);
    await checkout.CompleteOrder("Test Bank", "Test Account", "1234567");

    expect(page.locator('[class="alert alert-danger ng-star-inserted]')).toBeVisible;
    console.log("Invalid bank account number!")
});