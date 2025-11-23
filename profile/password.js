import { UserInterfaceString } from "../lang/en/en.js";

const passwordButton = document.getElementById("password-button")

const savePassword = document.getElementById("save-password");
const closePassword = document.getElementById("close-password");
const passwordInput = document.getElementById("new-password")

const overlay = document.getElementById("overlay")
const passwordModal = document.getElementById("password-modal")
const successFeedback = document.getElementById("overall-feedback")

const feedback = document.getElementById("password-feedback")


savePassword.onclick = async () => {
    const passwordValue = passwordInput.value
    const response = await fetch(UserInterfaceString.CHANGE_PASSWORD_DOMAIN, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json"
        },
        credentials: "include",
        body : JSON.stringify({"password" : passwordValue})
    })
    if (response.ok) {
        overlay.style.display = "none";
        passwordModal.style.display = "none";
        successFeedback.textContent = UserInterfaceString.PASSWORD_CHANGED_FEEDBACK


    } else {
        const status = response.status
        if (status == 422) {
            feedback.textContent = UserInterfaceString.INCORRECT_PASSWORD_LENGTH
        } else if(status == 409) {
            feedback.textContent = UserInterfaceString.SAME_PASSWORD_FEEDBACK
        }
        else {
            feedback.textContent = UserInterfaceString.SESSION_EXPIRED
        }
    }
}


closePassword.onclick = () => {
    overlay.style.display = "none";
    passwordModal.style.display = "none";
}


passwordButton.onclick = () => {
    passwordModal.style.display = "block";
    overlay.style.display = "block"
    feedback.textContent = "";
    passwordInput.value = "";
    successFeedback.textContent = "";
}