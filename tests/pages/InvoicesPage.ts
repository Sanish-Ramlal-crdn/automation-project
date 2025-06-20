import { expect } from '@playwright/test';
export class InvoicesPage {
    private page;

    constructor(page) {
        this.page = page;
    }

    async OpenInvoice(invoice_no: string, address: string) {
        const invoice_row = await this.page.getByRole('row', { name: `${invoice_no} ${address}` }).getByRole('link');
        invoice_row.click();
    }

    async VerifyTotal(expected_total: string) {
        const total_cost = await this.page.locator('[data-test="total"]').inputValue();
        expect(total_cost).toBe(expected_total);
    }
}