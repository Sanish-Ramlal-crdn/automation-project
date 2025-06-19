import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage.ts'

//Testing for how 1 product is added to the cart
test('select item', async ({ page }) => {  //Test for clicking an item and adding it to the cart
    await page.goto('https://practicesoftwaretesting.com/');
    await page.locator('h5.card-title:has-text("Combination Pliers")').click();
    const product = new ProductPage(page);
    await product.AddToCart();
    await page.locator('[data-test="nav-cart"]').click();


    //Checking if the item has been added to the cart;
    await expect(page.locator('[data-test="product-title"]')).toHaveText('Combination Pliers');
});

test('search item', async ({ page }) => {  //Test for searching an item and adding it to the cart
    await page.goto('https://practicesoftwaretesting.com/');

    await page.locator('[data-test="search-query"]').click();
    await page.locator('[data-test="search-query"]').fill('Pliers');
    await page.locator('[data-test="search-query"]').press('Enter');
    await page.locator('[data-test="search-submit"]').click();

    await page.locator('h5.card-title:has-text("Combination Pliers")').click();
    const product = new ProductPage(page);
    await product.AddToCart();
    await page.locator('[data-test="nav-cart"]').click();

    await page.goto('https://practicesoftwaretesting.com/checkout');
    await expect(page.locator('[data-test="product-title"]')).toBeVisible;
});

