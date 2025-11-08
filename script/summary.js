// Show and hide animated overlay for responsive/mobile devices when coming from login
let urlParams = new URLSearchParams(window.location.search);
let showOverlay = urlParams.get('showOverlay');
let loginType = urlParams.get('loginType');

/**
 * Initializes the summary page with all necessary data and UI updates
 * Loads tasks, username, profile icon, card information and sets up greeting updates
 * @returns {Promise<void>} Promise that resolves when initialization is complete
 */
async function summaryInit() {
    await loadTasks();
    await loadUsername();
    rederProfilHeaderIcon('profil_header_summary');
    loadCardInfos();
    updateGreeting();
    setInterval(updateGreeting, 60);
}

/**
 * Checks URL parameters and displays animated overlay for mobile devices
 */
function checkAndShowOverlay() {
    if (showOverlay === 'true' && window.innerWidth < 951) {
        showMobileOverlay();
    }
    cleanUpUrl();
}

/**
 * Shows animated overlay for mobile devices with appropriate template
 * @description Renders overlay based on loginType, shows for 1.5s, then fades out over 1s
 * @throws {Error} If required DOM elements are not found
 */
function showMobileOverlay() {
    let overlay = document.getElementById('animated_overlay_id');
    let overlayBg = document.getElementById('animated-overlay-parent');
    
    overlay.innerHTML = loginType === 'guest' ? summaryGuestOverlayTemplate() : summaryOverlayTemplate();
    overlay.classList.remove('o_0');
    overlayBg.classList.remove('d_none');
    
    setTimeout(() => {
        overlay.classList.add('o_0');
        setTimeout(() => overlayBg.classList.add('d_none'), 1000);
    }, 1500);
}

/**
 * Automatically hides overlay after animation and cleans up URL parameters
 * @description Removes URL parameters from address bar without page reload
 * @example cleanUpUrl(); // Changes /summary.html?showOverlay=true to /summary.html
 */
function cleanUpUrl() {
    let newUrl = window.location.pathname;
    window.history.replaceState(null, '', newUrl);
}

/**
 * Redirects the user to the board page
 * Opens the board.html page in the current window
 */
function openBoard() {
    window.location.href = './board.html';
}

/**
 * Returns appropriate greeting text based on the hour of day
 * @param {number} h - Hour of the day (0-23)
 * @returns {string} Greeting message corresponding to the time of day
 */
function getGreetingByHour(h) {
    let punctuation = isGuestUser() ? "!" : ",";
    
    if (h >= 5 && h <= 11) return "Good morning" + punctuation;
    if (h >= 12 && h <= 16) return "Good afternoon" + punctuation;
    if (h >= 17 && h <= 21) return "Good evening" + punctuation;
    return "Good night" + punctuation;
}

/**
 * Updates the greeting text elements based on current time
 * Updates both main greeting and responsive greeting elements if they exist
 */
function updateGreeting() {
    let now = new Date();
    let hour = now.getHours();
    document.getElementById("greeting-text").textContent = getGreetingByHour(hour);
    respGreeting = document.getElementById("resp-greeting-text");
    if (respGreeting != null) {
        respGreeting.textContent = getGreetingByHour(hour);
    }
}

/**
 * Loads and displays card information on the summary page
 * Filters tasks by category and renders upcoming deadline information
 * @returns {Promise<void>} Promise that resolves when card information is loaded
 */
async function loadCardInfos() {
    filterTasksByCategory();
    renderUpcomingDeadline();
}

/**
 * Filters tasks by their categories and renders counts to summary cards
 * Categorizes tasks into to-do, in-progress, await-feedback, and done
 */
function filterTasksByCategory() {
    let toDos = taskList.filter(t => t.category == 'to-do');
    let inProgressTasks = taskList.filter(t => t.category == 'in-progress');
    let awaitFeddbackTasks = taskList.filter(t => t.category == 'await-feedback');
    let doneTasks = taskList.filter(t => t.category == 'done');

    let allTasks = document.getElementById('all-tasks');
    let allToDoTasks = document.getElementById('all-to-do-tasks');
    let tasksInProgress = document.getElementById('tasks-in-progress');
    let tasksInAwaitingFeedback = document.getElementById('tasks-in-awaiting-feedback');
    let allDoneTasks = document.getElementById('all-done-tasks');
    renderCountstoSummaryCards(allTasks, allToDoTasks, tasksInProgress, tasksInAwaitingFeedback, allDoneTasks, toDos, inProgressTasks, awaitFeddbackTasks, doneTasks);
}

/**
 * Renders task counts to the summary cards in the UI
 * @param {HTMLElement} allTasks - Element to display total task count
 * @param {HTMLElement} allToDoTasks - Element to display to-do task count
 * @param {HTMLElement} tasksInProgress - Element to display in-progress task count
 * @param {HTMLElement} tasksInAwaitingFeedback - Element to display awaiting feedback task count
 * @param {HTMLElement} allDoneTasks - Element to display done task count
 * @param {Array} toDos - Array of to-do tasks
 * @param {Array} inProgressTasks - Array of in-progress tasks
 * @param {Array} awaitFeddbackTasks - Array of awaiting feedback tasks
 * @param {Array} doneTasks - Array of done tasks
 */
function renderCountstoSummaryCards(allTasks, allToDoTasks, tasksInProgress, tasksInAwaitingFeedback, allDoneTasks, toDos, inProgressTasks, awaitFeddbackTasks, doneTasks) {
    allTasks.innerHTML = taskList.length;
    allToDoTasks.innerHTML = toDos.length;
    tasksInProgress.innerHTML = inProgressTasks.length;
    tasksInAwaitingFeedback.innerHTML = awaitFeddbackTasks.length;
    allDoneTasks.innerHTML = doneTasks.length;
}

/**
 * Renders the upcoming deadline information and urgent task count
 * Finds the earliest deadline from all tasks and displays it in a formatted date
 * Also displays the count of urgent priority tasks
 */
function renderUpcomingDeadline() {
    let dateOfDeadline = document.getElementById('date-of-deadline');
    let allTasksFromPriority = document.getElementById('all-tasks-from-priority');
    let urgentTasks = taskList.filter(t => t.priority == 'urgent');
    
    dateOfDeadline.innerHTML = taskList.length > 0 ? getFormattedEarliestDate() : 'no Tasks';
    allTasksFromPriority.innerHTML = urgentTasks.length;
}

/**
 * Gets the earliest deadline from all tasks and returns it formatted
 * @returns {string} Formatted date string of earliest deadline
 */
function getFormattedEarliestDate() {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let dates = Math.min(...taskList.map(d => new Date(d.date)));
    let smallest = taskList.filter(d => new Date(d.date).getTime() === dates);
    let dateStr = smallest[0].date.replace(/-/g, "");
    let date = new Date(
        dateStr.slice(0, 4),
        dateStr.slice(4, 6) - 1,
        dateStr.slice(6, 8)
    );
    return date.toLocaleDateString('en-US', options);
}

checkAndShowOverlay();