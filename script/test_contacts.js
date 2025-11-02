const BASE_URL = "https://testjoin-36a23-default-rtdb.europe-west1.firebasedatabase.app/user/";

let contacts = [];
let taskList = [];

async function getUsers(email, password) {
  let response = await fetch(BASE_URL + ".json");
  let responseToJson = await response.json();
  let users = Object.values(responseToJson);
  let currentUserIndex = users.findIndex(u => u.email === email && u.password === password);

  if (currentUserIndex === -1) {
    document.getElementById('required_password').innerHTML = `<p id="password_invalid_field" class="required-field-text">LogIn failed. Please check your email and password.</p>`;
    document.getElementById('password_input_id').classList.add('required-outline');
  } else {
    document.getElementById('required_password').innerHTML = '';
    document.getElementById('password_input_id').classList.remove('required-outline');
  }
  let keys = Object.keys(responseToJson);

  let userPath = keys[currentUserIndex];
  await loadContacts(userPath);
  await loadTasks(userPath);
}

async function loadContacts(userPath) {
  let currentUserPath = userPath + "/";

  let currentUrl = BASE_URL + currentUserPath;
  console.log(currentUrl);


  let userContacts = "contacts/";
  let response = await fetch(BASE_URL + currentUserPath + userContacts + ".json");
  let responseToJson = await response.json();
  // console.log(responseToJson);
  pushUserContactsToArray(responseToJson);
}

function pushUserContactsToArray(responseToJson) {
  contacts = [];
  for (let index = 0; index < responseToJson.length; index++) {
    contacts.push(responseToJson[index]);
  }
  localStorage.setItem("contacts", JSON.stringify(contacts));
  console.log(contacts);
}

//Tasks

async function loadTasks(userPath) {
  let currentUserPath = userPath + "/";
  let userContacts = "tasks/";
  let response = await fetch(BASE_URL + currentUserPath + userContacts + ".json");
  let responseToJson = await response.json();
  pushUserTaskToArray(responseToJson);
}

// push tasks to array
function pushUserTaskToArray(responseToJson) {
  if (responseToJson.length > 0) {
    taskList = [];
    for (let index = 0; index < responseToJson.length; index++) {
      taskList.push(responseToJson[index]);
    }
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }
}

// post tasks to database
async function postTask(path, data = {}) {    
  if (taskList.length > 0) {
    let response = await fetch(BASE_URL + path + ".json", {
      method: "PUT",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return (responseToJson = await response.json());
  } else {
    let data = {
      "placeholder": "placeholder"
    }
    let response = await fetch(BASE_URL + path + ".json", {
      method: "PUT",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return (responseToJson = await response.json());
  }

}

async function putCurrentContacts(path, data = {}) {
  if (contacts.length > 0) {
    let response = await fetch(BASE_URL + path + ".json", {
      method: "PUT",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return (responseToJson = await response.json());
  } else {
    let data = {
      "placeholder": "placeholder"
    }
    let response = await fetch(BASE_URL + path + ".json", {
      method: "PUT",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return (responseToJson = await response.json());
  }
}

// add new user 
async function addNewUser(username, email, password) {
  let user = {
    "username": username,
    "email": email,
    "password": password,
    "tasklist": [],
    "contactlist": []
  };

  let response = await fetch(BASE_URL + "user.json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  return (responseToJson = await response.json());
}

// // Load all users
// async function loadAllUsers() {
//   try {
//     let response = await fetch(BASE_URL + "user.json");
//     let allUsers = await response.json();
//     return allUsers;
//   } catch (error) {
//     console.error("Error loading users:", error);
//     return null;
//   }
// }

// // Find user by email
// async function findUserByEmail(email) {
//   let allUsers = await loadAllUsers();

//   for (let userId in allUsers) {
//     if (allUsers[userId].email === email) {
//       return {
//         userId: userId,
//         user: allUsers[userId]
//       };
//     }
//     console.log(allUsers[userId].email);
//   }
// }

// console.log(findUserByEmail());
