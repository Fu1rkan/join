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

function removeRequiredMsgByLenght(currentElement, titleRef, dueDateRef, categoryRef, requiredTitleRef, requiredDueDateRef, requiredCategoryRef) {
    switch (currentElement) {
        case 'add_task_title':
            showOrHideRequiredMsgTitle(titleRef, requiredTitleRef);
            break;
        case 'add_task_due_date':
            showOrHideRequiredMsgDueDate(dueDateRef, requiredDueDateRef);
            break;
        case 'add_task_category':
            showOrHideRequiredMsgCategory(categoryRef, requiredCategoryRef);
            break;
        default:
            break;
    }
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