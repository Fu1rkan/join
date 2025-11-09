/**
 * Opens the task editing overlay with current task data
 * Creates a deep copy of the task for editing and renders the edit form with current values
 * @param {number} id - The ID of the task to edit
 */
function openEditTaskOverlay(id) {
    let task = taskList.find(t => t['id'] == id);
    taskEditor = structuredClone(task);
    document.getElementById('task-dialog').innerHTML = taskEditOverlayTemp(task);
    document.getElementById('change-title').value = task.name;
    if (task.description != false) {
        document.getElementById('change-desc').value = task.description;
    }
    document.getElementById('input-date').value = task.date;
    checkPriorityStatus(task);
    renderParticipantLogos(task);
    renderContactList(contacts);
    renderSubtaskList(task);
}

/**
 * Closes the task editing overlay and returns to task detail view
 * Resets the task editor and displays the original task overlay
 * @param {number} id - The ID of the task being edited
 */
function closeEditTaskOverlay(id) {
    let task = taskList.find(t => t['id'] == id);
    taskEditor = undefined;

    document.getElementById('task-dialog').innerHTML = taskOverlayTemp(task);
    checkTaskOverlayInfos(task);
}

/**
 * Validates the task title input field and shows error styling if empty
 * Adds red border and shows error message for empty title field
 */
function ckeckTitleValue() {
    let title = document.getElementById('change-title');
    let titleValue = title.value;
    if (titleValue.length <= 0) {
        title.classList.add('bo_c_r');
        document.getElementById('empty-title-text').classList.remove('d_none');
    } else {
        title.classList.remove('bo_c_r');
        document.getElementById('empty-title-text').classList.add('d_none');
    }
}

/**
 * Validates the task date input field and shows error styling if empty
 * Adds red border and shows error message for empty date field
 */
function ckeckDateValue() {
    let date = document.getElementById('input-date').value;
    if (date.length <= 0) {
        document.getElementById('change-date').classList.add('bo_c_r');
        document.getElementById('empty-date-text').classList.remove('d_none');
    } else {
        document.getElementById('change-date').classList.remove('bo_c_r');
        document.getElementById('empty-date-text').classList.add('d_none');
    }
}

/**
 * Sets the visual state of priority buttons based on task priority
 * Highlights the active priority button and sets appropriate colors
 * @param {Object} task - The task object containing priority information
 */
function checkPriorityStatus(task) {
    if (task.priority.includes('urgent')) {
        changePrioButtonColor('urgent', 'bc_r');
    } else if (task.priority.includes('medium')) {
        changePrioButtonColor('medium', 'bc_o');
    } else {
        changePrioButtonColor('low', 'bc_g');
    }
}


function changePrioButtonColor(prio, color) {
    document.getElementById(`prio-${prio}`).classList.add(`${color}`);
    document.getElementById(`${prio}-path`).style.fill = 'white';
    document.getElementById(`${prio}-path-2`).style.fill = 'white';
}

/**
 * Resets all priority buttons to their default visual state
 * Removes active styling and restores default colors for all priority buttons
 */
function resetPriority() {
    document.getElementById(`prio-urgent`).classList.remove('bc_r');
    document.getElementById(`urgent-path`).style.fill = '#FF3D00';
    document.getElementById(`urgent-path-2`).style.fill = '#FF3D00';
    document.getElementById(`prio-medium`).classList.remove('bc_o');
    document.getElementById(`medium-path`).style.fill = '#FFA800';
    document.getElementById(`medium-path-2`).style.fill = '#FFA800';
    document.getElementById(`prio-low`).classList.remove('bc_g');
    document.getElementById(`low-path`).style.fill = '#7AE229';
    document.getElementById(`low-path-2`).style.fill = '#7AE229';
}

/**
 * Changes the priority of the task being edited
 * Updates the task editor priority and refreshes the priority button display
 * @param {string} prioType - The new priority type ('urgent', 'medium', or 'low')
 */
function changePriority(prioType) {
    taskEditor.priority = prioType;
    resetPriority();
    checkPriorityStatus(taskEditor);
}

/**
 * Renders participant avatars in the edit task overlay
 * Displays up to 4 participant logos and shows additional count if more participants exist
 * @param {Object} task - The task object containing participants information
 */
function renderParticipantLogos(task) {
    document.getElementById('included-participants').innerHTML = "";
    if (task.participants != false) {
        let inclContacts = contacts.filter(c => task.participants.some(p => p.name === c.name));
        for (let index = 0; index < task.participants.length; index++) {
            if (index < 4) {
                document.getElementById('included-participants').innerHTML += participantLogoTemp(inclContacts[index]);
            } else {
                document.getElementById(`included-participants`).innerHTML += moreParticipantsEditTaskTemp(inclContacts.length - 4);
                break
            }
        }
    }
}

/**
 * Renders the contact list in the edit task overlay
 * Displays all available contacts with their selection status or shows no contacts message
 * @param {Array} contacts - Array of contact objects to render
 */
function renderContactList(contacts) {
    if (contacts.length > 0) {
        document.getElementById('participants-list').innerHTML = "";
        for (let index = 0; index < contacts.length; index++) {
            document.getElementById('participants-list').innerHTML += renderContactsTemp(contacts[index], index);
            checkContactStatus(contacts[index].name, index);
        }
    } else {
        document.getElementById('participants-list').innerHTML = noContactsTemp();
    }
}

/**
 * Checks and sets the selection status of a contact in the edit overlay
 * Highlights selected contacts and shows checkmark for already assigned participants
 * @param {string} contactIndex - The name of the contact to check
 * @param {number} index - The index of the contact in the contacts array
 */
function checkContactStatus(contactIndex, index) {
    if (taskEditor.participants != false) {
        let task = taskEditor.participants.find(t => t['name'] == contactIndex);
        if (task) {
            document.getElementById(`contact-layout-${index}`).classList.add('bgc_j');
            document.getElementById(`check-contact-as-participant-${index}`).innerHTML = checkParticipantTemp();
        }
    } else {
        taskEditor.participants = [];
    }
}

/**
 * Renders the subtask list in the edit task overlay
 * Displays all subtasks for editing or initializes empty subtasks array
 * @param {Object} task - The task object containing subtasks information
 */
function renderSubtaskList(task) {
    document.getElementById('change-subtasks-list').innerHTML = "";
    if (task.subtasks != false) {
        for (let index = 0; index < taskEditor.subtasks.length; index++) {
            document.getElementById('change-subtasks-list').innerHTML += renderSubtasksTemp(index);
        }
    } else {
        taskEditor.subtasks = [];
    }
}

/**
 * Toggles a contact's participation status in the task being edited
 * Adds or removes contact from participants list and updates visual state
 * @param {number} index - The index of the contact in the contacts array
 */
function putContactAsParticipant(index) {
    const contactLayout = document.getElementById(`contact-layout-${index}`).classList;
    if (!contactLayout.contains('bgc_j')) {
        contactLayout.add('bgc_j');
        document.getElementById(`check-contact-as-participant-${index}`).innerHTML = checkParticipantTemp();
        taskEditor.participants.push({ 'name': `${contacts[index].name}` });
    } else {
        contactLayout.remove('bgc_j');
        document.getElementById(`check-contact-as-participant-${index}`).innerHTML = subtaskToDoTemp();
        let participant = taskEditor.participants.findIndex(p => p.name === `${contacts[index].name}`);
        taskEditor.participants.splice(participant, 1);
    }
    renderParticipantLogos(taskEditor);
}

/**
 * Searches and filters contacts based on search input
 * Filters contacts by name and renders filtered results in the contact list
 */
function searchContact() {
    let word = document.getElementById('serchbar-edit-contacts').value;
    if (word.length > 1) {
        let list = contacts.filter(c => c.name.toLowerCase().includes(word.toLowerCase()))
        renderContactList(list);
        openContactList();
    } else {
        renderContactList(contacts);
    }
}

/**
 * Toggles the visibility of the contact list dropdown in edit overlay
 * Shows or hides the contact selection dropdown and rotates the arrow indicator
 */
function toggleContactList() {
    document.getElementById('change-participants-button').classList.toggle('tf_r180');
    document.getElementById('participants-list').classList.toggle('d_none');
}

/**
 * Opens the contact list dropdown in edit overlay
 * Shows the contact selection dropdown and rotates the arrow to up position
 */
function openContactList() {
    document.getElementById('change-participants-button').classList.add('tf_r180');
    document.getElementById('participants-list').classList.remove('d_none');
}

/**
 * Activates edit mode for a specific subtask
 * Shows edit input field, focuses on it, and sets up click handler for accepting changes
 * @param {number} index - The index of the subtask to edit
 * @param {string} subtask - The current subtask name/text
 */
function activeEditTask(index, subtask) {
    setTimeout(() => {
        document.getElementById(`edit-subtask-${index}`).classList.remove('d_none');
        document.getElementById(`edit-subtask-input-${index}`).value = subtask;
        document.getElementById(`edit-subtask-input-${index}`).focus();
        document.getElementById(`subtask-span-${index}`).classList.toggle('d_none');
        document.getElementById(`subtask-edit-${index}`).classList.toggle('d_none');
        document.getElementById(`change-subtasks-${index}`).classList.toggle('change-subtasks-active');
        setTimeout(() => {
            document.body.setAttribute('onclick', `acceptEditedTask(${index})`);
        }, 100)
    }, 50)
}

/**
 * Accepts and saves the edited subtask changes
 * Updates the subtask name or deletes it if empty, then re-renders the subtask list
 * @param {number} index - The index of the subtask being edited
 */
function acceptEditedTask(index) {
    let newSubtask = document.getElementById(`edit-subtask-input-${index}`).value;
    if (newSubtask.length > 0) {
        taskEditor.subtasks[index].name = newSubtask;
        renderSubtaskList(taskEditor);
    } else {
        deleteSubtask(index);
    }
    document.body.removeAttribute('onclick');
}

/**
 * Deletes a subtask from the task being edited
 * Removes the subtask from the array and re-renders the subtask list
 * @param {number} index - The index of the subtask to delete
 */
function deleteSubtask(index) {
    setTimeout(() => {
        taskEditor.subtasks.splice(index, 1);
        renderSubtaskList(taskEditor);
        document.body.removeAttribute('onclick');
    }, 50)
}

/**
 * Clears the new subtask input field
 * Resets the input field value to empty string
 */
function clearInputField() {
    document.getElementById('new-subtask-input').value = "";
}

/**
 * Adds a new subtask to the task being edited
 * Creates a new subtask from input value or shows error styling if empty
 */
function pushSubtask() {
    let newSubtask = document.getElementById('new-subtask-input').value;
    if (newSubtask.length > 0) {
        taskEditor.subtasks.push({ name: `${newSubtask}`, status: false });
        renderSubtaskList(taskEditor);
        clearInputField();
        const overlay = document.getElementById(`task-main-overlay-${taskEditor.id}`);
    } else {
        document.getElementById('add-subtasks').classList.add('empty-subtask-input');
        document.getElementById('new-subtask-input').classList.add('empty-subtask-input');
        document.getElementById('new-subtask-input').placeholder = 'This field is required';
    }
}

/**
 * Resets the subtask input field placeholder and error styling
 * Removes error styling and restores default placeholder text
 */
function resetPlaceholderSubtask() {
    document.getElementById('add-subtasks').classList.remove('empty-subtask-input');
    document.getElementById('new-subtask-input').classList.remove('empty-subtask-input');
    document.getElementById('new-subtask-input').placeholder = 'Add new Subtasks';
}

/**
 * Saves the edited task to the database and updates the UI
 * Validates required fields, updates the task in the list, and refreshes the board
 * @param {number} index - The ID of the task being edited
 * @returns {Promise<void>} Promise that resolves when task is saved and board is updated
 */
function pushEditedTaskToJSON(index) {
    taskEditor.name = document.getElementById('change-title').value
    taskEditor.description = document.getElementById('change-desc').value
    taskEditor.date = document.getElementById('input-date').value
    let date = document.getElementById('input-date').value;
    let title = document.getElementById('change-title').value;
    if (title.length <= 0 || date.length <= 0) {
        const overlay = document.getElementById(`task-main-overlay-${taskEditor.id}`);
        overlay.scrollTop = 0;
    } else {
        pushToFirebase(index);
    }
}

function checkEmptyArrays() {
    if (!taskEditor.subtasks.length > 0) {
        taskEditor.subtasks = false;
    }
    if (!taskEditor.participants.length > 0) {
        taskEditor.participants = false;
    }
}

async function pushToFirebase(index) {
    checkEmptyArrays();
    let task = taskList.findIndex(t => t['id'] == index);
    taskList[task] = taskEditor;
    toggleTaskOverlay(task);
    toggleTaskOverlay(task);
    await putTask(taskList);
    await boardInit();
}