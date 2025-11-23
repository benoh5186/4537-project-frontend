import {LoginHandler} from "./auth_handler.js"
import { UserInterfaceString } from "../lang/en/en.js";

const signInForm = document.getElementById("sign-in-form");
const emailInput = document.getElementById("email");
const emailLabel = document.getElementById("email-label");
const passwordLabel = document.getElementById("password-label")
const passwordInput = document.getElementById("password");
const feedbackArea = document.getElementById("feedback-area")
const signInButton = document.getElementById("sign-in-button")
const header = document.getElementById("auth-header")
const registration = document.getElementById("registration")
const createAccountText = document.getElementById("create-account")

header.textContent = UserInterfaceString.LOGIN_HEADER
emailLabel.textContent = UserInterfaceString.EMAIL_PLACEHOLDER
passwordLabel.textContent = UserInterfaceString.PASSWORD_PLACEHOLDER
signInButton.textContent = UserInterfaceString.LOGIN_BUTTON
registration.textContent = UserInterfaceString.CREATE_ACCOUNT_LINK_TEXT
createAccountText.textContent = UserInterfaceString.CREATE_ACCOUNT_TEXT

signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const response = await LoginHandler.makeRequest(UserInterfaceString.LOGIN_DOMAIN, 
        {"email" : emailInput.value, "password" : passwordInput.value})
    await LoginHandler.handleResponse(response, feedbackArea)
})

registration.addEventListener("click", () => {
  window.location.href = "./registration.html";
});

document.addEventListener("DOMContentLoaded", async () => {
    await LoginHandler.authenticate(UserInterfaceString.SESSION_DOMAIN)
})
