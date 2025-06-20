export class RegisterPage {
    private page;
    private first_name;
    private last_name;
    private dob;
    private postal_code;
    private street;
    private city;
    private state;
    private country;
    private phone;
    private email;
    private password;

    constructor(page) {
        this.page = page;
        this.first_name = page.locator('[data-test="first-name"]');
        this.last_name = page.locator('[data-test="last-name"]');
        this.dob = page.locator('[data-test="dob"]');
        this.street = page.locator('[data-test="street"]');
        this.postal_code = page.locator('[data-test="postal_code"]');
        this.city = page.locator('[data-test="city"]');
        this.state = page.locator('[data-test="state"]');
        this.country = page.locator('[data-test="country"]');
        this.phone = page.locator('[data-test="phone"]');
        this.email = page.locator('[data-test="email"]');
        this.password = page.locator('[data-test="password"]');
    }

    async EnterFirstName(first_name: string) {
        await this.first_name.fill(first_name);
    }

    async EnterLastName(last_name: string) {
        await this.last_name.fill(last_name);
    }

    async EnterDOB(dob: string) {
        await this.dob.fill(dob);
    }

    async EnterStreet(street: string) {
        await this.street.fill(street);
    }

    async EnterPostalCode(postal_code: string) {
        await this.postal_code.fill(postal_code);
    }

    async EnterCity(city: string) {
        await this.city.fill(city);
    }

    async EnterState(state: string) {
        await this.state.fill(state);
    }

    async SelectCountry(country: string) {
        await this.country.selectOption(country);
    }

    async EnterPhone(phone: string) {
        await this.phone.fill(phone);
    }

    async EnterEmail(email: string) {
        await this.email.fill(email);
    }

    async EnterPassword(password: string) {
        await this.password.fill(password);
    }

    async Register(){
        await this.page.locator('[data-test="register-submit"]').click();
    }

}