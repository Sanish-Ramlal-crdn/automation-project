export class CheckoutPage{
    private page;
    private bank_name;
    private account_name;
    private account_number;

    constructor(page){
        this.page = page;
        this.bank_name = page.locator('#bank_name');
        this.account_name = page.locator('#account_name');
        this.account_number = page.locator('#account_number');
    }

    async CompleteOrder(bank_name: string, account_name: string, account_number: string){
        await this.bank_name.fill(bank_name);
        await this.account_name.fill(account_name);
        await this.account_number.fill(account_number);
    }

    async ConfirmOrder() {
        while (await this.page.locator('[data-test="finish"]').isVisible()) {  //Sometimes the button disappears with 2 clicks, while other times it takes more
            await this.page.locator('[data-test="finish"]').click();
            await this.page.waitForTimeout(1000); // Wait for 1 second 
        }
    }
}