import { UserInterfaceString } from "../lang/en/en.js";


const emailInfo = document.getElementById("email-info")


document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch(UserInterfaceString.SESSION_DOMAIN, {
            credentials : "include"
        })
        if (response.ok) {
            const data = await response.json()
            emailInfo.textContent = data["email"]
        } else {
            window.location.href = "../auth/signin.html"
        }
})