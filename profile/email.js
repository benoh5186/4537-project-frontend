import { UserInterfaceString } from "../lang/en/en.js";

const emailButton = document.getElementById("email-button")

const saveEmail = document.getElementById("save-email")
const closeEmail = document.getElementById("close-email")
const emailInput = document.getElementById("new-email")

const overlay = document.getElementById("overlay")
const emailModal = document.getElementById("email-modal")
const successFeedback = document.getElementById("overall-feedback")

const feedback = document.getElementById("email-feedback")

const emailInfo = document.getElementById("email-info")


saveEmail.onclick = async () => {
    const emailValue = emailInput.value.trim()
    const response = await fetch(UserInterfaceString.CHANGE_EMAIL_DOMAIN,{
        method: "PATCH",
        headers: {
           "Content-Type" :"application/json"},
        credentials: "include",
        body: JSON.stringify({"email" : emailValue})
    })
    if (response.ok) {
        const data = await response.json()
        overlay.style.display = "none";
        emailModal.style.display = "none";
        successFeedback.textContent = UserInterfaceString.EMAIL_CHANGED_FEEDBACK
        emailInfo.textContent = data["new_email"] 

    } else {
        const status = response.status
        const data = await response.json()
        if (status == 422) {
            feedback.textContent = UserInterfaceString.INCORRECT_EMAIL_FORMAT
        } else if(status == 409) {
            const detail = data["detail"]
            if (detail["same_email"]) {
                feedback.textContent = UserInterfaceString.SAME_EMAIL_FEEDBACK
            } else {
                feedback.textContent = UserInterfaceString.USER_ALREADY_EXISTS
            }
        }
        else {
            feedback.textContent = UserInterfaceString.SESSION_EXPIRED;
        }
    }
}
closeEmail.onclick = () => {
    overlay.style.display = "none";
    emailModal.style.display = "none";
}

emailButton.onclick = () => {
    emailModal.style.display = "block";
    overlay.style.display = "block";
    emailInput.textContent = "";
    feedback.textContent = "";
    successFeedback.textContent = "";

}
