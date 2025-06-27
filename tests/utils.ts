import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import user from "./fixtures/user.json";
import checkout_details from "./fixtures/checkout.json";

export async function LoginUser(login: LoginPage) {
  await login.EnterEmail(user.email);
  await login.EnterPassword(user.correct_password);
  await login.Login();
}

export async function RegisterUser(
  page,
  register: RegisterPage,
  login: LoginPage
) {
  await register.EnterFirstName(user.first_name);
  await register.EnterLastName(user.last_name);
  await register.EnterDOB(user.dob);
  await register.EnterStreet(user.street);
  await register.EnterPostalCode(user.postal_code);
  await register.EnterCity(user.city);
  await register.EnterState(user.state);
  await register.SelectCountry(user.country);
  await register.EnterPhone(user.phone);
  await register.EnterEmail(user.email);
  await register.EnterPassword(user.correct_password);
  await register.Register();
  await page.waitForTimeout(2000);
  await login.EnterEmail(user.email);
  await login.EnterPassword(user.correct_password);
  await login.Login();
}

export async function MakeValidPayment(checkout) {
  await checkout.SelectPayment(checkout_details.type);
  await checkout.EnterBankName(checkout_details.bank_name);
  await checkout.EnterAccountName(checkout_details.account_name);
  await checkout.EnterAccountNumber(checkout_details.valid_account_number);
  await checkout.ConfirmOrder();
}
