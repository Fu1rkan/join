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
}//////

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