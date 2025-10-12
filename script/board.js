let checkOverlay = 0

let allObj = [];

function toggleTaskOverlay(i) {
    let bleurBg = document.getElementById('bleur-bg');
    let dialog = document.getElementById('task-dialog');
    bleurBg.classList.toggle('d_none');
    dialog.classList.toggle('tf_tlx100');
    if (checkOverlay == 0) {
        dialog.innerHTML = taskOverlayTemp(allObj[i]);
        checkTaskOverlayInfos(allObj[i])
        checkOverlay += 1;
    } else {
        checkOverlay = 0;
    }
}

function stopPropagation(event) {
    event.stopPropagation();
}

function renderTask() {
    let toDo = taskList.filter(t => t['category'] =='to_do');
    document.getElementById('to-do-kanban').innerHTML = "";
    for (let i = 0; i < toDo.length; i++) {
        document.getElementById('to-do-kanban').innerHTML += taskTemp(toDo[i]);
        allObj.push(toDo[i]);        
        checkTaskInfos(toDo[i]);
    }

    let inProgress = taskList.filter(t => t['category'] =='in_progress');
    document.getElementById('in-progress-kanban').innerHTML = "";
    for (let i = 0; i < inProgress.length; i++) {
        document.getElementById('in-progress-kanban').innerHTML += taskTemp(inProgress[i]);
        allObj.push(inProgress[i]);       
        checkTaskInfos(inProgress[i]);
    }

    let awaitFeedback = taskList.filter(t => t['category'] =='await_feedback');
    document.getElementById('await-feedback-kanban').innerHTML = "";
    for (let i = 0; i < awaitFeedback.length; i++) {
        document.getElementById('await-feedback-kanban').innerHTML += taskTemp(awaitFeedback[i]);
        allObj.push(awaitFeedback[i]);       
        checkTaskInfos(awaitFeedback[i]);
    }

    let done = taskList.filter(t => t['category'] =='done');
    document.getElementById('done-kanban').innerHTML = "";
    for (let i = 0; i < done.length; i++) {
        document.getElementById('done-kanban').innerHTML += taskTemp(done[i]);
        allObj.push(done[i]);       
        checkTaskInfos(done[i]);
    }
}

function checkTaskInfos(i) {
    const taskCard = 'task-card';
    checkTaskType(i, taskCard);
    checkTaskDesc(i, taskCard);
    checkProgress(i, taskCard);
    checkFooter(i, taskCard);
}

function checkTaskType(i, taskCard) {    
    if (i.type != null) {
        document.getElementById(`${taskCard}-type-${i.name}`).innerHTML += i.type;
        if (i.type.includes('User')) {
            document.getElementById(`${taskCard}-type-${i.name}`).style.backgroundColor = 'rgba(0, 56, 255, 1)';
        } else {
            document.getElementById(`${taskCard}-type-${i.name}`).style.backgroundColor = 'rgba(31, 215, 193, 1)';
        }
    }
}

function checkTaskDesc(i, taskCard) {
    if (i.description != null) {
        document.getElementById(`${taskCard}-desc-${i.name}`).innerHTML += i.description;
    }
}

function checkProgress(i, taskCard) {
    if (i.subtasks != null) {
        let trueCount = i.subtasks.filter(s => s.status === true).length;
        document.getElementById(`${taskCard}-subtasks-${i.name}`).innerHTML = progressTemp(i.subtasks.length, trueCount);
    }
}

function checkFooter(i, taskCard) {
    if (i.participants > 0 || i.priority != null) {
        document.getElementById(`${taskCard}-footer-${i.name}`).innerHTML = taskFooterTemp(i);
        checkParticipants(i, taskCard);
        checkPrio(i, taskCard);
    }
}

function checkParticipants(i, taskCard) {
    if (i.participants != null) {
        for (let index = 0; index < i.participants.length; index++) {
            document.getElementById(`${taskCard}-participants-${i.name}`).innerHTML += participantsTemp(i, index)
        }
    }
}

function checkPrio(i, taskCard) {
    if (i.priority != null) {
        if (i.priority.includes('urgent')) {
            document.getElementById(`${taskCard}-prio-${i.name}`).innerHTML = urgentPrioTemp();
        } else if (i.priority.includes('medium')) {
            document.getElementById(`${taskCard}-prio-${i.name}`).innerHTML = mediumPrioTemp();
        } else {
            document.getElementById(`${taskCard}-prio-${i.name}`).innerHTML = lowPrioTemp();
        }
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
    if (i.priority != null) {
        if (i.priority.includes('urgent')) {
            document.getElementById(`${taskOverlay}-prio-${i.name}`).innerHTML = prioTaskOverlayTemp(i, urgentPrioTemp());
        } else if (i.priority.includes('medium')) {
            document.getElementById(`${taskOverlay}-prio-${i.name}`).innerHTML = prioTaskOverlayTemp(i, mediumPrioTemp());
        } else {
            document.getElementById(`${taskOverlay}-prio-${i.name}`).innerHTML = prioTaskOverlayTemp(i, lowPrioTemp());
        }
    }
}

function checkTaskOverlayParticipants(i, taskOverlay) {
    if (i.participants != null) {
        document.getElementById(`${taskOverlay}-participants-${i.name}`).innerHTML += participantsTaskOverlayTemp(i)
        for (let index = 0; index < i.participants.length; index++) {
            document.getElementById(`participants-list-${i.name}`).innerHTML += participantTemp(i, index);
        }
    }
}

function checkTaskOverlaySubtasks(i, taskOverlay){
    if (i.participants != null) {
        document.getElementById(`${taskOverlay}-subtasks-${i.name}`).innerHTML += subtasksTaskOverlay(i);
        for (let index = 0; index < i.subtasks.length; index++) {
            if (i.subtasks[index].status == true) {
                document.getElementById(`subtasks-list-${i.name}`).innerHTML += subtaskListTemp(i, index, subtaskDoneTemp());
            } else {
                document.getElementById(`subtasks-list-${i.name}`).innerHTML += subtaskListTemp(i, index, subtaskToDoTemp());
            }
        }
    }
}