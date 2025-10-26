let checkOverlay = 0

let currentDraggedElement;

let taskEditor;

let ids = ['to-do', 'in-progress', 'await-feedback', 'done'];

function stopPropagation(event) {
    event.stopPropagation();
}


async function init() {
    await loadContacts();
    await loadTasks();
    renderTasks();
}


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
            document.getElementById(`${ids[index]}-kanban`).innerHTML = emptyTaskList();
        }
    }
}


function toggleTaskOverlay(i) {
    document.getElementById('bleur-bg').classList.toggle('d_none');
    document.getElementById('task-dialog').classList.toggle('tf_tlx100');
    document.body.classList.toggle('of_hidden');
    if (checkOverlay == 0) {
        let task = taskList.find(t => t['id'] == i);
        document.getElementById('task-dialog').innerHTML = taskOverlayTemp(task);
        checkTaskOverlayInfos(task)
        checkOverlay += 1;
    } else {
        checkOverlay = 0;
        taskEditor = undefined;
        renderTasks();
    }
}


function checkTaskInfos(i) {
    const taskCard = 'task-card';
    checkTaskType(i, taskCard);
    checkTaskDesc(i, taskCard);
    checkProgress(i, taskCard);
    checkParticipants(i, taskCard);
    checkPrio(i, taskCard);
}


function checkTaskType(i, taskCard) {
    if (i.type.includes('User')) {
        document.getElementById(`${taskCard}-type-${i.id}`).style.backgroundColor = 'rgba(0, 56, 255, 1)';
    } else {
        document.getElementById(`${taskCard}-type-${i.id}`).style.backgroundColor = 'rgba(31, 215, 193, 1)';
    }
}


function checkTaskDesc(i, taskCard) {
    if (i.description != false) {
        document.getElementById(`${taskCard}-desc-${i.id}`).innerHTML += i.description;
    }
}


function checkProgress(i, taskCard) {
    if (i.subtasks != false) {
        let trueCount = i.subtasks.filter(s => s.status === true).length;
        document.getElementById(`${taskCard}-subtasks-${i.id}`).innerHTML = progressTemp(i.subtasks.length, trueCount);
    }
}


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


function checkPrio(i, taskCard) {
    if (i.priority.includes('urgent')) {
        document.getElementById(`${taskCard}-prio-${i.id}`).innerHTML = urgentPrioTemp();
    } else if (i.priority.includes('medium')) {
        document.getElementById(`${taskCard}-prio-${i.id}`).innerHTML = mediumPrioTemp();
    } else {
        document.getElementById(`${taskCard}-prio-${i.id}`).innerHTML = lowPrioTemp();
    }
}


function checkSubtasksMainOverlay(task, taskProgress) {
    for (let index = 0; index < task.subtasks.length; index++) {
        taskProgress.innerHTML += task.subtasks[index].name;
    }
}


function checkTaskOverlayInfos(i) {
    const taskOverlay = 'task-overlay';
    checkTaskType(i, taskOverlay);
    checkTaskDesc(i, taskOverlay);
    checkTaskOverlayPrio(i, taskOverlay);
    checkTaskOverlayParticipants(i, taskOverlay);
    checkTaskOverlaySubtasks(i, taskOverlay);
}


function checkTaskOverlayPrio(i, taskOverlay) {
    if (i.priority.includes('urgent')) {
        document.getElementById(`${taskOverlay}-prio-${i.id}`).innerHTML = prioTaskOverlayTemp(i, urgentPrioTemp());
    } else if (i.priority.includes('medium')) {
        document.getElementById(`${taskOverlay}-prio-${i.id}`).innerHTML = prioTaskOverlayTemp(i, mediumPrioTemp());
    } else {
        document.getElementById(`${taskOverlay}-prio-${i.id}`).innerHTML = prioTaskOverlayTemp(i, lowPrioTemp());
    }
}


function checkTaskOverlayParticipants(i, taskOverlay) {
    if (i.participants != false) {
        document.getElementById(`${taskOverlay}-participants-${i.id}`).innerHTML += participantsTaskOverlayTemp(i)
        let inclContacts = contacts.filter(c => i.participants.some(p => p.name === c.name));
        for (let index = 0; index < i.participants.length; index++) {
            document.getElementById(`participants-list-${i.id}`).innerHTML += participantTemp(inclContacts[index]);
        }
    }
}


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


function deleteTask(i) {
    let task = taskList.findIndex(t => t['id'] == i);
    taskList.splice(task, 1);
    toggleTaskOverlay(i);
    postTask("user/tasks/", taskList);
    init();
}


function toggleSubtaskStatus(i, index) {
    let task = taskList.findIndex(t => t['id'] == i);
    if (taskList[task].subtasks[index].status == true) {
        taskList[task].subtasks[index].status = false;

    } else {
        taskList[task].subtasks[index].status = true;
    }
    checkTaskOverlaySubtasks(taskList[task], 'task-overlay')
}
























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


function closeEditTaskOverlay(id) {
    let task = taskList.find(t => t['id'] == id);
    taskEditor = undefined;

    document.getElementById('task-dialog').innerHTML = taskOverlayTemp(task);
    checkTaskOverlayInfos(task);
}


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


function changePriority(prioType) {
    taskEditor.priority = prioType;
    resetPriority();
    checkPriorityStatus(taskEditor);
}


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


function toggleContactList() {
    document.getElementById('change-participants-button').classList.toggle('tf_r180');
    document.getElementById('participants-list').classList.toggle('d_none');
}

function openContactList() {
    document.getElementById('change-participants-button').classList.add('tf_r180');
    document.getElementById('participants-list').classList.remove('d_none');
}


function activeEditTask(index, subtask) {
    document.getElementById(`edit-subtask-${index}`).classList.remove('d_none');
    document.getElementById(`edit-subtask-input-${index}`).classList.remove('d_none');
    document.getElementById(`edit-subtask-input-${index}`).value = subtask;
    document.getElementById(`edit-subtask-input-${index}`).focus();
    document.getElementById(`subtask-span-${index}`).classList.add('d_none');
    document.getElementById(`subtask-edit-${index}`).classList.add('d_none');
}


function acceptEditedTask(index) {
    let newSubtask = document.getElementById(`edit-subtask-input-${index}`).value;
    if (newSubtask.length > 0) {
        taskEditor.subtasks[index].name = newSubtask;
        renderSubtaskList(taskEditor);
    } else {
        deleteSubtask(index);
    }
}


function deleteSubtask(index) {
    taskEditor.subtasks.splice(index, 1);
    renderSubtaskList(taskEditor);
}


function clearInputField() {
    document.getElementById('new-subtask-input').value = "";
}


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


function resetPlaceholderSubtask() {
    document.getElementById('add-subtasks').classList.remove('empty-subtask-input');
    document.getElementById('new-subtask-input').classList.remove('empty-subtask-input');
    document.getElementById('new-subtask-input').placeholder = 'Add new Subtasks';
}


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
        postTask("user/tasks/", taskList);
        init();
    }
} ////////////    Wird noch optimiert, passt aber von der funktion :=) //////////////////////


































function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(card) {
    card.preventDefault();
}


function moveTo(categoryTo, id) {
    let task = taskList.find(t => t['id'] == currentDraggedElement);
    let categoryFrom = task['category'];
    task['category'] = categoryTo;
    document.getElementById(id).classList.remove('drag-area-highlight');
    ids = [categoryFrom, categoryTo]
    renderTasks();
}


function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}


function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}


function openDatePicker() {
    const input = document.getElementById('input-date');
    input.showPicker?.();
    input.focus();
}