import { RegistrationHandler } from "./auth_handler.js";
import { UserInterfaceString } from "../lang/en/en.js";

const registrationForm = document.getElementById("registration-form");
const emailInput = document.getElementById("email");
const emailLabel = document.getElementById("email-label");
const passwordLabel = document.getElementById("password-label");
const passwordInput = document.getElementById("password");
const feedbackArea = document.getElementById("feedback-area")
const signUpButton = document.getElementById("sign-up-button")
const header = document.getElementById("auth-header")

header.textContent = UserInterfaceString.REGISTRATION_HEADER
emailLabel.textContent = UserInterfaceString.EMAIL_PLACEHOLDER
passwordLabel.textContent = UserInterfaceString.PASSWORD_PLACEHOLDER
signUpButton.textContent = UserInterfaceString.SIGN_UP_BUTTON

registrationForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const response = await RegistrationHandler.makeRequest(UserInterfaceString.REGISTRATION_DOMAIN,
        {"email" : emailInput.value, "password" : passwordInput.value, "is_admin" : false})
    await RegistrationHandler.handleResponse(response, feedbackArea)
})

document.addEventListener("DOMContentLoaded", async () => {
    await RegistrationHandler.handleSession(UserInterfaceString.SESSION_DOMAIN)
})
