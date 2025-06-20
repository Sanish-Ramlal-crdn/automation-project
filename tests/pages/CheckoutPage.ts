import { expect } from '@playwright/test';
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

    async SelectPayment(choice: string){
        const payment_method=await this.page.locator('[data-test="payment-method"]')
        await payment_method.selectOption(`${choice}`);
    }

    async EnterBankName(bank_name: string){
        await this.bank_name.fill(bank_name);
    }

    async EnterAccountName(account_name: string){
        await this.account_name.fill(account_name);
    }

    async EnterAccountNumber(account_number: string){
        await this.account_number.fill(account_number);
    }

    async ConfirmOrder() {
        let i=0;
        while (await this.page.locator('[data-test="finish"]').isVisible() && i<4) {  //Sometimes the button disappears with 2 clicks, while other times it takes 3
            await this.page.locator('[data-test="finish"]').click();
            await this.page.waitForTimeout(1000); // Wait for 1 second 
            i++;
        }
    }

    async CheckError(){
        expect(this.page.locator('[class="alert alert-danger ng-star-inserted]')).toBeVisible;
    }

    async GetInvoice(){
        await this.page.waitForSelector('div#order-confirmation span');
        return await this.page.$eval('div#order-confirmation span', element => element.textContent);
    }

    async CheckInvoices(){
            await this.page.locator('[data-test="nav-menu"]').click();
    await this.page.locator('[data-test="nav-my-invoices"]').click();
    }
}