import {LoginHandler} from "./auth_handler.js"

const signInForm = document.getElementById("sign-in-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const feedbackArea = document.getElementById("feedback-area")

signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const response = await LoginHandler.makeRequest("http://localhost:8000/api/auth/login", 
        {"email" : emailInput.value, "password" : passwordInput.value})
    await LoginHandler.handleResponse(response, feedbackArea)
})
