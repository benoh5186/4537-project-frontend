import {UserInterfaceString} from "../lang/en/en.js"

const userTable = document.querySelector(".user-table");

document.addEventListener("DOMContentLoaded", async () => {
    const sessionRes = await fetch(UserInterfaceString.SESSION_DOMAIN, {
        credentials : "include"
    })
    if (sessionRes.ok) {
        const data = await sessionRes.json()
        if (!data["is_admin"]) {
            window.location.href = "../service/landing_page.html"
        } else {
          await fetchUsersAndMakeTable()
        }

    } else {
        window.location.href = "../auth/signin.html"
    }
})

async function fetchUsersAndMakeTable() {
  const usersRes = await fetch(UserInterfaceString.USERS_DOMAIN, {
    method: "GET",
    credentials: "include",
  })  

  if(usersRes.status === 403) {
    window.location.href = "../service/landing_page.html"
    return
  }

  if(usersRes.status === 401) {
    window.location.href = "../auth/signin.html"
    return 
  }

  if (!usersRes.ok) {
    userTable.textContent = "Failed to load users.";
    return;
}

  const users = await usersRes.json()

  renderUsersTable(users)
}

function renderUsersTable(users) {
  userTable.innerHTML = ""
  if (!users.length) {
        userTable.textContent = "No users found.";
        return;
  }

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const headers = ["ID", "Email", "API Usage", " "];
  headers.forEach((text) => {
      const th = document.createElement("th");
      th.textContent = text;
      headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  users.forEach((user) => {
      const tr = document.createElement("tr");

      const idTd = document.createElement("td");
      idTd.textContent = user.uid;

      const emailTd = document.createElement("td");
      emailTd.textContent = user.email;

      const usageTd = document.createElement("td");
      usageTd.textContent = user.api_usage;

      const deleteTd = document.createElement("td");
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete user";
      deleteBtn.addEventListener("click", () => {
          handleDeleteClick(user.uid);
      });
      deleteTd.appendChild(deleteBtn);

      tr.appendChild(idTd);
      tr.appendChild(emailTd);
      tr.appendChild(usageTd);
      tr.appendChild(deleteTd)

      tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  userTable.appendChild(table);

}

async function handleDeleteClick(uid) {
  const url = UserInterfaceString.DELETE_USER_DOMAIN.replace("{uid}", uid);
  const response = await fetch(url, {
    method: "DELETE",
    credentials: "include",
  })

  if (response.status === 401) {
      window.location.href = "../auth/signin.html";
      return;
  }

  if (response.status === 403) {
    window.location.href = "../service/landing_page.html";
    return;
  }

  await fetchUsersAndMakeTable()
}