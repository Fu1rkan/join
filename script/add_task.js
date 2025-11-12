let priorityTaskActive = "medium";
let currentAssignedTo = [];
let currentChoosedCategory = "";
let currentCreatedSubtasks = [];
let overlayRef = document.getElementById('add_task_overlay');
let createdMsgRef = document.getElementById('overlay_add_task_created_msg');

/**
 * Initializes the add task page with required data loading and UI setup
 * Loads tasks and contacts, then renders the profile header icon
 * @returns {Promise<void>} Promise that resolves when initialization is complete
 */
async function addTaskInit() {
    await loadTasks();
    await loadContacts();
    rederProfilHeaderIcon('profil_header_add_task');
}

/**
 * Creates a new task object and adds it to the task list
 * Builds the task object with form data and resets variables after creation
 * @param {HTMLElement} titleRef - Reference to the title input element
 * @param {HTMLElement} descriptionRef - Reference to the description textarea element
 * @param {HTMLElement} dueDateRef - Reference to the due date input element
 * @param {string} paraOverlay - Optional parameter indicating overlay context, defaults to empty string
 */
async function pushNewObject(titleRef, descriptionRef, dueDateRef, progress, fromBoard) {
    pushTaskList(titleRef, descriptionRef, dueDateRef, progress);
    if (fromBoard != undefined) {
        document.getElementById('task-added-overlay-board').classList.remove('d_none');
        await putTask(taskList);
        setTimeout(() => {
            toggleAddTaskOverlay(true);
            boardInit();
        }, 500)
    } else {
        resetGlobalVariables();
        putTaskAndShowCreatedMsg();
    }
}

/** Pushes a new task object to the global task list array
 * Constructs the task object with provided form data and appends it to taskList
 * @param {HTMLElement} titleRef - Reference to the title input element
 * @param {HTMLElement} descriptionRef - Reference to the description textarea element
 * @param {HTMLElement} dueDateRef - Reference to the due date input element
 * @param {string} progress - The progress status of the task
 */
function pushTaskList(titleRef, descriptionRef, dueDateRef, progress) {
    taskList.push(
        {
            "id": taskList.length,
            "name": titleRef.value,
            "description": descriptionRef.value,
            "date": dueDateRef.value,
            "priority": priorityTaskActive,
            "category": progress,
            "type": currentChoosedCategory,
            "participants": currentAssignedTo,
            "subtasks": currentCreatedSubtasks
        }
    )
}

/**
 * Saves the task to database and shows confirmation message
 * Handles different contexts (overlay vs. regular form) and shows appropriate feedback
 * @param {string} paraOverlay - Optional parameter indicating overlay context, defaults to empty string
 * @returns {Promise<void>} Promise that resolves when task is saved and UI is updated
 */
async function putTaskAndShowCreatedMsg() {
    await putTask(taskList);
    showTaskCreatedMsg();
}

/**
 * Resets all global variables to their default states
 * Clears form-related variables after task creation or form reset
 */
function resetGlobalVariables() {
    priorityTaskActive = "medium";
    currentAssignedTo = [];
    currentChoosedCategory = "";
    currentCreatedSubtasks = [];
}

/**
 * Creates a new task with the form data and validates required fields
 * Validates form inputs and creates task object if all required fields are filled
 * @param {string} paraOverlay - Optional parameter indicating if task is created from overlay, defaults to empty string
 */
function createNewTask(progress, fromBoard) {
    let titleRef = document.getElementById('add_task_title');
    let descriptionRef = document.getElementById('add_task_description');
    let dueDateRef = document.getElementById('add_task_due_date');
    let categoryRef = document.getElementById('add_task_category');
    requiredMsgDNone(titleRef, dueDateRef, categoryRef);
    checkArrayLength();
    if (titleRef.value.length == 0 || dueDateRef.value.length == 0 || currentChoosedCategory == "") {
        if (!currentAssignedTo) {
            currentAssignedTo = [];
        }
        if (!currentCreatedSubtasks) {
            currentCreatedSubtasks = [];
        }
        showRequiredMsg(titleRef, dueDateRef, categoryRef);
    } else {
        pushNewObject(titleRef, descriptionRef, dueDateRef, progress, fromBoard);
    }
}

/**
 * Checks and handles empty arrays for assigned contacts and subtasks
 * Sets arrays to false if empty to maintain consistent data structure
 */
function checkArrayLength() {
    if (currentAssignedTo.length == 0 && currentCreatedSubtasks.length == 0) {
        currentAssignedTo = false;
        currentCreatedSubtasks = false;
    } else if (currentAssignedTo.length == 0) {
        currentAssignedTo = false;
    } else if (currentCreatedSubtasks.length == 0) {
        currentCreatedSubtasks = false;
    }
}

/**
 * Hides all required field validation messages and removes error styling
 * Resets visual validation state for title, due date, and category fields
 * @param {HTMLElement} titleRef - Reference to the title input element
 * @param {HTMLElement} dueDateRef - Reference to the due date input element
 * @param {HTMLElement} categoryRef - Reference to the category input element
 */
function requiredMsgDNone(titleRef, dueDateRef, categoryRef) {
    const { requiredTitleRef, requiredDueDateRef, requiredCategoryRef } = takeRequiredMsgRefs();
    requiredTitleRef.classList.add('d_none');
    requiredDueDateRef.classList.add('d_none');
    requiredCategoryRef.classList.add('d_none');
    titleRef.classList.remove('add-task-red-border');
    dueDateRef.classList.remove('add-task-red-border');
    categoryRef.classList.remove('add-task-red-border');
}

/**
 * Gets references to all required field validation message elements
 * Returns an object containing references to error message elements
 * @returns {Object} Object containing required message element references
 * @returns {HTMLElement} Object.requiredTitleRef - Reference to title required message element
 * @returns {HTMLElement} Object.requiredDueDateRef - Reference to due date required message element  
 * @returns {HTMLElement} Object.requiredCategoryRef - Reference to category required message element
 */
function takeRequiredMsgRefs() {
    let requiredTitleRef = document.getElementById('required_msg_title');
    let requiredDueDateRef = document.getElementById('required_msg_due_date');
    let requiredCategoryRef = document.getElementById('required_msg_category');
    return { requiredTitleRef, requiredDueDateRef, requiredCategoryRef };
}

/**
 * Shows required field validation messages and adds error styling
 * Displays error messages and red borders for empty required fields
 * @param {HTMLElement} titleRef - Reference to the title input element
 * @param {HTMLElement} dueDateRef - Reference to the due date input element
 * @param {HTMLElement} categoryRef - Reference to the category input element
 */
function showRequiredMsg(titleRef, dueDateRef, categoryRef) {
    const { requiredTitleRef, requiredDueDateRef, requiredCategoryRef } = takeRequiredMsgRefs();
    if (titleRef.value == 0) {
        requiredTitleRef.classList.remove('d_none');
        titleRef.classList.add('add-task-red-border');
    }
    if (dueDateRef.value == 0) {
        requiredDueDateRef.classList.remove('d_none');
        dueDateRef.classList.add('add-task-red-border');
    }
    if (categoryRef.value == "") {
        requiredCategoryRef.classList.remove('d_none');
        categoryRef.classList.add('add-task-red-border');
    }
}

function checkRequiredInputs(currentElement) {
    let titleRef = document.getElementById('add_task_title');
    let dueDateRef = document.getElementById('add_task_due_date');
    let categoryRef = document.getElementById('add_task_category');
    const { requiredTitleRef, requiredDueDateRef, requiredCategoryRef } = takeRequiredMsgRefs();
    removeRequiredMsgByLenght(currentElement, titleRef, dueDateRef, categoryRef, requiredTitleRef, requiredDueDateRef, requiredCategoryRef);
}

function showOrHideRequiredMsgTitle(titleRef, requiredTitleRef) {
    if (titleRef.value.length > 0) {
        requiredTitleRef.classList.add('d_none');
    } else {
        requiredTitleRef.classList.remove('d_none');
    }
}

function showOrHideRequiredMsgDueDate(dueDateRef, requiredDueDateRef) {
    if (dueDateRef.value.length > 0) {
        requiredDueDateRef.classList.add('d_none');
    } else {
        requiredDueDateRef.classList.remove('d_none');
    }
}

function showOrHideRequiredMsgCategory(categoryRef, requiredCategoryRef) {
    if (categoryRef.value.length > 0) {
        requiredCategoryRef.classList.add('d_none');
    } else {
        requiredCategoryRef.classList.remove('d_none');
    }
}