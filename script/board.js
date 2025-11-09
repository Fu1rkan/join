let checkOverlay = 0

let currentDraggedElement;

let taskEditor;

let ids = ['to-do', 'in-progress', 'await-feedback', 'done'];

/**
 * Initializes the board page by loading necessary data and rendering tasks
 * Loads contacts and tasks from database, sets up profile header icon, and renders all tasks
 * @returns {Promise<void>} Promise that resolves when board initialization is complete
 */
async function boardInit() {
    // await init();
    await loadContacts();
    await loadTasks();
    rederProfilHeaderIcon('profil_header_board');
    renderTasks();
}

/**
 * Renders all tasks in their respective Kanban board columns
 * Filters tasks by category and displays them in appropriate columns or shows empty state
 */
async function renderTasks() {
    for (let index = 0; index < ids.length; index++) {
        let categoryTasks = taskList.filter(t => t['category'] == ids[index]);
        document.getElementById(`${ids[index]}-kanban`).innerHTML = "";
        if (categoryTasks.length > 0) {
            for (let i = 0; i < categoryTasks.length; i++) {
                document.getElementById(`${ids[index]}-kanban`).innerHTML += taskTemp(categoryTasks[i]);
                checkTaskInfos(categoryTasks[i]);
            }
        } else {
            document.getElementById(`${ids[index]}-kanban`).innerHTML = emptyTaskList(ids[index]);
        }
    }
}

/**
 * Searches and filters tasks based on search input
 * Hides tasks that don't match the search term in their name
 */
function searchtasks() {
    let input = document.getElementById('search-bar');
    let inputValue = input.value;
    let tasks = taskList.filter(t =>
        !t.name.toLowerCase().includes(inputValue.toLowerCase()) &&
        !t.description.toLowerCase().includes(inputValue.toLowerCase())
    );
    let tasksResult = taskList.filter(t =>
        t.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        t.description.toLowerCase().includes(inputValue.toLowerCase())
    );
    checkInputLength(input, inputValue, tasks, tasksResult);
}


function checkInputLength(input, inputValue, tasks, tasksResult) {
    if (inputValue.length > 0) {
        checkTaskLength(tasks, tasksResult);
    } else {
        input.placeholder = 'This field is required';
        input.classList.add('empty-input');
    }
}

function checkTaskLength(tasks, tasksResult) {
    if (tasks.length !== taskList.length) {
        renderSearchedTasks(tasks, tasksResult);
    } else {
        document.getElementById('to-do-kanban').innerHTML = noResultsTaskList();
        document.getElementById('in-progress-kanban').innerHTML = noResultsTaskList();
        document.getElementById('await-feedback-kanban').innerHTML = noResultsTaskList();
        document.getElementById('done-kanban').innerHTML = noResultsTaskList();
    }
}


function renderSearchedTasks(tasks, tasksResult) {
    for (let index = 0; index < tasks.length; index++) {
        document.getElementById(`task-id-${tasks[index].id}`).classList.add('d_none');
    }
    for (let index = 0; index < ids.length; index++) {
        let taskCategory = tasksResult.filter(c => c.category == ids[index]);
        if (taskCategory.length === 0) {
            document.getElementById(`${ids[index]}-kanban`).innerHTML = noResultsTaskList();
        }
    }
}

/**
 * Shows all tasks when search input is short
 * Removes hidden class from all tasks when search term is less than 4 characters
 */
function showAllTasks() {
    let input = document.getElementById('search-bar');
    let inputValue = input.value;
    input.placeholder = 'Find Task';
    input.classList.remove('empty-input');
    if (inputValue.length < 3) {
        renderTasks();
    }
}

/**
 * Starts the drag operation for a task card
 * Sets the currently dragged element ID for drag and drop functionality
 * @param {number} id - The ID of the task being dragged
 */
function startDragging(id) {
    currentDraggedElement = id;
}

/**
 * Allows dropping elements by preventing default drag behavior
 * Prevents the default handling of drag events to enable custom drop functionality
 * @param {Event} card - The drag event object
 */
function allowDrop(card) {
    card.preventDefault();
}

/**
 * Moves a task to a different category column and updates the database
 * Changes the task category, removes drag highlighting, and refreshes the board
 * @param {string} categoryTo - The target category to move the task to
 * @param {string} id - The ID of the drop zone element
 * @returns {Promise<void>} Promise that resolves when task is moved and board is updated
 */
async function moveTo(categoryTo, id) {
    let task = taskList.find(t => t['id'] == currentDraggedElement);
    let categoryFrom = task['category'];
    task['category'] = categoryTo;
    document.getElementById(id).classList.remove('drag-area-highlight');
    ids = [categoryFrom, categoryTo]
    await putTask(taskList);
    await boardInit();
}

/**
 * Highlights a drop zone during drag operations
 * Adds visual highlighting to indicate valid drop target
 * @param {string} id - The ID of the element to highlight
 */
function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

/**
 * Removes highlight from a drop zone after drag operations
 * Removes visual highlighting from drop target elements
 * @param {string} id - The ID of the element to remove highlighting from
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

/**
 * Opens the native date picker for the date input field
 * Shows the date picker interface and focuses on the input field
 */
function openDatePicker() {
    const input = document.getElementById('input-date');
    input.showPicker?.();
    input.focus();
}

/**
 * Opens the responsive task menu for mobile devices
 * Shows task movement options and sets up click handler for menu closing
 * @param {number} i - The ID of the task to show menu for
 */
function openTaskRespMenu(i) {
    closeTaskMenus(i);
    document.getElementById(`resp-menu-task-${i}`).classList.remove('t_t_150');
    setTimeout(() => {
        document.body.setAttribute('onclick', `closeTaskMenus(${i})`);
    }, 100)

    let task = taskList.findIndex(t => t.id == i);
    checkTaskStatus(task, i);
}

function checkTaskStatus(task, i) {
    if (taskList[task].category == "to-do") {
        disableChangeButton('up', 'down', 'In progress', i);
    } else if (taskList[task].category == "done") {
        disableChangeButton('down', 'up', 'Await feedback', i);
    } else if (taskList[task].category == "in-progress") {
        changeSwitchButton('To do', 'Await feedback', i);
    } else {
        changeSwitchButton('In progress', 'done', i);
    }
}


function disableChangeButton(order, order2, category, i) {
    document.getElementById(`switch-${order}-button-${i}`).classList.add('d_none');
    document.getElementById(`switch-${order2}-${i}`).innerHTML = category;
}


function changeSwitchButton(up, down, i) {
    document.getElementById(`switch-up-${i}`).innerHTML = up;
    document.getElementById(`switch-down-${i}`).innerHTML = down;
}

/**
 * Closes all responsive task menus
 * Hides all task menus and removes the body click handler
 * @param {number} i - The ID of the task (currently unused in implementation)
 */
function closeTaskMenus(i) {
    let menus = document.querySelectorAll('[id^="resp-menu-task-"]');
    menus.forEach(m => m.classList.add('t_t_150'));
    document.body.removeAttribute('onclick');
}

/**
 * Moves a task down one category in the workflow progression
 * Advances task from to-do → in-progress → await-feedback → done
 * @param {number} i - The ID of the task to move down
 */
async function switchDown(i) {
    let task = taskList.findIndex(t => t.id == i);

    if (taskList[task].category == "to-do") {
        taskList[task].category = "in-progress";
    } else if (taskList[task].category == "in-progress") {
        taskList[task].category = "await-feedback";
    } else if (taskList[task].category == "await-feedback") {
        taskList[task].category = "done"
    }
    await putTask(taskList);
    await renderTasks();
}

/**
 * Moves a task up one category in the workflow progression
 * Moves task backwards: done → await-feedback → in-progress → to-do
 * @param {number} i - The ID of the task to move up
 */
async function switchUp(i) {
    let task = taskList.findIndex(t => t.id == i);
    if (taskList[task].category == "in-progress") {
        taskList[task].category = "to-do";
    } else if (taskList[task].category == "await-feedback") {
        taskList[task].category = "in-progress"
    } else if (taskList[task].category == "done") {
        taskList[task].category = "await-feedback"
    }
    await putTask(taskList);
    await renderTasks();
}

/**
 * Opens the add task overlay and loads task data
 * Displays the board add task template and initializes task loading
 */
function toggleAddTaskOverlay(progress) {
    document.getElementById('bleur-bg').classList.toggle('d_none');
    document.getElementById('task-dialog').classList.toggle('tf_tlx100');
    document.body.classList.toggle('of_hidden');
    checkAddTaskOverlayStatus(progress);
}


function checkAddTaskOverlayStatus(progress) {
    if (checkOverlay == 0) {
        document.getElementById('task-dialog').innerHTML = boardAddTaskTemplate(progress);
        setTimeout(() => {
            document.getElementById('task-dialog').setAttribute('onclick', `toggleAddTaskOverlay()`);
        }, 50);
        checkOverlay += 1;
    } else if (progress == true) {
        resetAddTaskOverlay();
        renderTasks();
    } else {
        resetAddTaskOverlay();
    }
}


function resetAddTaskOverlay() {
    clearForm()
    document.getElementById('task-dialog').removeAttribute('onclick');
    checkOverlay = 0;
}