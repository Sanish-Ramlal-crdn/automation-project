//POM for the cart page
import { expect } from '@playwright/test';
export class CartPage{
    private page;

    constructor(page){
        this.page=page;
    }
    
    async GoToLogin(){
        await this.page.locator('[data-test="proceed-1"]').click();
    }

    async GoToBilling(){
        await this.page.locator('[data-test="proceed-2"]').click();
    }

    async GoToCheckout(){
        await this.page.locator('[data-test="proceed-3"]').click();
    }

    async VerifyItemInCart(item: string) {
        await expect(this.page.locator('[data-test="product-title"]')).toHaveText(item);
    }
}