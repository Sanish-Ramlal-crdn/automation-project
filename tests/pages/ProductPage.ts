//POM Product class
export class ProductPage {
    private page;
    private add_button

    constructor(page) {
        this.page = page;
        this.add_button = page.locator('[data-test="add-to-cart"]');
    }

    async SelectItem(item: string) {
        await this.page.locator(`h5.card-title:has-text("${item}")`).click();
    }

    async AddToCart() {
        await this.add_button.click()
        await this.page.getByRole('alert', { name: 'Product added to shopping' }).click();
    }

    async OpenCart() {
        await this.page.locator('[data-test="nav-cart"]').click();
    }
}