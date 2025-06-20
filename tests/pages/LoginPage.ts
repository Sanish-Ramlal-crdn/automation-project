//POM login class
import { expect } from '@playwright/test';
export class LoginPage {
    private page;
    private email_textbox;
    private password_textbox;
    private login_button;


    constructor(page) {
        this.page = page;
        this.email_textbox = page.locator('#email');
        this.password_textbox = page.locator('#password');
        this.login_button = page.locator('input[value="Login"]');
    }

    async EnterEmail(email: string) {
        await this.email_textbox.fill(email);
    }

    async EnterPassword(password: string) {
        await this.password_textbox.fill(password);
    }

    async VerifyLoginError(){
        await expect(this.page.locator('[data-test="login-error"]')).toBeVisible
    }

    async Login() {
        await this.login_button.click()
    }

    async GoToRegistration() {
        await this.page.locator('[data-test="register-link"]').click();
    }

    async CheckErrorMessage() {
        await this.page.waitForTimeout(2000);
        return await this.page.locator('[data-test="login-error"]').isVisible();
    }
}