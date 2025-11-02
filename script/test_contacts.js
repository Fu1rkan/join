const BASE_URL = "https://testjoin-36a23-default-rtdb.europe-west1.firebasedatabase.app/user/";

let contacts = [];
let taskList = [];

async function getUsers(email, password) {
  let response = await fetch(BASE_URL + ".json");
  let responseToJson = await response.json();
  let users = Object.values(responseToJson);
  let currentUserIndex = users.findIndex(u => u.email === email && u.password === password);
  checkLoginValues(currentUserIndex);
  let keys = Object.keys(responseToJson);
  let userPath = keys[currentUserIndex];
  let userId = userPath + "/";
  localStorage.setItem("userId", JSON.stringify(userId));
  if (users[currentUserIndex].email === email && users[currentUserIndex].password === password) {
    openSummary();
  }
}

function checkLoginValues(currentUserIndex) {
  if (currentUserIndex === -1) {
    document.getElementById('required_password').innerHTML = `<p id="password_invalid_field" class="required-field-text">LogIn failed. Please check your email and password.</p>`;
    document.getElementById('password_input_id').classList.add('required-outline');
  } else {
    document.getElementById('required_password').innerHTML = '';
    document.getElementById('password_input_id').classList.remove('required-outline');
  }
}

async function loadContacts() {
  let path = localStorage.getItem("userId");
  let userId = JSON.parse(path);
  let contactsPath = userId + "contacts/";
  let response = await fetch(BASE_URL + contactsPath + ".json");
  let responseToJson = await response.json();
  pushUserContactsToArray(responseToJson);
}

function pushUserContactsToArray(responseToJson) {
  contacts = [];
  for (let index = 0; index < responseToJson.length; index++) {
    contacts.push(responseToJson[index]);
  }
}

//Tasks
async function loadTasks() {
  let path = localStorage.getItem("userId");
  let userId = JSON.parse(path);
  let tasksPath = userId + "tasks/";
  let response = await fetch(BASE_URL + tasksPath + ".json");
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
  }
}

// put tasks to database
async function putTask(data = {}) {
  let tasksPath = getUserIdAndPathForTasks();
  if (taskList.length > 0) {
    await putTasksInFirebase(data, tasksPath);
  } else {
    await putPlaceholderInFirebase(tasksPath);
  }
}

function getUserIdAndPathForTasks() {
  let path = localStorage.getItem("userId");
  let userId = JSON.parse(path);
  return userId + "tasks/";
}

async function putTasksInFirebase(data, tasksPath) {
  let response = await fetch(BASE_URL + tasksPath + ".json", {
    method: "PUT",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return (responseToJson = await response.json());
}

async function putPlaceholderInFirebase(tasksPath) {
  let data = {
      "placeholder": "placeholder"
    }
    let response = await fetch(BASE_URL + tasksPath + ".json", {
      method: "PUT",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return (responseToJson = await response.json());
}

async function putContacts(data = {}) {
  let contactsPath = getUserIdAndPathForContacts();
  if (contacts.length > 0) {
    await putContactsInFirebase(data, contactsPath);
  } else {
    await putPlaceholderInFirebase(contactsPath);
  }
}

function getUserIdAndPathForContacts() {
  let path = localStorage.getItem("userId");
  let userId = JSON.parse(path);
  return userId + "contacts/";
}

async function putContactsInFirebase(data, contactsPath) {
  let response = await fetch(BASE_URL + contactsPath + ".json", {
    method: "PUT",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return (responseToJson = await response.json());
}

async function putPlaceholderInFirebase(contactsPath) {
  let data = {
    "placeholder": "placeholder"
  }
  let response = await fetch(BASE_URL + contactsPath + ".json", {
    method: "PUT",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return (responseToJson = await response.json());
}

// add new user 
async function addNewUser(username, email, password) {
  let user = {
    "username": username,
    "email": email,
    "password": password,
    "tasklist": { "placeholder": "placeholder" },
    "contactlist": { "placeholder": "placeholder" }
  };

  let response = await fetch(BASE_URL + ".json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  return (responseToJson = await response.json());
}

