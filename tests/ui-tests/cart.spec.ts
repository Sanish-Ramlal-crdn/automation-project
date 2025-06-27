import { test } from "@playwright/test";
import { ProductPage } from "../pages/ProductPage.ts";
import { CartPage } from "../pages/CartPage.ts";
import products from "../fixtures/products.json";
import urls from "../fixtures/urls.json";

//Testing for how 1 product is added to the cart
test("select item", async ({ page }) => {
  //Test for clicking an item and adding it to the cart
  let first_product;
  first_product = products.find((product) => product.id === "1");
  await page.goto(urls.base_url);
  const product = new ProductPage(page);
  await product.SelectItem(first_product.name);
  await product.AddToCart();
  await product.OpenCart();
  const cart = new CartPage(page);
  //Checking if the item has been added to the cart;
  await cart.VerifyItemInCart(first_product.name);
  console.log("Item added successfully! - Test Passed");
});
