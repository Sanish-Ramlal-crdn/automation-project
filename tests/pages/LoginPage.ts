//Page Object model demo class
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


    async GoToLoginPage(){
        await this.page.goto('https://practicesoftwaretesting.com/auth/login');
    }

    async Login(email: string, password: string){
        await this.email_textbox.fill(email)
        await this.password_textbox.fill(password)
        await this.login_button.click()
    }
}