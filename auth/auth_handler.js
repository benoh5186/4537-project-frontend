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
            feedbackArea.textContent = "incorrect email format"
        } else if (!issue.password) {
            feedbackArea.textContent = "password must be at least 8 length long"
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
                feedbackArea.textContent = "User already exists with that email"

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
                feedbackArea.textContent = "Incorrect Password"

            } else if(status === 401) {
                feedbackArea.textContent = "No user exists with that email"
            } else if (status === 422) {
                this.handleValidationError(data, feedbackArea)
            }
        }
    }
}

export{LoginHandler, RegistrationHandler}