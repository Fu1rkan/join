/**
 * Checks if the current user is a guest user
 * @returns {boolean} True if current user is guest (userId is "1" or 1), false otherwise
 */
function isGuestUser(){
    let guestId = JSON.parse(localStorage.getItem("userId"));
    return guestId === "1" || guestId === 1;
}

/**
 * Initializes a guest user session with default values and example data
 * Sets up localStorage with guest username, userId, and example arrays for contacts and tasks
 */
function initializeGuestSession(){
    let guestUserName = "G";
    let guestUserId = "1";
    
    localStorage.setItem("userName", JSON.stringify(guestUserName));
    localStorage.setItem("userId", JSON.stringify(guestUserId));

    // Initialize with example data if no guest data exists
    if(!localStorage.getItem("guestContacts")){
        const exampleContacts = createExampleContacts();
        localStorage.setItem("guestContacts", JSON.stringify(exampleContacts));
    }
    if(!localStorage.getItem("guestTasks")){
        const exampleTasks = createExampleTasks();
        localStorage.setItem("guestTasks", JSON.stringify(exampleTasks));
    }
}

/**
 * Loads guest contacts from localStorage into the global contacts array
 * Retrieves stored guest contacts or initializes with empty array if none exist
 */
function loadGuestContacts(){
    let guestContactsData = localStorage.getItem("guestContacts");
    let guestContactsArray = guestContactsData ? JSON.parse(guestContactsData) : [];
    contacts = guestContactsArray;
}

/**
 * Loads guest tasks from localStorage into the global taskList array
 * Retrieves stored guest tasks or initializes with empty array if none exist
 */
function loadGuestTasks() {
    let guestTasksData = localStorage.getItem("guestTasks");
    let guestTasksArray = guestTasksData ? JSON.parse(guestTasksData) : [];
    taskList = guestTasksArray;
}

/**
 * Saves guest contacts to localStorage
 * @param {Array} guestContactsToSave - Array of contact objects to save
 * @returns {Promise<void>} Promise that resolves when contacts are saved
 */
function putGuestContacts(guestContactsToSave) {
    let guestContactsString = JSON.stringify(guestContactsToSave);
    localStorage.setItem("guestContacts", guestContactsString);
    return Promise.resolve();
}

/**
 * Saves guest tasks to localStorage
 * @param {Array} guestTasksToSave - Array of task objects to save
 * @returns {Promise<void>} Promise that resolves when tasks are saved
 */
function putGuestTasks(guestTasksToSave) {
    let guestTasksString = JSON.stringify(guestTasksToSave);
    localStorage.setItem("guestTasks", guestTasksString);
    return Promise.resolve();
}

/**
 * Clears guest data from localStorage when guest user logs out
 * Removes guest contacts and tasks if current user is a guest
 */
function clearGuestData() {
    let currentGuestId = JSON.parse(localStorage.getItem("userId"));
    let isCurrentUserGuest = currentGuestId === "1" || currentGuestId === 1;
    
    if (isCurrentUserGuest) {
        localStorage.removeItem("guestContacts");
        localStorage.removeItem("guestTasks");
    }
}

/**
 * Loads and displays the guest username in relevant DOM elements
 * Sets "Guest" as display name in username and greeting elements
 */
function loadGuestUsername() {
    let guestDisplayName = "Guest";
    let guestUsernameElement = document.getElementById('userName');
    let guestRespGreetingElement = document.getElementById("summary-greeting-name");
    
    if (guestUsernameElement) {
        guestUsernameElement.innerHTML = guestDisplayName;
    }
    if (guestRespGreetingElement) {
        guestRespGreetingElement.innerHTML = guestDisplayName;
    }
}

/**
 * Checks if guest user has any saved contacts
 * @returns {boolean} True if guest has contacts, false otherwise
 */
function hasGuestContacts() {
    let guestContactsCheck = localStorage.getItem("guestContacts");
    let guestContactsArray = guestContactsCheck ? JSON.parse(guestContactsCheck) : [];
    return guestContactsArray.length > 0;
}

/**
 * Checks if guest user has any saved tasks
 * @returns {boolean} True if guest has tasks, false otherwise
 */
function hasGuestTasks() {
    let guestTasksCheck = localStorage.getItem("guestTasks");
    let guestTasksArray = guestTasksCheck ? JSON.parse(guestTasksCheck) : [];
    return guestTasksArray.length > 0;
}

/**
 * Gets the total number of guest contacts
 * @returns {number} The count of guest contacts in localStorage
 */
function getGuestContactsCount() {
    let guestContactsForCount = localStorage.getItem("guestContacts");
    let guestContactsCountArray = guestContactsForCount ? JSON.parse(guestContactsForCount) : [];
    return guestContactsCountArray.length;
}

/**
 * Gets the total number of guest tasks
 * @returns {number} The count of guest tasks in localStorage
 */
function getGuestTasksCount() {
    let guestTasksForCount = localStorage.getItem("guestTasks");
    let guestTasksCountArray = guestTasksForCount ? JSON.parse(guestTasksForCount) : [];
    return guestTasksCountArray.length;
}
