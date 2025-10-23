let checkOverlay = 0

let currentDraggedElement;

let taskEditor;

let ids = ['to-do', 'in-progress', 'await-feedback', 'done'];

function stopPropagation(event) {
    event.stopPropagation();
}


function init() {
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
    if (checkOverlay == 0) {
        let task = taskList.find(t => t['id'] == i);
        document.getElementById('task-dialog').innerHTML = taskOverlayTemp(task);
        checkTaskOverlayInfos(task)
        checkOverlay += 1;
    } else {
        checkOverlay = 0;
        taskEditor = undefined;
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
    if (i.description != null) {
        document.getElementById(`${taskCard}-desc-${i.id}`).innerHTML += i.description;
    }
}


function checkProgress(i, taskCard) {
    if (i.subtasks != null) {
        let trueCount = i.subtasks.filter(s => s.status === true).length;
        document.getElementById(`${taskCard}-subtasks-${i.id}`).innerHTML = progressTemp(i.subtasks.length, trueCount);
    }
}


function checkParticipants(i, taskCard) {
    if (i.participants != null) {
        for (let index = 0; index < i.participants.length; index++) {
            if (index < 3) {
                document.getElementById(`${taskCard}-participants-${i.id}`).innerHTML += participantsTemp(i, index)
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


function checkSubtasksMainOverlay(task, taskProgress, taskInfoId) {
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
    if (i.participants != null) {
        document.getElementById(`${taskOverlay}-participants-${i.id}`).innerHTML += participantsTaskOverlayTemp(i)
        for (let index = 0; index < i.participants.length; index++) {
            document.getElementById(`participants-list-${i.id}`).innerHTML += participantTemp(i, index);
        }
    }
}


function checkTaskOverlaySubtasks(i, taskOverlay) {
    if (i.participants != null) {
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
























function openEditTaskOverlay(id) {
    let task = taskList.find(t => t['id'] == id);
    taskEditor = structuredClone(task);
    
    document.getElementById('task-dialog').innerHTML = taskEditOverlayTemp(task);
    document.getElementById('change-title').value = task.name;
    document.getElementById('change-desc').value = task.description;
    document.getElementById('input-date').value = task.date;
    checkPriorityStatus(task);
    changeParticipants(task);
    renderContactList();
    renderSubtaskList(task);
}


function closeEditTaskOverlay(id) {
    let task = taskList.find(t => t['id'] == id);
    taskEditor = undefined;
    
    document.getElementById('task-dialog').innerHTML = taskOverlayTemp(task);
    checkTaskOverlayInfos(task);
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

function resetPriority(){
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


function changePriority(prioType){
    taskEditor.priority = prioType;
    resetPriority();
    checkPriorityStatus(taskEditor);
}


function changeParticipants(task){
    if (task.participants != null) {   
        for (let index = 0; index < task.participants.length; index++) {   
            document.getElementById('included-participants').innerHTML += participantLogoTemp(task.participants[index]);
        }
    }
}


function renderContactList(){
    if (contacts.length > 0){
        for (let index = 0; index < contacts.length; index++) {
            document.getElementById('participants-list').innerHTML += renderContactsTemp(contacts[index]);
        }
    }
}


function renderSubtaskList(task){
    document.getElementById('change-subtasks-list').innerHTML = "";
    if (task.subtasks != null){
        for (let index = 0; index < taskEditor.subtasks.length; index++) {
            document.getElementById('change-subtasks-list').innerHTML += renderSubtasksTemp(index);
        }
    }
}


function toggleContactList(){
    document.getElementById('change-participants-button').classList.toggle('tf_r180');
    document.getElementById('participants-list').classList.toggle('d_none');
}


function activeEditTask(index, subtask){
    document.getElementById(`edit-subtask-${index}`).classList.remove('d_none');
    document.getElementById(`edit-subtask-input-${index}`).classList.remove('d_none');
    document.getElementById(`edit-subtask-input-${index}`).value = subtask;
    document.getElementById(`subtask-span-${index}`).classList.add('d_none');
    document.getElementById(`subtask-edit-${index}`).classList.add('d_none');
}


function acceptEditedTask(index){
    let newSubtask = document.getElementById(`edit-subtask-input-${index}`).value;
    taskEditor.subtasks[index].name = newSubtask;
    renderSubtaskList(taskEditor);
}


function deleteSubtask(subtaskId){
    taskEditor.subtasks.splice(subtaskId, 1);
    renderSubtaskList(taskEditor);    
}


function clearInputField(){
    document.getElementById('new-subtask-input').value = "";
}


function pushSubtask(){
    let newSubtask = document.getElementById('new-subtask-input').value;
    taskEditor.subtasks.push({name: `${newSubtask}`, status: true});
    renderSubtaskList(taskEditor);
    clearInputField();
}
































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
    init();
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