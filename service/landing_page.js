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

    if (textButton.classList.contains("active")) {
      const text = (input.value || "").trim()

      if (!text) {
      errorP.textContent = "Input cannot be empty."
      output.value = ""
      return;
      }
      await textToJson(text)

    } else if(schemaButton.classList.contains("active")) {
      let schema;
      const schemaText = (schemaTextInput.value || "").trim();
  
      try {
          schema = JSON.parse(schemaInput.value);
      } catch (err) {
          errorP.textContent = "Schema must be valid json.";
          output.value = "";
          return;
      }
  
      if (!schemaText) {
          errorP.textContent = "Text cannot be empty.";
          output.value = "";
          return;
      }
  
      await schemaToJson(schema, schemaText);
    }

})

async function textToJson(text) {
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

}

async function schemaToJson(schema, schemaText) {
  try {
    const res = await fetch(UserInterfaceString.AI_SERVICE_DOMAIN_SCHEMA, {
      method: "POST",
      headers: {

        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: "include"
      ,
      body: JSON.stringify({ text: schemaText,lang: "en", schema : schema })
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

}



clearBtn.addEventListener('click', () => {
    input.value = ""
    schemaTextInput.value = ""
    schemaInput.value = ""
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


const textButton = document.getElementById("toggle-text")
const schemaButton = document.getElementById("toggle-schema")
const schemaArea = document.getElementById("schema-section")
const schemaTextInput = document.getElementById("schemaText")
const schemaInput = document.getElementById("schema")
const textArea = document.getElementById("text-section")


textButton.onclick = () => {
  if (textButton.classList.contains("active")) {
    return
  } else {
    schemaButton.classList.remove("active")
    textButton.classList.add("active")
    textArea.style.display = "block"
    schemaArea.style.display = "none"

  }
}

schemaButton.onclick = () => {
  if (schemaButton.classList.contains("active")) {
    return
  } else {
    textButton.classList.remove("active")
    schemaButton.classList.add("active")
    textArea.style.display = "none"
    schemaArea.style.display = "block"

  }
}