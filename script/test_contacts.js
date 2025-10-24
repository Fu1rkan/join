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
    for (let index = 0; index < responseToJson.length; index++) {
        contacts.push(responseToJson[index]);
    }
    filterContacts();
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
    for (let index = 0; index < responseToJson.length; index++) {
        testTasks.push(responseToJson[index]);
    }
    console.log(testTasks);
}