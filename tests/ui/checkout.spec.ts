import { test, expect } from '@playwright/test';

//Testing for how 1 product is added to the cart
test('checkout', async ({ page }) => {  //Test for clicking an item and adding it to the cart
    await page.goto('https://practicesoftwaretesting.com/');
    await page.pause()
    await page.locator('[data-test="product-01JY1EJFT12MGM2MY389DJ4T9V"]').click();
    await page.locator('[data-test="nav-cart"]').click();

    //Checking if the item has been added to the cart;
    await expect(page.locator('[data-test="product-title"]')).toHaveText('Combination Pliers');
});