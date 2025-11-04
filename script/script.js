const BASE_URL = "https://testjoin-36a23-default-rtdb.europe-west1.firebasedatabase.app/user/";

let contacts = [];
let taskList = [];

function stopPropagation(event) {
    event.stopPropagation();
}

// Toggle Burger Menu functionality
function toggleBurgerMenu() {
    let menu = document.getElementById('profile-menu');
    if (menu.classList.contains('show')) {
        menu.classList.remove('show');
        menu.classList.add('hide');
        setTimeout(() => {
            if (menu.classList.contains('hide')) {
                menu.classList.remove('hide');
            }
        }, 300);
    } else {
        menu.classList.add('show');
    }
}

function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function rederProfilHeaderIcon(id) {
    let userNameLetters = JSON.parse(localStorage.getItem("userName"));
    let profilIconRef = document.getElementById(id);
    profilIconRef.innerHTML = `<p>${userNameLetters}</p>`
}

async function getUsers(email, password) {
  let response = await fetch(BASE_URL + ".json");
  let responseToJson = await response.json();
  let users = Object.values(responseToJson);
  let currentUserIndex = users.findIndex(u => u.email === email && u.password === password);
  checkLoginValues(currentUserIndex);
  let keys = Object.keys(responseToJson);
  let userPath = keys[currentUserIndex];
  let userId = userPath + "/";
  let userResponse = await fetch(BASE_URL + userId + ".json");
  let userResponseToJson = await userResponse.json();
  let userName = userResponseToJson["userNameLetters"];

  localStorage.setItem("userName", JSON.stringify(userName));

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
  if (responseToJson != null) {
    for (let index = 0; index < responseToJson.length; index++) {
      contacts.push(responseToJson[index]);
    }
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
  if (responseToJson != null) {
    taskList = [];
    for (let index = 0; index < responseToJson.length; index++) {
      taskList.push(responseToJson[index]);
    }
  }
}

//username
async function loadUsername() {
  let path = localStorage.getItem("userId");
  let userId = JSON.parse(path);
  let tasksPath = userId + "username";
  let response = await fetch(BASE_URL + tasksPath + ".json");
  let responseToJson = await response.json();
  document.getElementById('username').innerHTML = responseToJson;
  let respGreeting = document.getElementById("summary-greeting-name");  
  if (respGreeting != null) {
    respGreeting.innerHTML = responseToJson;
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
  let capitalizedName = generatecapitalizedName(username);
  let userNameLetters = generateLetters(capitalizedName);
  let user = {
    "username": capitalizedName,
    "userNameLetters": userNameLetters,
    "email": email,
    "password": password,
    "tasks": { "placeholder": "placeholder" },
    "contacts": { "placeholder": "placeholder" }
  };

  let response = await fetch(BASE_URL + ".json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  return (responseToJson = await response.json());
}

function generatecapitalizedName(createName) {
  let nameArray = createName.split(" ");
  let capitalizedArray = nameArray.map((word) => {
    if (word != "") {
      let firstLetter = word.charAt(0).toUpperCase();
      let restName = word.slice(1);
      return firstLetter + restName;
    } else {
      return word;
    }
  });
  let resultFullName = capitalizedArray.join(" ");
  return resultFullName;
}

function generateLetters(capitolName) {
  let createtFullName = capitolName;
  let nameArray = createtFullName.split(" ");
  if (nameArray.length >= 2) {
    let firstNameLetter = nameArray[0];
    let lastNameletter = nameArray[nameArray.length - 1];
    let firstLetters = firstNameLetter.charAt(0).concat(lastNameletter.charAt(0));
    return firstLetters;
  } else {
    let singleLetter = nameArray[0].charAt(0);
    return singleLetter;
  }
}
