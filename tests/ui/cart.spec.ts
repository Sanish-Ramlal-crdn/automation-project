import { test, expect } from '@playwright/test';

//Testing for how a product is added to the cart
test('select item', async ({ page }) => {  //Test for clicking an item and adding it to the cart
    await page.goto('https://practicesoftwaretesting.com/');
    await page.locator('[data-test="product-01JY1B4JVPFFZJCRD5J5YQJY95"]').click();
    await page.locator('[data-test="add-to-cart"]').click();
    await page.locator('[data-test="nav-cart"]').click();

    //Checking if the item has been added to the cart
    await page.goto('https://practicesoftwaretesting.com/checkout');
    await expect(page.locator('[data-test="product-title"]')).toBeVisible;
});

test('search item', async ({ page }) => {  //Test for searching an item and adding it to the cart
    await page.goto('https://practicesoftwaretesting.com/');

    await page.locator('[data-test="search-query"]').click();
    await page.locator('[data-test="search-query"]').fill('Pliers');
    await page.locator('[data-test="search-query"]').press('Enter');
    await page.locator('[data-test="search-submit"]').click();

    await page.locator('[data-test="product-01JY1B4JVPFFZJCRD5J5YQJY95"]').click();
    await page.locator('[data-test="add-to-cart"]').click();
    await page.locator('[data-test="nav-cart"]').click();

    await page.goto('https://practicesoftwaretesting.com/checkout');
    await expect(page.locator('[data-test="product-title"]')).toBeVisible;

    await page.pause();
});

