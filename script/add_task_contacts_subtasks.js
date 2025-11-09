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
 * Deletes a subtask from the current list
 * Removes the specified subtask and updates the display
 * @param {number} index - The index of the subtask to delete
 */
function deleteCurrentSubtask(index) {
    currentCreatedSubtasks.splice(index, 1);
    renderCurrentCreatedSubtasks();
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
 * Toggles the visibility of the category selection dropdown
 * Shows or hides the category list and updates arrow direction indicator
 */
function toggleCategoryList() {
    let addTaskCategoryListRef = document.getElementById('add_task_form_category_dropdown_category');
    let addTaskCategoryArrowRef = document.getElementById('add_task_form_category_arrow_svg');
    addTaskCategoryListRef.classList.toggle('d_none');
    addTaskCategoryArrowRef.classList.toggle('add-task-form-assigned-to-arrow-up-svg');
}

function closeSubtaskMenuOptions(index){
    if (currentCreatedSubtasks.length > 0) {
        let subtaskListItemRef = document.getElementById(`current_subtask_li_${index}`);
        let currentSubtaskRoughMenuRef = document.getElementById(`current_subtask_rough_menu_btns${index}`);
        currentSubtaskRoughMenuRef.classList.add('d_none');
        subtaskListItemRef.classList.remove('list-style-none');
    }
    document.body.removeAttribute('onclick');
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