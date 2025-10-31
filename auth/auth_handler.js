import { UserInterfaceString } from "../lang/en/en.js"

/**
 * Authentication handler module for managing session, user registration and login requests.
 * 
 * This module provides handler classes for making authentication requests,
 * processing responses, and managing user sessions.
 */


class AuthHandler {
    /**
     * Make an HTTP POST request to the specified URL with the provided body.
     * 
     * @param {string} url - The endpoint URL to send the request to
     * @param {Object} body - The request body data to be sent as JSON
     * @returns {Promise<Response>} A promise that resolves to the fetch response object
     */
    static async makeRequest(url, body) {
        const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(body),
        credentials: "include"
    })
    return response
    }
     /**
     * Handle the HTTP response from an authentication request.
     * 
     * @param {Response} response - The fetch response object to process
     * @param {HTMLElement} feedbackArea - The DOM element to display feedback messages
     * @throws {Error} Must be implemented by subclasses
     */
    static async handleResponse(response, feedbackArea) {
        throw new Error("Must be implemented")
    }

    /**
     * Handle validation errors by displaying appropriate error messages.
     * 
     * @param {Object} data - The error data containing validation details
     * @param {HTMLElement} feedbackArea - The DOM element to display error messages
     */
    static handleValidationError(data, feedbackArea) {
        const issue = data.detail 
        if (!issue.email) {
            feedbackArea.textContent = UserInterfaceString.INCORRECT_EMAIL_FORMAT;
        } else if (!issue.password) {
            feedbackArea.textContent = UserInterfaceString.INCORRECT_PASSWORD_LENGTH;
        }
    }

    
    /**
     * Check if a user session exists and redirect to the landing page if authenticated.
     * 
     * @param {string} url - The session validation endpoint URL
     */
    static async handleSession(url) {
        const response = await fetch(url, {
            credentials : "include"
        })
        if (response.ok) {
            window.location.href = "../service/landing_page.html"
        } 
    }
}


class RegistrationHandler extends AuthHandler{
    /**
     * Handle the response from a user registration request.
     * 
     * @param {Response} response - The fetch response object from the registration request
     * @param {HTMLElement} feedbackArea - The DOM element to display feedback messages
     */

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
    /**
     * Handle the response from a user login request.
     * 
     * @param {Response} response - The fetch response object from the login request
     * @param {HTMLElement} feedbackArea - The DOM element to display feedback messages
     */
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


export{AuthHandler, LoginHandler, RegistrationHandler}