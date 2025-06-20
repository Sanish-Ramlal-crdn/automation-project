import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage.ts'
import { CartPage } from '../pages/CartPage.ts'
import { LoginPage } from '../pages/LoginPage.ts'
import { CheckoutPage } from '../pages/CheckoutPage.ts'
import { RegisterPage } from '../pages/RegisterPage.ts'
import { InvoicesPage } from '../pages/InvoicesPage.ts';

//Testing for how 1 product is added to the cart
test('valid checkout', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');

    const product = new ProductPage(page);
    await product.SelectItem("Combination Pliers")
    await product.AddToCart();
    await product.OpenCart();
    //Checking if the proper item has been added to the cart;
    const cart = new CartPage(page);
    await cart.VerifyItemInCart("Combination Pliers");
    await cart.GoToLogin();
    const login = new LoginPage(page)
    await login.EnterEmail('John.Doe@gmail.com');
    await login.EnterPassword('JohnDoe1+');
    await login.Login();

    const isLoginErrorVisible = await login.CheckErrorMessage();

    if (isLoginErrorVisible) {
        login.GoToRegistration();
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
        await login.EnterEmail('John.Doe@gmail.com');
        await login.EnterPassword('JohnDoe1+');
        await login.Login();
        await product.OpenCart();
        await cart.GoToLogin();
    }

    await cart.GoToBilling();
    await cart.GoToCheckout();
    const checkout = new CheckoutPage(page);
    await checkout.SelectPayment('bank-transfer');
    await checkout.EnterBankName("Test Bank");
    await checkout.EnterAccountName("Test Account");
    await checkout.EnterAccountNumber("1234567");
    await checkout.ConfirmOrder();

    // Getting the inovice number
    const invoiceNumber = await checkout.GetInvoice();
    console.log(`Order ${invoiceNumber} placed and verified successfully!`);
});

//Testing invalid checkout with invalid payment
test('invalid checkout', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');

    const product = new ProductPage(page);
    await product.SelectItem("Combination Pliers")
    await product.AddToCart();
    await product.OpenCart();
    //Checking if the proper item has been added to the cart;
    const cart = new CartPage(page);
    await cart.VerifyItemInCart("Combination Pliers");
    await cart.GoToLogin();
    const login = new LoginPage(page)
    await login.EnterEmail('John.Doe@gmail.com');
    await login.EnterPassword('JohnDoe1+');
    await login.Login();

    const isLoginErrorVisible = await login.CheckErrorMessage();

    if (isLoginErrorVisible) {
        login.GoToRegistration();
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
        await login.EnterEmail('John.Doe@gmail.com');
        await login.EnterPassword('JohnDoe1+');
        await login.Login();
        await product.OpenCart();
        await cart.GoToLogin();
    }

    await cart.GoToBilling();
    await cart.GoToCheckout();
    const checkout = new CheckoutPage(page);
    await checkout.SelectPayment('bank-transfer');
    await checkout.EnterBankName("Test Bank");
    await checkout.EnterAccountName("Test Account");
    await checkout.EnterAccountNumber("1234567-");

    await checkout.CheckError();
    console.log("Invalid bank account number!")
});

//Testing multiple product order
test.only('multiple items', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    const product = new ProductPage(page);
    await product.SelectItem("Combination Pliers")
    await product.AddToCart();
    await product.BackToHome();

    await product.SelectItem("Claw Hammer with Shock Reduction Grip")
    await product.AddToCart();
    await product.BackToHome();

    await product.SelectItem("Bolt Cutters")
    await product.AddToCart();
    await product.BackToHome();

    await product.SelectItem("Thor Hammer")
    await product.AddToCart();
    await product.BackToHome();

    product.GoToPage("2");

    await product.SelectItem("Wood Saw")
    await product.AddToCart();
    await product.OpenCart();

    //Login
    const cart = new CartPage(page);
    await cart.GoToLogin();
    const login = new LoginPage(page)
    await login.EnterEmail('John.Doe@gmail.com');
    await login.EnterPassword('JohnDoe1+');
    await login.Login();

    const isLoginErrorVisible = await login.CheckErrorMessage();

    if (isLoginErrorVisible) {
        login.GoToRegistration();
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
        await login.EnterEmail('John.Doe@gmail.com');
        await login.EnterPassword('JohnDoe1+');
        await login.Login();
        await product.OpenCart();
        await cart.GoToLogin();
    }

    await cart.GoToBilling();
    await cart.GoToCheckout();
    const checkout = new CheckoutPage(page);
    await checkout.SelectPayment('bank-transfer');
    await checkout.EnterBankName("Test Bank");
    await checkout.EnterAccountName("Test Account");
    await checkout.EnterAccountNumber("1234567");
    await checkout.ConfirmOrder();

    // Getting the inovice number
    const invoiceNumber = await checkout.GetInvoice();

    await checkout.CheckInvoices();

    const invoice = new InvoicesPage(page)
    await invoice.OpenInvoice(invoiceNumber, "Abbey Road")
    await invoice.VerifyTotal("$ 99.29")

    console.log(`Order ${invoiceNumber} placed and verified successfully!`);
})