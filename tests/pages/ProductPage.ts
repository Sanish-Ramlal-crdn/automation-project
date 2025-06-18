//Page Object model demo class
export class ProductPage {
    private page;
    private add_button

    constructor(page) {
        this.page = page;
        this.add_button = page.locator('[data-test="add-to-cart"]');
    }

    async AddToCart(){
        await this.add_button.click()
    }
}