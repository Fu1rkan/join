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


//Tasks

async function loadTasks() {
    let user = "user/";
    let userContacts = "tasks/";
    let response = await fetch(BASE_URL + user + userContacts + ".json");
    let responseToJson = await response.json();
    pushUserTaskToArray(responseToJson);
}

function pushUserTaskToArray(responseToJson) {
  if (responseToJson.length > 0) {
    taskList = [];
    for (let index = 0; index < responseToJson.length; index++) {
        taskList.push(responseToJson[index]);
    }
  }  
}




//Kopie von Svens Code zum Task erstellen

function checkNPost(formId, dateId) {
  let title = document.getElementById("title");
  let description = document.getElementById("description").value;
  let dueDate = document.getElementById(dateId);
  let priority = document.getElementById("priority").value;
  let category = document.getElementById("category_input");

  if (title.value.length < 1 || dueDate.value.length < 1 || category.value.length < 1) {
    requiredNotice(title, "title");
    requiredNotice(dueDate, "due_date");
    requiredNotice(category, "category");

  } else {
    // postTask("", {
    // "name": title.value,
    // "description": description,
    // "date": dueDate.value,
    // "priority": priority,
    // "assigned_to": "placeholder",
    // "category": category.value,
    // "subtask": ["text1", "text2", "text3"],
    //   /* add the other inputs */

    let newestTask = {
      "id" : taskList.length,
      "name": title.value,
      "description": description,
      "date": dueDate.value,
      "priority": priority,
      "participants": false,
      "type": category.value,
      "category": "to-do",
      "subtasks": false,
    }

    taskList.push(newestTask);
    clearFormAddTask(formId)
    
    postTask("user/tasks/", taskList);
    init();
  };
}

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
      "placeholder" : "placeholder"
    }
    let response = await fetch(BASE_URL + path + ".json", {
    method: "PUT",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return (responseToJson = await response.json());
  }

}
