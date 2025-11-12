/**
 * Renders the profile header icon with user's initials from localStorage
 * @param {string} id - The ID of the element to render the profile icon in
 */
function rederProfilHeaderIcon(id) {
  let userNameLetters = JSON.parse(localStorage.getItem("userName"));
  let profilIconRef = document.getElementById(id);
  profilIconRef.innerHTML = `<p>${userNameLetters}</p>`
}

/**
 * Authenticates user credentials against Firebase database
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<void>} Promise that resolves when authentication is complete
 */
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

/**
 * Creates user object with capitalized name and initials
 * @param {string} username - The user's full name
 * @param {string} email - The user's email address
 * @param {string} password - The user's password
 * @param {boolean} withExamples - Whether to include example data
 * @returns {Object} User object ready for Firebase
 */
function createUserObject(username, email, password, withExamples = false) {
  let capitalizedName = generatecapitalizedName(username);
  let userNameLetters = generateLetters(capitalizedName);
  let tasks = withExamples ? createExampleTasks() : { "placeholder": "placeholder" };
  let contacts = withExamples ? createExampleContacts() : { "placeholder": "placeholder" };
  
  return {
    "username": capitalizedName,
    "userNameLetters": userNameLetters,
    "email": email,
    "password": password,
    "tasks": tasks,
    "contacts": contacts
  };
}

/**
 * Creates a new user account in Firebase database
 * @param {string} username - The user's full name
 * @param {string} email - The user's email address
 * @param {string} password - The user's password
 * @returns {Promise<Object>} Promise that resolves with Firebase response
 */
async function addNewUser(username, email, password) {
  let user = createUserObject(username, email, password, false);
  let response = await fetch(BASE_URL + ".json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  return (responseToJson = await response.json());
}

/**
 * Creates user object with example data
 * @param {string} username - The user's full name
 * @param {string} email - The user's email address
 * @param {string} password - The user's password
 * @returns {Object} Complete user object with example data
 */
function createUserWithExamples(username, email, password) {
  let capitalizedName = generatecapitalizedName(username);
  let userNameLetters = generateLetters(capitalizedName);
  const exampleTasks = createExampleTasks();
  const exampleContacts = createExampleContacts();
  
  return {
    "username": capitalizedName,
    "userNameLetters": userNameLetters,
    "email": email,
    "password": password,
    "tasks": exampleTasks,
    "contacts": exampleContacts
  };
}

/**
 * Creates a new user account with example data in Firebase database
 * @param {string} username - The user's full name
 * @param {string} email - The user's email address
 * @param {string} password - The user's password
 * @returns {Promise<Object>} Promise that resolves with Firebase response
 */
async function addNewUser(username, email, password) {
  let user = createUserWithExamples(username, email, password);
  let response = await fetch(BASE_URL + ".json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  return (responseToJson = await response.json());
}

/**
 * Generates user initials from a capitalized name
 * @param {string} capitolName - The capitalized full name
 * @returns {string} User initials (first and last name letters, or single letter)
 */
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

/**
 * Converts a name string to proper capitalization format
 * @param {string} createName - The name string to capitalize
 * @returns {string} The properly capitalized name
 */
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