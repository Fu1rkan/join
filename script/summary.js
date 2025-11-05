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
    // await init();
    await loadTasks();
    await loadUsername();
    rederProfilHeaderIcon('profil_header_summary');
    loadCardInfos();
    updateGreeting();
    setInterval(updateGreeting, 60);
}

/**
 * Checks URL parameters and displays animated overlay for mobile devices
 * Shows different overlay templates based on user type (guest or regular user)
 * Automatically hides overlay after animation and cleans up URL parameters
 */
function checkAndShowOverlay() {
    if (showOverlay === 'true' && window.innerWidth < 951) {
        let overlay = document.getElementById('animated_overlay_id');
        let overlayBg = document.getElementById('animated-overlay-parent');
        if (loginType === 'guest') {
            overlay.innerHTML = summaryGuestOverlayTemplate();
        } else {
            overlay.innerHTML = summaryOverlayTemplate();
        }
        overlay.classList.remove('o_0');
        overlayBg.classList.remove('d_none');
        setTimeout(() => {
            overlay.classList.add('o_0');
            setTimeout(()=>{
                overlayBg.classList.add('d_none');
            }, 1000)
        }, 1500);
    }
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


checkAndShowOverlay();

/**
 * Returns appropriate greeting text based on the hour of day
 * @param {number} h - Hour of the day (0-23)
 * @returns {string} Greeting message corresponding to the time of day
 */
function getGreetingByHour(h) {
    if (h >= 5 && h <= 11) return "Good morning,";
    if (h >= 12 && h <= 16) return "Good afternoon,";
    if (h >= 17 && h <= 21) return "Good evening,";
    return "Good night,";
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
    let options = { year: 'numeric', month: 'long', day: 'numeric' };

    if (taskList.length > 0) {
        let dates = Math.min(...taskList.map(d => new Date(d.date)));
        let smallest = taskList.filter(d => new Date(d.date).getTime() === dates);
        let dateStr = smallest[0].date.replace(/-/g, "");
        let date = new Date(
            dateStr.slice(0, 4),
            dateStr.slice(4, 6) - 1,
            dateStr.slice(6, 8)
        );
        dateOfDeadline.innerHTML = date.toLocaleDateString('en-US', options);
    } else {
        dateOfDeadline.innerHTML = 'no Tasks'
    }
    allTasksFromPriority.innerHTML = urgentTasks.length;
}