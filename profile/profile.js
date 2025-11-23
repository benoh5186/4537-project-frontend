import { UserInterfaceString } from "../lang/en/en.js";


const emailInfo = document.getElementById("email-info")

const profileInfo = document.getElementById("profile-info")
const accountInfo = document.getElementById("account-info")
const emailLabel = document.getElementById("email-label")

const passwordLabel = document.getElementById("password-label")
const passwordInfo = document.getElementById("password-info")

const newEmailLabel = document.getElementById("new-email-label")
const newPasswordLabel = document.getElementById("new-password-label")

function userStringHandler() {
    profileInfo.textContent = UserInterfaceString.PROFILE_INFO
    accountInfo.textContent = UserInterfaceString.ACCOUNT_INFO
    emailLabel.textContent = UserInterfaceString.EMAIL_PLACEHOLDER
    passwordLabel.textContent = UserInterfaceString.PASSWORD_PLACEHOLDER
    passwordInfo.textContent = UserInterfaceString.PASSWORD_INFO
    newEmailLabel.textContent = UserInterfaceString.NEW_EMAIL
    newPasswordLabel.textContent = UserInterfaceString.NEW_PASSWORD

    const cancelButtons = document.querySelectorAll(".cancel")
    cancelButtons.forEach(element => {
        element.textContent = UserInterfaceString.CANCEL_BUTTON
    });

    const saveButtons =  document.querySelectorAll(".save")
    saveButtons.forEach(element => {
        element.textContent = UserInterfaceString.SAVE_BUTTON
    });

    const changeButtons = document.querySelectorAll(".change")
    changeButtons.forEach(element => {
        element.textContent = UserInterfaceString.CHANGE_BUTTON
    });


}

document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch(UserInterfaceString.SESSION_DOMAIN, {
            credentials : "include"
        })
        if (response.ok) {
            userStringHandler()
            const data = await response.json()
            emailInfo.textContent = data["email"]
        } else {
            window.location.href = "../auth/signin.html"
        }
})