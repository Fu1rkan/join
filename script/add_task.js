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
 * Opens the add task overlay by removing the hidden class
 * Makes the add task overlay visible to the user
 */
function openAddTaskOverlay() {
    overlayRef.classList.remove('d_none');
}

/**
 * Closes the add task overlay by adding the hidden class
 * Hides the add task overlay from the user view
 */
function closeAddTaskOverlay() {
    overlayRef.classList.add('d_none');
}

/**
 * Opens the calendar date picker for task due date selection
 * Sets the minimum date to today and displays the native date picker
 */
function openCalender() {
    let calenderRef = document.getElementById('add_task_due_date')
    const today = new Date().toISOString().split("T")[0];
    calenderRef.setAttribute("min", today);
    calenderRef.showPicker();
}

/**
 * Activates the selected priority level by updating button states and highlighting
 * Sets the visual state for the selected priority, resets others, and updates active priority
 * @param {string} para - The priority level to activate ('urgent', 'medium', or 'low'), defaults to 'medium'
 */
function activatePriority(para = "medium") {
    priorityTaskActive = "";
    resetPriorityButtonHighlight();
    let buttonRef = document.getElementById(`add_task_priority_${para}`);
    let svgRef = document.getElementById(`add_task_priority_${para}_svg`);
    if (para == 'urgent') {
        highlightPriorityButton(para, buttonRef, svgRef);
    } else if (para == 'medium') {
        highlightPriorityButton(para, buttonRef, svgRef);
    } else {
        highlightPriorityButton(para, buttonRef, svgRef);
    }
    priorityTaskActive = para;
}

/**
 * Resets all priority button highlights to their default state
 * Removes active classes and adds hover classes to all priority buttons and SVGs
 */
function resetPriorityButtonHighlight() {
    document.querySelectorAll('.add-task-priority-btns-container button').forEach(btn => {
        btn.classList.remove('add-task-priority-btn-urgent-active', 'add-task-priority-btn-medium-active', 'add-task-priority-btn-low-active');
        btn.classList.add('add-task-priority-btns-hover-class');
    });
    document.querySelectorAll('.add-task-priority-btns-container button svg').forEach(svg => {
        svg.classList.remove('add-task-priority-active-svg');
    });
}

/**
 * Highlights the selected priority button with appropriate styling
 * Adds active classes and removes hover class for the selected priority button
 * @param {string} para - The priority level ('urgent', 'medium', or 'low')
 * @param {HTMLElement} buttonRef - Reference to the button element to highlight
 * @param {HTMLElement} svgRef - Reference to the SVG element inside the button
 */
function highlightPriorityButton(para, buttonRef, svgRef) {
    buttonRef.classList.remove('add-task-priority-btns-hover-class');
    buttonRef.classList.add(`add-task-priority-btn-${para}-active`);
    svgRef.classList.add(`add-task-priority-active-svg`);
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
    }else{
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
 * Shows animated task creation confirmation message
 * Displays success animation and redirects to board page after completion
 */
function showTaskCreatedMsg() {
    openAddTaskOverlay();
    createdMsgRef.classList.remove('add-task-created-msg-animate-out',);
    setTimeout(() => {
        createdMsgRef.classList.add('add-task-created-msg-animate-in');
        setTimeout(() => {
            createdMsgRef.classList.remove('add-task-created-msg-animate-in')
            createdMsgRef.classList.add('add-task-created-msg-animate-out');
            setTimeout(() => {
                closeAddTaskOverlay();
                window.location.href = "./board.html";
            }, 300)
        }, 1000)
    }, 900)
}

/**
 * Closes dropdown menus when clicking outside of them
 * Handles click events to close contact list, category list, and subtasks buttons
 * @param {Event} ev - The click event object
 */
function closeDropdownMenus(ev) {
    let inputFieldAssignedToRef = document.getElementById('add_task_assigned_to');
    let inputFieldAssignedToContactListRef = document.getElementById('add_task_form_assigned_to_dropdown_contacts');
    let inputFieldCategoryRef = document.getElementById('add_task_category');
    let inputFieldCategoryListRef = document.getElementById('add_task_form_category_dropdown_category');
    let addTaskAssignedToArrow = document.getElementById('add_task_form_assigned_to_arrow_svg');
    let addTaskCategoryArrowRef = document.getElementById('add_task_form_category_arrow_svg');
    let addTaskSubtasksBtnsRef = document.getElementById('add_task_form_subtasks_btns');
    closeMenus(ev, inputFieldAssignedToRef, inputFieldAssignedToContactListRef, inputFieldCategoryRef, inputFieldCategoryListRef, addTaskAssignedToArrow, addTaskCategoryArrowRef, addTaskSubtasksBtnsRef);
    removeHighlightInputFields();
}

/**
 * Helper function to close dropdown menus based on click target
 * Closes menus if click is outside the dropdown elements and removes highlighting
 * @param {Event} ev - The click event object
 * @param {HTMLElement} inputFieldAssignedToRef - Reference to assigned to input field
 * @param {HTMLElement} inputFieldAssignedToContactListRef - Reference to contact list dropdown
 * @param {HTMLElement} inputFieldCategoryRef - Reference to category input field  
 * @param {HTMLElement} inputFieldCategoryListRef - Reference to category list dropdown
 * @param {HTMLElement} addTaskAssignedToArrow - Reference to assigned to dropdown arrow
 * @param {HTMLElement} addTaskCategoryArrowRef - Reference to category dropdown arrow
 * @param {HTMLElement} addTaskSubtasksBtnsRef - Reference to subtasks buttons container
 */
function closeMenus(ev, inputFieldAssignedToRef, inputFieldAssignedToContactListRef, inputFieldCategoryRef, inputFieldCategoryListRef, addTaskAssignedToArrow, addTaskCategoryArrowRef, addTaskSubtasksBtnsRef) {
    if (!inputFieldAssignedToRef.contains(ev.target) && !inputFieldAssignedToContactListRef.contains(ev.target) || !inputFieldCategoryRef.contains(ev.target) && !inputFieldCategoryListRef.contains(ev.target)) {
        inputFieldAssignedToContactListRef.classList.add('d_none');
        inputFieldCategoryListRef.classList.add('d_none');
        addTaskAssignedToArrow.classList.remove('add-task-form-assigned-to-arrow-up-svg');
        addTaskCategoryArrowRef.classList.remove('add-task-form-assigned-to-arrow-up-svg');
        addTaskSubtasksBtnsRef.classList.add('d_none');
    }
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
        if(!currentAssignedTo) {
            currentAssignedTo = [];
        }
        if(!currentCreatedSubtasks) {
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

/**
 * Switches input field highlighting based on the active field type
 * Shows or hides specific UI elements based on which input field is active
 * @param {string} activeInputField - The ID of the currently active input field
 * @param {HTMLElement} inputFieldAddFormSubtasksBtnsRef - Reference to subtasks buttons container
 * @param {HTMLElement} inputFieldAddFormCalenderSvgRef - Reference to calendar SVG element
 */
function switchHighlightInputFields(activeInputField, inputFieldAddFormSubtasksBtnsRef, inputFieldAddFormCalenderSvgRef) {
    switch (activeInputField) {
        case "add_task_subtasks":
            inputFieldAddFormSubtasksBtnsRef.classList.remove('d_none');
            break;
        case "add_task_due_date":
            inputFieldAddFormCalenderSvgRef.classList.add('d_none');
            break;
        default:
            break;
    }
}

/**
 * Highlights active input field with appropriate styling
 * Adds focus styling and shows related UI elements
 * @param {string} activeInputField - The ID of the input field to highlight
 */
function highlightInputFields(activeInputField) {
    let inputFieldRef = document.getElementById(activeInputField);
    let inputFieldAddFormCalenderSvgRef = document.getElementById('add_task_due_date_label_placeholder_svg');
    let inputFieldAddFormSubtasksBtnsRef = document.getElementById('add_task_form_subtasks_btns');
    inputFieldAddFormSubtasksBtnsRef.classList.add('d_none');
    removeHighlightInputFields();
    inputFieldRef.classList.add('add-task-inputfield-highlight');
    switchHighlightInputFields(activeInputField, inputFieldAddFormSubtasksBtnsRef, inputFieldAddFormCalenderSvgRef);
}

/**
 * Clears the entire add task form and resets all states
 * Resets form inputs, global variables, and UI elements to default state
 */
function clearForm() {
    let formRef = document.getElementById('add_task_form');
    let inputFieldAddFormCalenderSvgRef = document.getElementById('add_task_due_date_label_placeholder_svg');
    formRef.reset();
    activatePriority();
    resetGlobalVariables();
    inputFieldAddFormCalenderSvgRef.classList.remove('d_none');
    renderCurrentAssignedTo();
    renderCurrentCreatedSubtasks();
}

/**
 * Removes highlight styling from all input fields and textareas
 * Resets the visual state of all form input elements
 */
function removeHighlightInputFields() {
    document.querySelectorAll('.add-task-form input').forEach(el => el.classList.remove('add-task-inputfield-highlight'));
    document.querySelectorAll('.add-task-form textarea').forEach(el => el.classList.remove('add-task-inputfield-highlight'));
}

function checkRequiredInputs(currentElement) {
    let titleRef = document.getElementById('add_task_title');
    let dueDateRef = document.getElementById('add_task_due_date');
    let categoryRef = document.getElementById('add_task_category');
    const { requiredTitleRef, requiredDueDateRef, requiredCategoryRef } = takeRequiredMsgRefs();
    removeRequiredMsgByLenght(currentElement, titleRef, dueDateRef, categoryRef, requiredTitleRef, requiredDueDateRef, requiredCategoryRef);
}

function removeRequiredMsgByLenght(currentElement, titleRef, dueDateRef, categoryRef, requiredTitleRef, requiredDueDateRef, requiredCategoryRef) {
     switch (currentElement) {
        case 'add_task_title':
            if (titleRef.value.length > 0) {
                requiredTitleRef.classList.add('d_none');
            }
            break;
        case 'add_task_due_date':
            if (dueDateRef.value.length > 0) {
                requiredDueDateRef.classList.add('d_none');
            }
            
            break;
        case 'add_task_category':
            if (categoryRef.value.length > 0) {
                requiredCategoryRef.classList.add('d_none');
            }
            break;

        default:
            break;
    }
}