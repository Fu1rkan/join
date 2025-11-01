// Show and hide animated overlay for responsive/mobile devices when coming from login
let urlParams = new URLSearchParams(window.location.search);
let showOverlay = urlParams.get('showOverlay');
let loginType = urlParams.get('loginType');

function checkAndShowOverlay() {
    if (showOverlay === 'true' && window.innerWidth < 900) {
        let overlay = document.getElementById('animated_overlay_id');
        if (loginType === 'guest') {
            overlay.innerHTML = summaryGuestOverlayTemplate();
        } else {
            overlay.innerHTML = summaryOverlayTemplate();
        }
        setTimeout(() => {
            updateGreeting();
        }, 10);
        overlay.classList.add('show');
        setTimeout(() => {
            overlay.classList.remove('show');
        }, 3000);
    }
    let newUrl = window.location.pathname;
    window.history.replaceState(null, '', newUrl);
}

function openBoard() {
    window.location.href = './board.html';
}

checkAndShowOverlay();/** Greeting changed by time*/
function getGreetingByHour(h) {
    if (h >= 5 && h <= 11) return "Good morning,";
    if (h >= 12 && h <= 16) return "Good afternoon,";
    if (h >= 17 && h <= 21) return "Good evening,";
    return "Good night,";
}
// Update greeting every minute
function updateGreeting() {
    let now = new Date();
    let hour = now.getHours();
    document.getElementById("greeting-text").textContent = getGreetingByHour(hour);
}

updateGreeting();
setInterval(updateGreeting, 60);

// stop propagation on menu click
function stopPropagation(event) {
    event.stopPropagation();
}

async function loadCardInfos() {
    await loadTasks();

    let toDos = taskList.filter(t => t.category == 'to-do');
    let inProgressTasks = taskList.filter(t => t.category == 'in-progress');
    let awaitFeddbackTasks = taskList.filter(t => t.category == 'await-feedback');
    let doneTasks = taskList.filter(t => t.category == 'done');

    let lowTasks = taskList.filter(t => t.priority == 'low');
    let mediumTasks = taskList.filter(t => t.priority == 'medium');
    let urgentTasks = taskList.filter(t => t.priority == 'urgent');


    let allTasks = document.getElementById('all-tasks');
    let allToDoTasks = document.getElementById('all-to-do-tasks');
    let tasksInProgress = document.getElementById('tasks-in-progress');
    let tasksInAwaitingFeedback = document.getElementById('tasks-in-awaiting-feedback');
    let allDoneTasks = document.getElementById('all-done-tasks');

    let summaryCategoryLogo = document.getElementById('summary-category-logo');
    let allTasksFromPriority = document.getElementById('all-tasks-from-priority');

    let dateOfDeadline = document.getElementById('date-of-deadline');

    let dates = Math.min(...urgentTasks.map(d => new Date(d.date)));
    let smallest = urgentTasks.filter(d => new Date(d.date).getTime() === dates);


    allTasks.innerHTML = taskList.length;
    allToDoTasks.innerHTML = toDos.length;
    tasksInProgress.innerHTML = inProgressTasks.length;
    tasksInAwaitingFeedback.innerHTML = awaitFeddbackTasks.length;
    allDoneTasks.innerHTML = doneTasks.length;
    allTasksFromPriority.innerHTML = urgentTasks.length;
    dateOfDeadline.innerHTML = smallest[0].date
}