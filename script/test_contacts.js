let contacts = [];
let testTasks = [];

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
    // filterContacts();
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
    testTasks = [];
    for (let index = 0; index < responseToJson.length; index++) {
        testTasks.push(responseToJson[index]);
    }
    console.log(testTasks);
}




//Kopie von Svens Code zum Task erstellen

function checkNPost() {
  let title = document.getElementById("title");
  let description = document.getElementById("description").value;
  let dueDate = document.getElementById("date");
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
      "name": title.value,
      "description": description,
      "date": dueDate.value,
      "priority": priority,
      "assigned_to": "placeholder",
      "categoryType": category.value,
      "category": "to-do",
      "subtask": ["text1", "text2", "text3"],
    }

    testTasks.push(newestTask);
    clearForm();
    console.log(testTasks);
    
    postTask("user/tasks/", testTasks);
    init();

  };
}