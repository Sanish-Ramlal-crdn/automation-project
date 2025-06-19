//POM login class
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


    async Login() {
        await this.login_button.click()
    }
}