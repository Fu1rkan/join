// Show and hide animated overlay for responsive/mobile devices when coming from login
let urlParams = new URLSearchParams(window.location.search);
let showOverlay = urlParams.get('showOverlay');
let loginType = urlParams.get('loginType');


async function summaryInit() {
    // await init();
    await loadTasks();
    await loadUsername()
    loadCardInfos();
}

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

checkAndShowOverlay();

function getGreetingByHour(h) {
    if (h >= 5 && h <= 11) return "Good morning,";
    if (h >= 12 && h <= 16) return "Good afternoon,";
    if (h >= 17 && h <= 21) return "Good evening,";
    return "Good night,";
}

function updateGreeting() {
    let now = new Date();
    let hour = now.getHours();
    document.getElementById("greeting-text").textContent = getGreetingByHour(hour);
}

updateGreeting();
setInterval(updateGreeting, 60);


async function loadCardInfos() {
    filterTasksByCategory();
    renderUpcomingDeadline();
}


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


function renderCountstoSummaryCards(allTasks, allToDoTasks, tasksInProgress, tasksInAwaitingFeedback, allDoneTasks, toDos, inProgressTasks, awaitFeddbackTasks, doneTasks) {
    allTasks.innerHTML = taskList.length;
    allToDoTasks.innerHTML = toDos.length;
    tasksInProgress.innerHTML = inProgressTasks.length;
    tasksInAwaitingFeedback.innerHTML = awaitFeddbackTasks.length;
    allDoneTasks.innerHTML = doneTasks.length;
}


function renderUpcomingDeadline() {
    let dateOfDeadline = document.getElementById('date-of-deadline');
    let allTasksFromPriority = document.getElementById('all-tasks-from-priority');
    let urgentTasks = taskList.filter(t => t.priority == 'urgent');
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    console.log(taskList);
    
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