const BASE_URL = "https://testjoin-36a23-default-rtdb.europe-west1.firebasedatabase.app/user/";

async function getUsers() {
  let response = await fetch(BASE_URL + ".json");
  let responseToJson = await response.json();
  // console.log(responseToJson);

  // Objekt -> Array konvertieren
  let users = Object.values(responseToJson);
  // console.log(users);

  let email = "csinner31@gmail.com";
  let password = "123456";

  let currentUserIndex = users.findIndex(u => u.email === email && u.password === password);
  // console.log(currentUserIndex);

  let keys = Object.keys(responseToJson);

  let userPath = keys[currentUserIndex];
  console.log(userPath);
  await loadContacts(userPath);
  await loadTasks(userPath);
}

let contacts = [];
let taskList = [];

async function loadContacts(userPath) {
  let currentUserPath = userPath + "/";
  console.log(currentUserPath);

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
  }
}




//Kopie von Svens Code zum Task erstellen

// function checkNPost(formId, dateId) {
//   let title = document.getElementById("title");
//   let description = document.getElementById("description").value;
//   let dueDate = document.getElementById(dateId);
//   let priority = document.getElementById("priority").value;
//   let category = document.getElementById("category_input");

//   if (title.value.length < 1 || dueDate.value.length < 1 || category.value.length < 1) {
//     requiredNotice(title, "title");
//     requiredNotice(dueDate, "due_date");
//     requiredNotice(category, "category");

//   } else {
//     postTask("", {
//     "name": title.value,
//     "description": description,
//     "date": dueDate.value,
//     "priority": priority,
//     "assigned_to": "placeholder",
//     "category": category.value,
//     "subtask": ["text1", "text2", "text3"],
//       /* add the other inputs */

//     let newestTask = {
//       "id" : taskList.length,
//       "name": title.value,
//       "description": description,
//       "date": dueDate.value,
//       "priority": priority,
//       "participants": false,
//       "type": category.value,
//       "category": "to-do",
//       "subtasks": false,
//     }

//     taskList.push(newestTask);
//     clearFormAddTask(formId)

//     postTask("user/tasks/", taskList);
//     init();
//   };
// }

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
