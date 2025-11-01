let contacts = [];
let taskList = [];

const BASE_URL = "https://testjoin-36a23-default-rtdb.europe-west1.firebasedatabase.app/";

async function loadContacts() {
  let user = "user/";
  let userContacts = "contacts/";
  let response = await fetch(BASE_URL + user + userContacts + ".json");
  let responseToJson = await response.json();
  pushUserContactsToArray(responseToJson);
}

function pushUserContactsToArray(responseToJson) {
  contacts = [];
  for (let index = 0; index < responseToJson.length; index++) {
    contacts.push(responseToJson[index]);
  }
}

// load tasks from database
async function loadTasks() {
  let user = "user/";
  let userContacts = "tasks/";
  let response = await fetch(BASE_URL + user + userContacts + ".json");
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

// post tasks to database
async function postTask(path, data = {}) {    // "user/tasks/", testTasks
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

// put contacts to database
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