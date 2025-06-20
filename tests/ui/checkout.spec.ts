import { test} from '@playwright/test';
import { ProductPage } from '../pages/ProductPage.ts'
import { CartPage } from '../pages/CartPage.ts'
import { LoginPage } from '../pages/LoginPage.ts'
import { CheckoutPage } from '../pages/CheckoutPage.ts'
import { RegisterPage } from '../pages/RegisterPage.ts'
import { InvoicesPage } from '../pages/InvoicesPage.ts';
import user from '../fixtures/user.json';
import products from '../fixtures/products.json';
import checkout_details from '../fixtures/checkout.json';

//Testing for how 1 product is added to the cart
test.describe('single checkout', () => {
    let first_product;

    test.beforeEach(async ({ page }) => {
        await page.goto('https://practicesoftwaretesting.com/');
        first_product = products.find(product => product.id === "1");
        const product = new ProductPage(page);
        await product.SelectItem(first_product.name)
        await product.AddToCart();
        await product.OpenCart();
        //Checking if the proper item has been added to the cart;
        const cart = new CartPage(page);
        await cart.VerifyItemInCart(first_product.name);
        await cart.GoToLogin();
        const login = new LoginPage(page)
        await login.EnterEmail(user.email);
        await login.EnterPassword(user.correct_password);
        await login.Login();

        const isLoginErrorVisible = await login.CheckErrorMessage();

        if (isLoginErrorVisible) {
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
            await page.waitForTimeout(3000);
            await login.EnterEmail(user.email);
            await login.EnterPassword(user.correct_password);
            await login.Login();
            await page.waitForTimeout(3000);
            await product.OpenCart();
            await cart.GoToLogin();
        }

        await cart.GoToBilling();
        await cart.GoToCheckout();

    })

    test('valid checkout', async ({ page }) => {
        const checkout = new CheckoutPage(page);
        await checkout.SelectPayment(checkout_details.type);
        await checkout.EnterBankName(checkout_details.bank_name);
        await checkout.EnterAccountName(checkout_details.account_name);
        await checkout.EnterAccountNumber(checkout_details.valid_account_number);
        await checkout.ConfirmOrder();

        // Getting the inovice number
        const invoiceNumber = await checkout.GetInvoice();
        console.log(`Order ${invoiceNumber} placed and verified successfully for a single item! - Test Passed`);
    });

    //Testing invalid checkout with invalid payment
    test('invalid checkout', async ({ page }) => {
        const checkout = new CheckoutPage(page);
        await checkout.SelectPayment(checkout_details.type);
        await checkout.EnterBankName(checkout_details.bank_name);
        await checkout.EnterAccountName(checkout_details.account_name);
        await checkout.EnterAccountNumber(checkout_details.invalid_account_number);

        await checkout.CheckError();
        console.log("Invalid bank account number! - Test Passed")
    });
})


//Testing multiple product order
test('multiple items', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    const product = new ProductPage(page);
    let total = 0;
    let i = 0;
    for (const productData of products) {
        await product.SelectItem(productData.name);
        await product.AddToCart();
        await product.BackToHome();
        total += productData.price;
        i++;
        if (i == 4) {
            product.GoToPage("2");
        }
    }

    const formattedTotal = `$ ${total.toFixed(2)}`;
    await product.OpenCart();

    //Login
    const cart = new CartPage(page);
    await cart.GoToLogin();
    const login = new LoginPage(page)
    await login.EnterEmail(user.email);
    await login.EnterPassword(user.correct_password);
    await login.Login();

    const isLoginErrorVisible = await login.CheckErrorMessage();

    if (isLoginErrorVisible) {
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
        await page.waitForTimeout(3000);
        await login.EnterEmail(user.email);
        await login.EnterPassword(user.correct_password);
        await login.Login();
        await page.waitForTimeout(3000);
        await product.OpenCart();
        await cart.GoToLogin();
    }

    await cart.GoToBilling();
    await cart.GoToCheckout();
    const checkout = new CheckoutPage(page);
    await checkout.SelectPayment(checkout_details.type);
    await checkout.EnterBankName(checkout_details.bank_name);
    await checkout.EnterAccountName(checkout_details.account_name);
    await checkout.EnterAccountNumber(checkout_details.valid_account_number);
    await checkout.ConfirmOrder();

    // Getting the inovice number
    const invoiceNumber = await checkout.GetInvoice();
    await checkout.CheckInvoices();

    const invoice = new InvoicesPage(page)
    await invoice.OpenInvoice(invoiceNumber, user.street)
    await invoice.VerifyTotal(formattedTotal);

    console.log(`Order ${invoiceNumber} placed and verified successfully! - Test Passed`);
})