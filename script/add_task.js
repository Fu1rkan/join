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
 * Selects or deselects a contact for task assignment
 * Toggles the visual selection state and manages the assigned contacts array
 * @param {number} index - The index of the contact in the contacts array to select/deselect
 */
function selectContact(index) {
    let contactRef = document.getElementById(`add_task_assigned_to_contact_${index}`);
    let svgUncheckedRef = document.getElementById(`${index}_unchecked`);
    let svgCheckedRef = document.getElementById(`${index}_checked`);
    contactRef.classList.toggle('add-task-form-assigned-to-dropdown-contacts-default-hover-class');
    contactRef.classList.toggle('add-task-form-assigned-to-dropdown-contacts-checked');
    svgUncheckedRef.classList.toggle('d_none');
    svgCheckedRef.classList.toggle('d_none');
    if (currentAssignedTo.includes(contacts[index])) {
        currentAssignedTo.splice(currentAssignedTo.findIndex(contact => contact.name == contacts[index].name && contact.email == contacts[index].email), 1);
    } else {
        currentAssignedTo.push(contacts[index]);
    }
    renderCurrentAssignedTo();
}

/**
 * Renders the currently assigned contacts in the UI
 * Updates the display section with contact avatars and handles overflow with counter
 */
function renderCurrentAssignedTo() {
    let currentAssignedToSectionRef = document.getElementById('add_task_form_assigned_to_section');
    let currentAssignedToListRef = document.getElementById('current_assigned_to_contacts');
    currentAssignedToSectionRef.classList.remove('h-130');
    currentAssignedToListRef.classList.add('d_none');
    currentAssignedToListRef.innerHTML = "";
    if (currentAssignedTo.length > 0) {
        currentAssignedToSectionRef.classList.add('h-130');
        currentAssignedToListRef.classList.remove('d_none');
        for (let index = 0; index < currentAssignedTo.length && index < 4; index++) {
            currentAssignedToListRef.innerHTML += getCurrentAssignedContactTemplate(index);
        }
        if (currentAssignedTo.length > 4) {
            currentAssignedToListRef.innerHTML += `+${currentAssignedTo.length - 4}`;
        }
    }
}

/**
 * Toggles the visibility of the assigned contacts dropdown list
 * Shows or hides the contact selection dropdown and updates arrow direction
 * Renders contacts in the list when opening the dropdown
 */
function toggleAssignedToContactList() {
    let addTaskAssignedToList = document.getElementById('add_task_form_assigned_to_dropdown_contacts');
    let addTaskAssignedToArrow = document.getElementById('add_task_form_assigned_to_arrow_svg');
    addTaskAssignedToList.classList.toggle('d_none');
    addTaskAssignedToArrow.classList.toggle('add-task-form-assigned-to-arrow-up-svg');
    if (!addTaskAssignedToList.classList.contains('d_none')) {
        renderContactsInList();
    }
}

/**
 * Filters and displays contacts based on input field value
 * Opens the contact dropdown and renders filtered contacts matching the search term
 */
function filterInputValue() {
    let addTaskAssignedToList = document.getElementById('add_task_form_assigned_to_dropdown_contacts');
    let addTaskAssignedToArrow = document.getElementById('add_task_form_assigned_to_arrow_svg');
    addTaskAssignedToList.classList.remove('d_none');
    addTaskAssignedToArrow.classList.add('add-task-form-assigned-to-arrow-up-svg');
    let addTaskAssignedToInputRef = document.getElementById('add_task_assigned_to');
    if (addTaskAssignedToInputRef.value.length > 1) {
        let filtered = contacts.filter((c) => { return c.name.toLowerCase().includes(addTaskAssignedToInputRef.value.toLowerCase()) });
        renderContactsInList(filtered);
    } else {
        renderContactsInList();
    }

}

/**
 * Renders the contacts list in the dropdown with selection states
 * Displays all contacts or filtered contacts with appropriate checked/unchecked states
 * @param {Array} array - Array of contacts to render, defaults to all contacts
 */
function renderContactsInList(array = contacts) {
    const addTaskAssignedToList = document.getElementById('add_task_form_assigned_to_dropdown_contacts');
    addTaskAssignedToList.innerHTML = "";
    if (currentAssignedTo.length === 0) {
        for (let index = 0; index < array.length; index++) {
            addTaskAssignedToList.innerHTML += getAddTaskAssignedToListItem(array, index);
        }
        return;
    }
    renderChangedContaktList(addTaskAssignedToList, array);
}

/**
 * Renders contacts list with proper selection states for already assigned contacts
 * Handles the visual state of contacts that are already selected for assignment
 * @param {HTMLElement} addTaskAssignedToList - Reference to the dropdown container element
 * @param {Array} array - Array of contacts to render, defaults to all contacts
 */
function renderChangedContaktList(addTaskAssignedToList, array = contacts) {
    const activeContactIndices = array
        .map((contact, i) => (currentAssignedTo.includes(contact) ? i : -1))
        .filter(i => i !== -1);

    for (let i = 0; i < array.length; i++) {
        if (activeContactIndices.includes(i)) {
            addTaskAssignedToList.innerHTML += getAddTaskAssignedToListItem(array, i);
            markAsChecked(i);
        } else {
            addTaskAssignedToList.innerHTML += getAddTaskAssignedToListItem(array, i);
        }
    }
}

/**
 * Marks a contact as checked/selected in the dropdown list
 * Updates the visual state to show the contact is currently assigned
 * @param {number} i - The index of the contact to mark as checked
 */
function markAsChecked(i) {
    let contactRef = document.getElementById(`add_task_assigned_to_contact_${i}`);
    let svgUncheckedRef = document.getElementById(`${i}_unchecked`);
    let svgCheckedRef = document.getElementById(`${i}_checked`);
    contactRef.classList.add('add-task-form-assigned-to-dropdown-contacts-checked');
    svgUncheckedRef.classList.add('d_none');
    svgCheckedRef.classList.remove('d_none');
}

/**
 * Toggles the visibility of the category selection dropdown
 * Shows or hides the category list and updates arrow direction indicator
 */
function toggleCategoryList() {
    let addTaskCategoryListRef = document.getElementById('add_task_form_category_dropdown_category');
    let addTaskCategoryArrowRef = document.getElementById('add_task_form_category_arrow_svg');
    addTaskCategoryListRef.classList.toggle('d_none');
    addTaskCategoryArrowRef.classList.toggle('add-task-form-assigned-to-arrow-up-svg');
}

/**
 * Selects a category for the task and closes the dropdown
 * Updates the category input field and stores the selected category
 * @param {string} categoryName - The name of the category to select
 */
function chooseCategory(categoryName) {
    let addTaskCategoryInputRef = document.getElementById('add_task_category');
    toggleCategoryList();
    addTaskCategoryInputRef.value = categoryName;
    currentChoosedCategory = categoryName;
}

/**
 * Renders the list of current subtasks in the UI
 * Displays all subtasks with edit and delete options
 */
function renderSubtasks() {
    let subtasksListRef = document.getElementById('current_subtasks_list');
    subtasksListRef.innerHTML = "";
    for (let index = 0; index < currentSubtasks.length; index++) {
        subtasksListRef.innerHTML += getCurrentSubtaskTemplate(index);
    }
}

/**
 * Shows the menu options for a specific subtask
 * Displays edit and delete buttons for the selected subtask
 * @param {number} index - The index of the subtask to show options for
 */
function showSubtaskMenuOptions(index) {
    for (let i = 0; i < currentCreatedSubtasks.length; i++) {
        closeSubtaskMenuOptions(i);
    }
    setTimeout(() => {
        let subtaskListItemRef = document.getElementById(`current_subtask_li_${index}`);
        let currentSubtaskRoughMenuRef = document.getElementById(`current_subtask_rough_menu_btns${index}`);
        document.body.setAttribute('onclick', `closeSubtaskMenuOptions(${index})`)
        if (currentSubtaskRoughMenuRef != undefined || subtaskListItemRef != undefined) {
            subtaskListItemRef.classList.add('list-style-none');
            currentSubtaskRoughMenuRef.classList.remove('d_none');
        }
    }, 50);
}

function closeSubtaskMenuOptions(index) {
    if (currentCreatedSubtasks.length > 0) {
        let subtaskListItemRef = document.getElementById(`current_subtask_li_${index}`);
        let currentSubtaskRoughMenuRef = document.getElementById(`current_subtask_rough_menu_btns${index}`);
        currentSubtaskRoughMenuRef.classList.add('d_none');
        subtaskListItemRef.classList.remove('list-style-none');
    }
    document.body.removeAttribute('onclick');
}

/**
 * Switches a subtask to edit mode for modification
 * Shows the input field and hides the display text for editing
 * @param {number} index - The index of the subtask to change
 */
function changeCurrentSubtask(index) {
    for (let i = 0; i < currentCreatedSubtasks.length; i++) {
        closeCurrentSubtask(i);
    }
    setTimeout(() => {
        let subtaskListItemRef = document.getElementById(`current_subtask_li_${index}`);
        let currentSubtaskValue = document.getElementById(`current_subtask_${index}`);
        let currentSubtaskChangeLabelRef = document.getElementById(`label_current_subtask_${index}`);
        let currentSubtaskChangeinputRef = document.getElementById(`change_current_element_${index}`);
        let currentSubtaskRoughMenuRef = document.getElementById(`current_subtask_rough_menu_btns${index}`);
        currentSubtaskRoughMenuRef.classList.toggle('d_none');
        subtaskListItemRef.classList.toggle('list-style-none');
        subtaskListItemRef.classList.toggle('add-task-form-subtasks-dropdown-subtasks-list-item');
        currentSubtaskValue.classList.toggle('d_none');
        currentSubtaskChangeLabelRef.classList.toggle('d_none');
        currentSubtaskChangeinputRef.value = currentSubtaskValue.innerText;
        document.getElementById(`current_subtask_style_${index}`).classList.add('d_none');
        currentSubtaskChangeinputRef.focus();
        setTimeout(() => {
            document.body.setAttribute('onclick', `closeCurrentSubtask(${index})`);
        }, 50);
    }, 50);
}

function closeCurrentSubtask(index) {
    document.getElementById(`current_subtask_li_${index}`).classList.remove('list-style-none');
    document.getElementById(`current_subtask_li_${index}`).classList.add('add-task-form-subtasks-dropdown-subtasks-list-item');
    document.getElementById(`current_subtask_${index}`).classList.remove('d_none');
    document.getElementById(`label_current_subtask_${index}`).classList.add('d_none');
    document.getElementById(`current_subtask_style_${index}`).classList.remove('d_none');
    document.body.removeAttribute('onclick');
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
 * Removes highlight styling from all input fields and textareas
 * Resets the visual state of all form input elements
 */
function removeHighlightInputFields() {
    document.querySelectorAll('.add-task-form input').forEach(el => el.classList.remove('add-task-inputfield-highlight'));
    document.querySelectorAll('.add-task-form textarea').forEach(el => el.classList.remove('add-task-inputfield-highlight'));
}

/**
 * Resets the subtasks input field to empty state
 * Clears the input field value for creating new subtasks
 * @param {string} activeInputField - The ID of the subtasks input field, defaults to 'add_task_subtasks'
 */
function resetAddTaskSubtasksInputField(activeInputField = "add_task_subtasks") {
    let subtasksInputField = document.getElementById(activeInputField);
    subtasksInputField.value = "";
}

/**
 * Creates a new subtask from the input field value
 * Adds a new subtask to the current list and updates the display
 * @param {string} activeInputField - The ID of the subtasks input field, defaults to 'add_task_subtasks'
 */
function setSubtask(activeInputField = "add_task_subtasks") {
    let subtasksInputField = document.getElementById(activeInputField);
    if (subtasksInputField.value.length > 0) {
        currentCreatedSubtasks.push(
            {
                "name": subtasksInputField.value,
                "status": false
            }
        );
        resetAddTaskSubtasksInputField();
        renderCurrentCreatedSubtasks();
    }

}

/**
 * Renders the list of currently created subtasks in the dropdown
 * Updates the UI to display all created subtasks with edit and delete options
 */
function renderCurrentCreatedSubtasks() {
    let subtasksContentList = document.getElementById('add_task_form_subtasks_dropdown_subtasks');
    subtasksContentList.innerHTML = "";
    for (let index = 0; index < currentCreatedSubtasks.length; index++) {
        subtasksContentList.innerHTML += getSubtaskTemplate(index);
    }
}

/**
 * Deletes a subtask from the current list
 * Removes the specified subtask and updates the display
 * @param {number} index - The index of the subtask to delete
 */
function deleteCurrentSubtask(index) {
    currentCreatedSubtasks.splice(index, 1);
    renderCurrentCreatedSubtasks();
    // resetSubtaskList();
}

/**
 * Resets the subtask list UI elements (currently unused)
 * Placeholder function for potential future subtask list reset functionality
 */
function resetSubtaskList() {
    // document.querySelectorAll('.add-task-form-subtasks-dropdown-subtasks-btns').forEach(el => el.classList.add('d_none'));
}

/**
 * Saves changes made to a subtask being edited
 * Updates the subtask name and re-renders the subtasks list
 * @param {number} index - The index of the subtask to save changes for
 */
function saveChangedSubtask(index) {
    let subtaskListRef = document.getElementById('add_task_form_subtasks_dropdown_subtasks');
    let inputChangedSubtaskRef = document.getElementById(`change_current_element_${index}`);
    currentCreatedSubtasks[index].name = inputChangedSubtaskRef.value;
    subtaskListRef.classList.remove('list-style-none');
    renderCurrentCreatedSubtasks();
    // resetSubtaskList();
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
 * Creates a new task object and adds it to the task list
 * Builds the task object with form data and resets variables after creation
 * @param {HTMLElement} titleRef - Reference to the title input element
 * @param {HTMLElement} descriptionRef - Reference to the description textarea element
 * @param {HTMLElement} dueDateRef - Reference to the due date input element
 * @param {string} paraOverlay - Optional parameter indicating overlay context, defaults to empty string
 */
function pushNewObject(titleRef, descriptionRef, dueDateRef, progress, fromBoard) {
    document.getElementById('task-added-overlay-board').classList.remove('d_none');
    setTimeout(() => {
        pushTaskList(titleRef, descriptionRef, dueDateRef, progress);
        resetGlobalVariables();
        putTaskAndShowCreatedMsg(fromBoard);
    }, 500)
}


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
async function putTaskAndShowCreatedMsg(fromBoard) {
    if (fromBoard !== undefined) {
        await putTask(taskList);
        toggleAddTaskOverlay(true);
        boardInit();
    } else {
        await putTask(taskList);
        showTaskCreatedMsg();
    }

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
    renderCurrentAssignedTo()
    renderCurrentCreatedSubtasks()
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