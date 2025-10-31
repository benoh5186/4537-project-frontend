import { UserInterfaceString } from "../lang/en/en.js"


class AuthHandler {
    static async makeRequest(url, body) {
        const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(body)
    })
    return response
    }
    static async handleResponse(response, feedbackArea) {
        throw new Error("Must be implemented")
    }

    static handleValidationError(data, feedbackArea) {
        const issue = data.detail 
        if (!issue.email) {
            feedbackArea.textContent = UserInterfaceString.INCORRECT_EMAIL_FORMAT;
        } else if (!issue.password) {
            feedbackArea.textContent = UserInterfaceString.INCORRECT_PASSWORD_LENGTH;
        }
    }
}


class RegistrationHandler extends AuthHandler{

    static async handleResponse(response, feedbackArea) {
        if(response.ok) {
            window.location.href = "../auth/signin.html"
        } else {
            const data = await response.json();
            const status = response.status
            console.log(data)
            if (status === 409) {
                feedbackArea.textContent = UserInterfaceString.USER_ALREADY_EXISTS;

            } else if (status === 422) {
                this.handleValidationError(data, feedbackArea)
                }
            }
    }
}


class LoginHandler extends AuthHandler{
    static async handleResponse(response, feedbackArea) {
        if(response.ok) {
            window.location.href = "../service/landing_page.html"
        } 
        else {
            const data = await response.json();
            const status = response.status
            console.log(data)
            if (status === 400) {
                feedbackArea.textContent = UserInterfaceString.INCORRECT_PASSWORD;

            } else if(status === 401) {
                feedbackArea.textContent = UserInterfaceString.USER_NOT_FOUND
            } else if (status === 422) {
                this.handleValidationError(data, feedbackArea)
            }
        }
    }
}

export{LoginHandler, RegistrationHandler}