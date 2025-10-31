import { RegistrationHandler } from "./auth_handler.js";
import { UserInterfaceString } from "../lang/en/en.js";

const registrationForm = document.getElementById("registration-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const feedbackArea = document.getElementById("feedback-area")
const signUpButton = document.getElementById("sign-up-button")

emailInput.placeholder = UserInterfaceString.EMAIL_PLACEHOLDER;
passwordInput.placeholder = UserInterfaceString.PASSWORD_PLACEHOLDER;
signUpButton.textContent = UserInterfaceString.SIGN_UP_BUTTON

registrationForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const response = await RegistrationHandler.makeRequest(UserInterfaceString.REGISTRATION_DOMAIN,
        {"email" : emailInput.value, "password" : passwordInput.value, "is_admin" : false})
    await RegistrationHandler.handleResponse(response, feedbackArea)
})
