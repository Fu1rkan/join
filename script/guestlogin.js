//check current user is guest
function isGuestUser(){
    let guestId = JSON.parse(localStorage.getItem("userId"));
    return guestId === "1" || guestId === 1;
}

//initialize guest session
function initializeGuestSession(){
    let guestUserName = "G";
    let guestUserId = "1";
    
    localStorage.setItem("userName", JSON.stringify(guestUserName));
    localStorage.setItem("userId", JSON.stringify(guestUserId));

    if(!localStorage.getItem("guestContacts")){
        localStorage.setItem("guestContacts", JSON.stringify([]));
    }
    if(!localStorage.getItem("guestTasks")){
        localStorage.setItem("guestTasks", JSON.stringify([]));
    }
}

//Load guest contacts from localStorage
function loadGuestContacts(){
    let guestContactsData = localStorage.getItem("guestContacts");
    let guestContactsArray = guestContactsData ? JSON.parse(guestContactsData) : [];
    contacts = guestContactsArray;
}

//load guest tasks from localStorage
function loadGuestTasks() {
    let guestTasksData = localStorage.getItem("guestTasks");
    let guestTasksArray = guestTasksData ? JSON.parse(guestTasksData) : [];
    taskList = guestTasksArray; // Setze globale Variable
}

//add new guest task to localStorage
function addGuestTasks(guestTasksToSave){
    let guestTasksString = JSON.stringify(guestTasksToSave);
    localStorage.setItem("guestTasks", guestTasksString);
    return Promise.resolve();
}

// Clear guest data on logout
function clearGuestData() {
    let currentGuestId = JSON.parse(localStorage.getItem("userId"));
    let isCurrentUserGuest = currentGuestId === "1" || currentGuestId === 1;
    
    if (isCurrentUserGuest) {
        localStorage.removeItem("guestContacts");
        localStorage.removeItem("guestTasks");
    }
}

// Load username for guest
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

// Check if guest has any contacts
function hasGuestContacts() {
    let guestContactsCheck = localStorage.getItem("guestContacts");
    let guestContactsArray = guestContactsCheck ? JSON.parse(guestContactsCheck) : [];
    return guestContactsArray.length > 0;
}

// Check if guest has any tasks
function hasGuestTasks() {
    let guestTasksCheck = localStorage.getItem("guestTasks");
    let guestTasksArray = guestTasksCheck ? JSON.parse(guestTasksCheck) : [];
    return guestTasksArray.length > 0;
}

// Get guest contacts count
function getGuestContactsCount() {
    let guestContactsForCount = localStorage.getItem("guestContacts");
    let guestContactsCountArray = guestContactsForCount ? JSON.parse(guestContactsForCount) : [];
    return guestContactsCountArray.length;
}

// Get guest tasks count  
function getGuestTasksCount() {
    let guestTasksForCount = localStorage.getItem("guestTasks");
    let guestTasksCountArray = guestTasksForCount ? JSON.parse(guestTasksForCount) : [];
    return guestTasksCountArray.length;
}









