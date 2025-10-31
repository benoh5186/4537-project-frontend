import {LoginHandler} from "./auth_handler.js"
import { UserInterfaceString } from "../lang/en/en.js";

const signInForm = document.getElementById("sign-in-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const feedbackArea = document.getElementById("feedback-area")
const signInButton = document.getElementById("sign-in-button")

emailInput.placeholder = UserInterfaceString.EMAIL_PLACEHOLDER
passwordInput.placeholder = UserInterfaceString.PASSWORD_PLACEHOLDER
signInButton.textContent = UserInterfaceString.LOGIN_BUTTON

signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const response = await LoginHandler.makeRequest(UserInterfaceString.LOGIN_DOMAIN, 
        {"email" : emailInput.value, "password" : passwordInput.value})
    await LoginHandler.handleResponse(response, feedbackArea)
})
