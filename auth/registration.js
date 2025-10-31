import { RegistrationHandler } from "./auth_handler.js";

const registrationForm = document.getElementById("registration-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const feedbackArea = document.getElementById("feedback-area")

registrationForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const response = await RegistrationHandler.makeRequest("http://localhost:8000/api/auth/signup",
        {"email" : emailInput.value, "password" : passwordInput.value, "is_admin" : false})
    await RegistrationHandler.handleResponse(response, feedbackArea)
})
