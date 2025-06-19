import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage.ts'
import { CartPage } from '../pages/CartPage.ts'
import { LoginPage } from '../pages/LoginPage.ts'
import { CheckoutPage } from '../pages/CheckoutPage.ts'
import { RegisterPage } from '../pages/RegisterPage.ts'

//Testing for how 1 product is added to the cart
test('valid checkout', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');

    await page.locator('h5.card-title:text("Combination Pliers")').click();

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
    await login.EnterEmail('John.Doe@gmail.com');
    await login.EnterPassword('JohnDoe1+');
    await login.Login();

await page.waitForTimeout(2000);
    const isLoginErrorVisible = await page.locator('[data-test="login-error"]').isVisible();

    if (isLoginErrorVisible) {
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
           await register.EnterEmail("John.Doe@gmail.com");
           await register.EnterPassword("JohnDoe1+");
           await register.Register();
        const login = new LoginPage(page)
        await login.EnterEmail('John.Doe@gmail.com');
        await login.EnterPassword('JohnDoe1+');
        await login.Login();
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

    await page.locator('h5.card-title:text("Combination Pliers")').click();

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
    await login.EnterEmail('John.Doe@gmail.com');
    await login.EnterPassword('JohnDoe1+');
    await login.Login();
await page.waitForTimeout(2000);
    const isLoginErrorVisible = await page.locator('[data-test="login-error"]').isVisible();

    if (isLoginErrorVisible) {
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
            await register.EnterEmail("John.Doe@gmail.com");
            await register.EnterPassword("JohnDoe1+");
            await register.Register();
        const login = new LoginPage(page)
        await login.EnterEmail('John.Doe@gmail.com');
        await login.EnterPassword('JohnDoe1+');
        await login.Login();
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

//Testing multiple product order
test.only('multiple items', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');

    await page.locator('h5.card-title:text("Combination Pliers")').click();

    const product = new ProductPage(page);
    await product.AddToCart();

    await page.goto('https://practicesoftwaretesting.com/');
    await page.locator('h5.card-title:text("Claw Hammer with Shock Reduction Grip")').click();

    await product.AddToCart();
    await page.goto('https://practicesoftwaretesting.com/');
    await page.locator('h5.card-title:text("Bolt Cutters")').click();

    await product.AddToCart();

    await page.goto('https://practicesoftwaretesting.com/');
    await page.locator('h5.card-title:text("Thor Hammer")').click();

    await product.AddToCart();

    await page.goto('https://practicesoftwaretesting.com/');
    await page.locator('a[aria-label="Page-2"]').click();
    await page.locator('h5.card-title:text("Wood Saw")').click();

    await product.AddToCart();
    await page.locator('[data-test="nav-cart"]').click();

    //Login
    const cart = new CartPage(page);
    await cart.GoToLogin();
    await page.pause();
    const login = new LoginPage(page)
    await login.EnterEmail('John.Doe@gmail.com');
    await login.EnterPassword('JohnDoe1+');
    await login.Login();

    const isLoginErrorVisible = await page.locator('//html/body/app-root/div/app-checkout/aw-wizard/div/aw-wizard-step[2]/app-login/div/div/div/div/div').isVisible();
    console.log(isLoginErrorVisible);

    if (isLoginErrorVisible) {
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
            await register.EnterEmail("John.Doe@gmail.com");
            await register.EnterPassword("JohnDoe1+");
            await register.Register();
        const login = new LoginPage(page)
        await login.EnterEmail('John.Doe@gmail.com');
        await login.EnterPassword('JohnDoe1+');
        await login.Login();
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

    await page.locator('[data-test="nav-menu"]').click();
    await page.locator('[data-test="nav-my-invoices"]').click();
    await page.getByRole('row', { name: `${invoiceNumber} Abbey Road` }).getByRole('link').click();
    const totalCost = await page.locator('[data-test="total"]').inputValue();
    expect(totalCost).toBe("$ 99.29");
    console.log(`Order ${invoiceNumber} placed and verified successfully!`);
})