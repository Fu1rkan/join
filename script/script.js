const BASE_URL = "https://testjoin-36a23-default-rtdb.europe-west1.firebasedatabase.app/user/";

let contacts = [];
let taskList = [];

/**
 * Prevents event bubbling by stopping event propagation
 * @param {Event} event - The event object to stop propagation for
 */
function stopPropagation(event) {
  event.stopPropagation();
}

/**
 * Toggles the visibility of the burger menu with animation
 * Shows/hides the profile menu with smooth transitions
 */
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

/**
 * Escapes HTML special characters to prevent XSS attacks
 * @param {string} str - The string to escape HTML characters from
 * @returns {string} The escaped string safe for HTML insertion
 */
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Validates login credentials and displays error messages if authentication fails
 * @param {number} currentUserIndex - Index of the user in the database (-1 if not found)
 */
function checkLoginValues(currentUserIndex) {
  if (currentUserIndex === -1) {
    document.getElementById('required_password').innerHTML = `<p id="password_invalid_field" class="required-field-text">LogIn failed. Please check your email and password.</p>`;
    document.getElementById('password_input_id').classList.add('required-outline');
  } else {
    document.getElementById('required_password').innerHTML = '';
    document.getElementById('password_input_id').classList.remove('required-outline');
  }
}

/**
 * Loads contacts from Firebase database or guest data depending on user type
 * @returns {Promise<void>} Promise that resolves when contacts are loaded
 */
async function loadContacts() {
  if (isGuestUser()) {
    loadGuestContacts();
  } else {
    let path = localStorage.getItem("userId");
    let userId = JSON.parse(path);
    let contactsPath = userId + "contacts/";
    let response = await fetch(BASE_URL + contactsPath + ".json");
    let responseToJson = await response.json();
    pushUserContactsToArray(responseToJson);
  }
}

/**
 * Populates the contacts array with data from Firebase response
 * @param {Object|null} responseToJson - The JSON response from Firebase containing contacts data
 */
function pushUserContactsToArray(responseToJson) {
  contacts = [];
  if (responseToJson != null) {
    for (let index = 0; index < responseToJson.length; index++) {
      contacts.push(responseToJson[index]);
    }
  }
}

/**
 * Loads tasks from Firebase database or guest data depending on user type
 * @returns {Promise<void>} Promise that resolves when tasks are loaded
 */
async function loadTasks() {
  if (isGuestUser()) {
    loadGuestTasks();
  } else {
    let path = localStorage.getItem("userId");
    let userId = JSON.parse(path);
    let tasksPath = userId + "tasks/";
    let response = await fetch(BASE_URL + tasksPath + ".json");
    let responseToJson = await response.json();
    pushUserTaskToArray(responseToJson);
  }
}

/**
 * Populates the taskList array with data from Firebase response
 * @param {Object|null} responseToJson - The JSON response from Firebase containing tasks data
 */
function pushUserTaskToArray(responseToJson) {
  if (responseToJson != null) {
    taskList = [];
    for (let index = 0; index < responseToJson.length; index++) {
      taskList.push(responseToJson[index]);
    }
  }
}

/**
 * Loads and displays username from Firebase or guest data
 * Updates username display and greeting elements if they exist
 * @returns {Promise<void>} Promise that resolves when username is loaded
 */
async function loadUsername() {
  if (isGuestUser()) {
    loadGuestUsername();
  } else {
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
}

/**
 * Saves tasks to Firebase database or guest storage
 * @param {Object} data - The task data to save (defaults to empty object)
 * @returns {Promise<void>} Promise that resolves when tasks are saved
 */
async function putTask(data = {}) {
  if (isGuestUser()) {
    await putGuestTasks(taskList);
  } else {
    let tasksPath = getUserIdAndPathForTasks();
    if (taskList.length > 0) {
      await putTasksInFirebase(data, tasksPath);
    } else {
      await putPlaceholderInFirebase(tasksPath);
    }
  }
}

/**
 * Constructs the Firebase path for user's tasks based on stored user ID
 * @returns {string} The Firebase path for the user's tasks
 */
function getUserIdAndPathForTasks() {
  let path = localStorage.getItem("userId");
  let userId = JSON.parse(path);
  return userId + "tasks/";
}

/**
 * Sends task data to Firebase database via PUT request
 * @param {Object} data - The task data to save
 * @param {string} tasksPath - The Firebase path for tasks
 * @returns {Promise<Object>} Promise that resolves with Firebase response
 */
async function putTasksInFirebase(data, tasksPath) {
  let response = await fetch(BASE_URL + tasksPath + ".json", {
    method: "PUT",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return (responseToJson = await response.json());
}

/**
 * Saves a placeholder object to Firebase when no actual data exists
 * @param {string} tasksPath - The Firebase path to save the placeholder
 * @returns {Promise<Object>} Promise that resolves with Firebase response
 */
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

/**
 * Saves contacts to Firebase database or guest storage
 * @param {Object} data - The contact data to save (defaults to empty object)
 * @returns {Promise<void>} Promise that resolves when contacts are saved
 */
async function putContacts(data = {}) {
  if (isGuestUser()) {
    await putGuestContacts(contacts);
  } else {
    let contactsPath = getUserIdAndPathForContacts();
    if (contacts.length > 0) {
      await putContactsInFirebase(data, contactsPath);
    } else {
      await putPlaceholderInFirebase(contactsPath);
    }
  }
}

/**
 * Constructs the Firebase path for user's contacts based on stored user ID
 * @returns {string} The Firebase path for the user's contacts
 */
function getUserIdAndPathForContacts() {
  let path = localStorage.getItem("userId");
  let userId = JSON.parse(path);
  return userId + "contacts/";
}

/**
 * Sends contact data to Firebase database via PUT request
 * @param {Object} data - The contact data to save
 * @param {string} contactsPath - The Firebase path for contacts
 * @returns {Promise<Object>} Promise that resolves with Firebase response
 */
async function putContactsInFirebase(data, contactsPath) {
  let response = await fetch(BASE_URL + contactsPath + ".json", {
    method: "PUT",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return (responseToJson = await response.json());
}

/**
 * Saves a placeholder object to Firebase when no contact data exists
 * @param {string} contactsPath - The Firebase path to save the placeholder
 * @returns {Promise<Object>} Promise that resolves with Firebase response
 */
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

/**
 * Adds example data (tasks and contacts) for new users or guest users
 * Creates 5 example tasks and 10 example contacts to demonstrate application features
 * Compatible with both regular users and guest users
 * @returns {Promise<void>} Promise that resolves when example data is added
 */
async function addExampleData() {
  const exampleTasks = createExampleTasks();
  taskList = [...taskList, ...exampleTasks];
  await putTask(taskList);
  const exampleContacts = createExampleContacts();
  contacts = [...contacts, ...exampleContacts];
  await putContacts(contacts);
}

/**
 * Logs out the current user and redirects to the login page
 * Clears guest data, removes localStorage items, and navigates to index.html
 */
function logOut() {
  clearGuestData();
  localStorage.removeItem("userName");
  localStorage.removeItem("userId");
  window.location.href = './index.html';
}

/** Initializes an authentication guard to protect restricted pages
 * Redirects to login page if no user is authenticated
 */
function initAuthGuard() {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    logOut();
  }
}