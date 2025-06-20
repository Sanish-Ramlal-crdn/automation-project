//POM Product class
export class ProductPage {
    private page;
    private add_button

    constructor(page) {
        this.page = page;
        this.add_button = page.locator('[data-test="add-to-cart"]');
    }

    async SelectItem(item: string) {
        const item_card=await this.page.locator(`h5.card-title:has-text("${item}")`)
        item_card.click();
    }

    async AddToCart() {
        await this.add_button.click()
        const alert=await this.page.getByRole('alert', { name: 'Product added to shopping' })
        await alert.click();
    }

    async OpenCart() {
        await this.page.locator('[data-test="nav-cart"]').click();
    }

    async BackToHome(){
        await this.page.getByRole('link', { name: 'Practice Software Testing -' }).click();
    }

    async GoToPage(page_no: string){
        await this.page.locator(`a[aria-label="Page-${page_no}"]`).click();
    }
}