import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage.ts'
import { CartPage } from '../pages/CartPage.ts'

//Testing for how 1 product is added to the cart
test('select item', async ({ page }) => {  //Test for clicking an item and adding it to the cart
    await page.goto('https://practicesoftwaretesting.com/');
    const product = new ProductPage(page);
    await product.SelectItem("Combination Pliers")
    await product.AddToCart();
    await product.OpenCart();

    const cart = new CartPage(page)
    //Checking if the item has been added to the cart;
    await cart.VerifyItemInCart("Combination Pliers");
    console.log("Item added successfully!")
});

