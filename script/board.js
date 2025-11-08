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
function renderTasks() {
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
 * Toggles the task detail overlay visibility and manages overlay state
 * Opens or closes task overlay, renders task details, and manages body scroll
 * @param {number} i - The ID of the task to display in the overlay
 */
function toggleTaskOverlay(i) {
    document.getElementById('bleur-bg').classList.toggle('d_none');
    document.getElementById('task-dialog').classList.toggle('tf_tlx100');
    document.body.classList.toggle('of_hidden');
    if (checkOverlay == 0) {
        let task = taskList.find(t => t['id'] == i);
        document.getElementById('task-dialog').innerHTML = taskOverlayTemp(task);
        checkTaskOverlayInfos(task);
        checkOverlay += 1;
    } else {
        checkOverlay = 0;
        taskEditor = undefined;
        renderTasks();
    }
}

/**
 * Checks and applies all task information to the task card display
 * Orchestrates the display of task type, description, progress, participants, and priority
 * @param {Object} i - The task object containing all task information
 */
function checkTaskInfos(i) {
    const taskCard = 'task-card';
    checkTaskType(i, taskCard);
    checkTaskDesc(i, taskCard);
    checkProgress(i, taskCard);
    checkParticipants(i, taskCard);
    checkPrio(i, taskCard);
}

/**
 * Sets the background color of the task type indicator based on task type
 * Applies blue color for User Story tasks and teal for Technical Task
 * @param {Object} i - The task object containing type information
 * @param {string} taskCard - The CSS class prefix for the task card elements
 */
function checkTaskType(i, taskCard) {
    if (i.type.includes('User')) {
        document.getElementById(`${taskCard}-type-${i.id}`).style.backgroundColor = 'rgba(0, 56, 255, 1)';
    } else {
        document.getElementById(`${taskCard}-type-${i.id}`).style.backgroundColor = 'rgba(31, 215, 193, 1)';
    }
}

/**
 * Displays the task description in the task card if available
 * Adds the task description text to the description element
 * @param {Object} i - The task object containing description information
 * @param {string} taskCard - The CSS class prefix for the task card elements
 */
function checkTaskDesc(i, taskCard) {
    if (i.description != false) {
        document.getElementById(`${taskCard}-desc-${i.id}`).innerText += i.description;
    }
}

/**
 * Displays subtask progress bar in the task card if subtasks exist
 * Calculates completed subtasks and renders progress bar template
 * @param {Object} i - The task object containing subtasks information
 * @param {string} taskCard - The CSS class prefix for the task card elements
 */
function checkProgress(i, taskCard) {
    if (i.subtasks != false) {
        let trueCount = i.subtasks.filter(s => s.status === true).length;
        document.getElementById(`${taskCard}-subtasks-${i.id}`).innerHTML = progressTemp(i.subtasks.length, trueCount);
    }
}

/**
 * Displays participant avatars in the task card if participants exist
 * Shows up to 3 participant avatars and a "+more" indicator for additional participants
 * @param {Object} i - The task object containing participants information
 * @param {string} taskCard - The CSS class prefix for the task card elements
 */
function checkParticipants(i, taskCard) {
    if (i.participants != false) {
        let inclContacts = contacts.filter(c => i.participants.some(p => p.name === c.name));
        for (let index = 0; index < i.participants.length; index++) {
            if (index < 3) {
                document.getElementById(`${taskCard}-participants-${i.id}`).innerHTML += participantsTemp(inclContacts[index])
            } else {
                document.getElementById(`${taskCard}-participants-${i.id}`).innerHTML += moreParticipantsTemp()
                break
            }
        }
    }
}

/**
 * Displays the appropriate priority icon in the task card
 * Shows urgent, medium, or low priority icon based on task priority level
 * @param {Object} i - The task object containing priority information
 * @param {string} taskCard - The CSS class prefix for the task card elements
 */
function checkPrio(i, taskCard) {
    if (i.priority.includes('urgent')) {
        document.getElementById(`${taskCard}-prio-${i.id}`).innerHTML = urgentPrioTemp();
    } else if (i.priority.includes('medium')) {
        document.getElementById(`${taskCard}-prio-${i.id}`).innerHTML = mediumPrioTemp();
    } else {
        document.getElementById(`${taskCard}-prio-${i.id}`).innerHTML = lowPrioTemp();
    }
}

/**
 * Displays subtask names in the main overlay (currently unused function)
 * Appends all subtask names to the task progress element
 * @param {Object} task - The task object containing subtasks
 * @param {HTMLElement} taskProgress - The element to display subtask progress
 */
function checkSubtasksMainOverlay(task, taskProgress) {
    for (let index = 0; index < task.subtasks.length; index++) {
        taskProgress.innerText += task.subtasks[index].name;
    }
}

/**
 * Checks and applies all task information to the task overlay display
 * Orchestrates the display of task details in the overlay including type, description, priority, participants, and subtasks
 * @param {Object} i - The task object containing all task information
 */
function checkTaskOverlayInfos(i) {
    const taskOverlay = 'task-overlay';
    checkTaskType(i, taskOverlay);
    checkTaskDesc(i, taskOverlay);
    checkTaskDate(i);
    checkTaskOverlayPrio(i, taskOverlay);
    checkTaskOverlayParticipants(i, taskOverlay);
    checkTaskOverlaySubtasks(i, taskOverlay);
}


function checkTaskDate(i) {
    let [year, month, day] = i.date.split('-');
    document.getElementById('task-date').innerHTML = `${day}/${month}/${year}`
}

/**
 * Displays the priority information in the task overlay
 * Shows priority level with appropriate icon and styling in the overlay
 * @param {Object} i - The task object containing priority information
 * @param {string} taskOverlay - The CSS class prefix for the task overlay elements
 */
function checkTaskOverlayPrio(i, taskOverlay) {
    if (i.priority.includes('urgent')) {
        document.getElementById(`${taskOverlay}-prio-${i.id}`).innerHTML = prioTaskOverlayTemp(i, urgentPrioTemp());
    } else if (i.priority.includes('medium')) {
        document.getElementById(`${taskOverlay}-prio-${i.id}`).innerHTML = prioTaskOverlayTemp(i, mediumPrioTemp());
    } else {
        document.getElementById(`${taskOverlay}-prio-${i.id}`).innerHTML = prioTaskOverlayTemp(i, lowPrioTemp());
    }
}

/**
 * Displays participant information in the task overlay
 * Shows participant section and renders all assigned participants with their details
 * @param {Object} i - The task object containing participants information
 * @param {string} taskOverlay - The CSS class prefix for the task overlay elements
 */
function checkTaskOverlayParticipants(i, taskOverlay) {
    if (i.participants != false) {
        document.getElementById(`${taskOverlay}-participants-${i.id}`).innerHTML += participantsTaskOverlayTemp(i)
        let inclContacts = contacts.filter(c => i.participants.some(p => p.name === c.name));
        for (let index = 0; index < i.participants.length; index++) {
            document.getElementById(`participants-list-${i.id}`).innerHTML += participantTemp(inclContacts[index]);
        }
    }
}

/**
 * Displays subtask information in the task overlay
 * Shows subtasks section and renders all subtasks with their completion status
 * @param {Object} i - The task object containing subtasks information
 * @param {string} taskOverlay - The CSS class prefix for the task overlay elements
 */
function checkTaskOverlaySubtasks(i, taskOverlay) {
    if (i.subtasks != false) {
        document.getElementById(`${taskOverlay}-subtasks-${i.id}`).innerHTML = "";
        document.getElementById(`${taskOverlay}-subtasks-${i.id}`).innerHTML += subtasksTaskOverlay(i);
        for (let index = 0; index < i.subtasks.length; index++) {
            if (i.subtasks[index].status == true) {
                document.getElementById(`subtasks-list-${i.id}`).innerHTML += subtaskListTemp(i, index, subtaskDoneTemp());
            } else {
                document.getElementById(`subtasks-list-${i.id}`).innerHTML += subtaskListTemp(i, index, subtaskToDoTemp());
            }
        }
    }
}

/**
 * Deletes a task from the task list and updates the database
 * Removes the task from the array, closes overlay, and reinitializes the board
 * @param {number} i - The ID of the task to delete
 * @returns {Promise<void>} Promise that resolves when task is deleted and board is updated
 */
async function deleteTask(i) {
    let task = taskList.findIndex(t => t['id'] == i);
    taskList.splice(task, 1);
    toggleTaskOverlay(i);
    await putTask(taskList);
    await boardInit();
}

/**
 * Toggles the completion status of a subtask
 * Switches subtask status between completed and pending and updates the overlay display
 * @param {number} i - The ID of the task containing the subtask
 * @param {number} index - The index of the subtask to toggle
 */
function toggleSubtaskStatus(i, index) {
    let task = taskList.findIndex(t => t['id'] == i);
    if (taskList[task].subtasks[index].status == true) {
        taskList[task].subtasks[index].status = false;

    } else {
        taskList[task].subtasks[index].status = true;
    }
    checkTaskOverlaySubtasks(taskList[task], 'task-overlay')
}

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
        document.getElementById(`prio-urgent`).classList.add('bc_r');
        document.getElementById(`urgent-path`).style.fill = 'white';
        document.getElementById(`urgent-path-2`).style.fill = 'white';
    } else if (task.priority.includes('medium')) {
        document.getElementById(`prio-medium`).classList.add('bc_o');
        document.getElementById(`medium-path`).style.fill = 'white';
        document.getElementById(`medium-path-2`).style.fill = 'white';
    } else {
        document.getElementById(`prio-low`).classList.add('bc_g');
        document.getElementById(`low-path`).style.fill = 'white';
        document.getElementById(`low-path-2`).style.fill = 'white';
    }
}
//Bin unzufrieden damit... Wird optimiert, bald..

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
        renderParticipantLogos(taskEditor);
    } else {
        contactLayout.remove('bgc_j');
        document.getElementById(`check-contact-as-participant-${index}`).innerHTML = subtaskToDoTemp();
        let participant = taskEditor.participants.findIndex(p => p.name === `${contacts[index].name}`);
        taskEditor.participants.splice(participant, 1);
        renderParticipantLogos(taskEditor);
    }
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
        overlay.scrollTop = overlay.scrollHeight;
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
async function pushEditedTaskToJSON(index) {
    taskEditor.name = document.getElementById('change-title').value
    taskEditor.description = document.getElementById('change-desc').value
    taskEditor.date = document.getElementById('input-date').value
    let date = document.getElementById('input-date').value;
    let title = document.getElementById('change-title').value;
    if (title.length <= 0 || date.length <= 0) {
        const overlay = document.getElementById(`task-main-overlay-${taskEditor.id}`);
        overlay.scrollTop = 0;
    } else {
        if (!taskEditor.subtasks.length > 0) {
            taskEditor.subtasks = false;
        }
        if (!taskEditor.participants.length > 0) {
            taskEditor.participants = false;
        }
        let task = taskList.findIndex(t => t['id'] == index);
        taskList[task] = taskEditor;
        toggleTaskOverlay(task);
        toggleTaskOverlay(task);
        await putTask(taskList);
        await boardInit();
    }
}

/**
 * Searches and filters tasks based on search input
 * Hides tasks that don't match the search term in their name
 */
function searchtasks() {
    let input = document.getElementById('search-bar');
    let inputValue = input.value;
    let tasks = taskList.filter(t => !t.name.toLowerCase().includes(inputValue.toLowerCase()));
    let tasksResult = taskList.filter(t => t.name.toLowerCase().includes(inputValue.toLowerCase()));

    if (inputValue.length > 0) {
        if (tasks.length !== taskList.length) {
            for (let index = 0; index < tasks.length; index++) {
                document.getElementById(`task-id-${tasks[index].id}`).classList.add('d_none');
            }
            for (let index = 0; index < ids.length; index++) {
                let taskCategory = tasksResult.filter(c => c.category == ids[index]);
                if (taskCategory.length === 0) {
                    document.getElementById(`${ids[index]}-kanban`).innerHTML = emptyTaskList(`${ids[index]}`);
                }
            }
        } else {
            document.getElementById('to-do-kanban').innerHTML = emptyTaskList('To do');
            document.getElementById('in-progress-kanban').innerHTML = emptyTaskList('In progress');
            document.getElementById('await-feedback-kanban').innerHTML = emptyTaskList('Await feedback');
            document.getElementById('done-kanban').innerHTML = emptyTaskList('Done');
        }
    } else {
        input.placeholder = 'This field is required';
        input.classList.add('empty-input');
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
    if (inputValue.length < 6) {
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
    if (taskList[task].category == "to-do") {
        document.getElementById(`switch-up-button-${i}`).classList.add('d_none');
        document.getElementById(`switch-down-${i}`).innerHTML = 'In progress';
    } else if (taskList[task].category == "done") {
        document.getElementById(`switch-down-button-${i}`).classList.add('d_none');
        document.getElementById(`switch-up-${i}`).innerHTML = 'Await feedback';
    } else if (taskList[task].category == "in-progress") {
        document.getElementById(`switch-down-${i}`).innerHTML = 'Await feedback';
        document.getElementById(`switch-up-${i}`).innerHTML = 'To do';
    } else {
        document.getElementById(`switch-up-${i}`).innerHTML = 'In progress';
        document.getElementById(`switch-down-${i}`).innerHTML = 'done';
    }
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
function switchDown(i) {
    let task = taskList.findIndex(t => t.id == i);

    if (taskList[task].category == "to-do") {
        taskList[task].category = "in-progress";
    } else if (taskList[task].category == "in-progress") {
        taskList[task].category = "await-feedback";
    } else if (taskList[task].category == "await-feedback") {
        taskList[task].category = "done"
    } else {
        console.log('is done');
    }
    renderTasks();
}

/**
 * Moves a task up one category in the workflow progression
 * Moves task backwards: done → await-feedback → in-progress → to-do
 * @param {number} i - The ID of the task to move up
 */
function switchUp(i) {
    let task = taskList.findIndex(t => t.id == i);

    if (taskList[task].category == "in-progress") {
        taskList[task].category = "to-do";
    } else if (taskList[task].category == "await-feedback") {
        taskList[task].category = "in-progress"
    } else if (taskList[task].category == "done") {
        taskList[task].category = "await-feedback"
    } else {
        console.log('is To Do');
    }
    renderTasks();
}

/**
 * Immediately Invoked Function Expression (IIFE) that adds horizontal fade effects to Kanban board lists
 * Creates fade overlays for horizontal scrolling in mobile view and manages their visibility based on scroll position
 * Sets up scroll, resize, and mutation observers to update fade states dynamically
 */
(function addHorizontalFades() {
    const lists = document.querySelectorAll('.kanban-board .task-list');

    lists.forEach((list) => {
        const wrap = document.createElement('div');
        wrap.className = 'hs-wrap';
        list.parentNode.insertBefore(wrap, list);
        wrap.appendChild(list);
        const fadeLeft = document.createElement('div');
        const fadeRight = document.createElement('div');
        fadeLeft.className = 'hs-fade hs-fade--left';
        fadeRight.className = 'hs-fade hs-fade--right';
        wrap.appendChild(fadeLeft);
        wrap.appendChild(fadeRight);

        const update = () => {
            const max = list.scrollWidth - list.clientWidth;
            const hasOverflow = max > 1;
            wrap.classList.toggle('has-overflow', hasOverflow);
            if (!hasOverflow) {
                fadeLeft.style.opacity = '0';
                fadeRight.style.opacity = '0';
                return;
            }
            const atStart = list.scrollLeft <= 1;
            const atEnd = list.scrollLeft >= max - 1;
            fadeLeft.style.opacity = atStart ? '0' : '1';
            fadeRight.style.opacity = atEnd ? '0' : '1';
        };
        list.addEventListener('scroll', update, { passive: true });
        const ro = new ResizeObserver(update);
        ro.observe(list);
        const mo = new MutationObserver(update);
        mo.observe(list, { childList: true, subtree: true });
        update();
    });
})();

/**
 * Opens the add task overlay and loads task data
 * Displays the board add task template and initializes task loading
 */
function toggleAddTaskOverlay(progress) {
    document.getElementById('bleur-bg').classList.toggle('d_none');
    document.getElementById('task-dialog').classList.toggle('tf_tlx100');
    document.body.classList.toggle('of_hidden');
    if (checkOverlay == 0) {
        document.getElementById('task-dialog').innerHTML = boardAddTaskTemplate(progress);
        setTimeout(() => {
            document.getElementById('task-dialog').setAttribute('onclick', `toggleAddTaskOverlay()`);
        }, 50);
        checkOverlay += 1;
    } else if (progress == true) {
        clearForm()
        renderTasks();
        document.getElementById('task-dialog').removeAttribute('onclick');
        checkOverlay = 0;
    } else {
        clearForm()
        document.getElementById('task-dialog').removeAttribute('onclick');
        checkOverlay = 0;
    }
}