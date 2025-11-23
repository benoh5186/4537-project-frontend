import {UserInterfaceString} from "../lang/en/en.js"

const form = document.getElementById('io-form');
const input = document.getElementById('inputText');
const output = document.getElementById('outputJson');
const clearBtn = document.getElementById('clearBtn');
const errorP = document.getElementById("errorMsg");
const apiUsage = document.getElementById("apiUsage");
const profileButton = document.getElementById("profile-button")

profileButton.textContent = UserInterfaceString.PROFILE_BUTTON
profileButton.onclick = () => {
  window.location.href = "../profile/profile.html"
}

const apiUsageCap = 20;

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const text = (input.value || "").trim()

    if (!text) {
    errorP.textContent = "Input cannot be empty."
    output.value = ""
    return;
    }

    try {
      const res = await fetch(UserInterfaceString.AI_SERVICE_DOMAIN_TEXT, {
        method: "POST",
        headers: {

          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: "include"
        ,
        body: JSON.stringify({ text, lang: "en" })
      });

      const isJson = res.headers.get("content-type")?.includes("application/json");
      const payload = isJson ? await res.json() : null;

      if (!res.ok) {
        errorP.textContent = `Request failed`;
        output.value = "";
        return;
      }

      output.value = JSON.stringify(payload["data"]);
      apiUsage.textContent = JSON.stringify(payload["api_usage"])
    } catch (err) {
      errorP.textContent = `Network error: ${String(err)}`;
      output.value = "";
    }
})

clearBtn.addEventListener('click', () => {
    input.value = ""
    output.value = ""
    input.focus()
})

document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch(UserInterfaceString.SESSION_DOMAIN, {
        credentials : "include"
    })
    if (response.ok) {
        const data = await response.json()
        if (data["is_admin"]) {
            window.location.href = "../service/admin.html"
        }
        const usage = data["api_usage"]

        apiUsage.textContent = usage < apiUsageCap ? usage : "Warning: Exceeded default usage"
    } else {
        window.location.href = "../auth/signin.html"
    }
})