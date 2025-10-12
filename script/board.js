const toDoList = document.getElementById('to-do-kanban');
const inProgressList = document.getElementById('in-progress-kanban');
const awaitFeedback = document.getElementById('await-feedback-kanban');
const done = document.getElementById('done-kanban');

let checkOverlay = 0

const kanbans = [
    'to_do',
    'in_progress',
    'await_feedback',
    'done'
]

const kanbansRef = [
    toDoList,
    inProgressList,
    awaitFeedback,
    done
]

function toggleTaskOverlay(category, iTask) {
    let bleurBg = document.getElementById('bleur-bg');
    let dialog = document.getElementById('task-dialog');
    bleurBg.classList.toggle('d_none');
    dialog.classList.toggle('tf_tlx100');
    if (checkOverlay == 0) {
        dialog.innerHTML = taskOverlayTemp(category, iTask);
        const taskInfoId = 'overlay';
        checkTaskOverlayInfos(category, iTask, taskInfoId)
        checkOverlay += 1;
    } else {
        checkOverlay = 0;
    }
}

function stopPropagation(event) {
    event.stopPropagation();
}

function renderTask() {
    for (let iCategory = 0; iCategory < kanbans.length; iCategory++) {
        if (taskList[kanbans[iCategory]].length > 0) {
            for (let iTask = 0; iTask < taskList[kanbans[iCategory]].length; iTask++) {
                kanbansRef[iCategory].innerHTML += taskTemp(kanbans[iCategory], iTask);
                const taskInfoId = 'task';
                checkTaskInfos(kanbans[iCategory], iTask, taskInfoId);
            }
        } else {
            kanbansRef[iCategory].innerHTML = emptyTaskList();
        }
    }
}

function checkTaskInfos(category, iTask, taskInfoId) {
    const task = taskList[category][iTask];
    checkTaskType(category, iTask, task, taskInfoId);
    checkTaskDesc(category, iTask, task, taskInfoId);
    checkProgress(category, iTask, task, taskInfoId);
    checkFooter(category, iTask, task, taskInfoId);
}

function checkTaskType(category, iTask, task, taskInfoId) {
    const taskType = document.getElementById(`${taskInfoId}-type-${category}-${iTask}`);

    if (task.type != null) {
        taskType.innerHTML += task.type;
        if (task.type.includes('User')) {
            taskType.style.backgroundColor = 'rgba(0, 56, 255, 1)';
        } else {
            taskType.style.backgroundColor = 'rgba(31, 215, 193, 1)';
        }
    }
}

function checkTaskDesc(category, iTask, task, taskInfoId) {
    const taskDesc = document.getElementById(`${taskInfoId}-desc-${category}-${iTask}`);

    if (task.description != null) {
        taskDesc.innerHTML += task.description;
    }
}

function checkProgress(category, iTask, task, taskInfoId) {
    const taskProgress = document.getElementById(`${taskInfoId}-subtasks-${category}-${iTask}`);

    if (task.subtasks != null) {
        let trueCount = task.subtasks.filter(s => s.status === true).length;
        taskProgress.innerHTML = progressTemp(task.subtasks.length, trueCount);
    }
}

function checkFooter(category, iTask, task, taskInfoId) {
    if (task.participants > 0 || task.priority != null) {
        document.getElementById(`${taskInfoId}-footer-${category}-${iTask}`).innerHTML = taskFooterTemp(category, iTask);
        checkParticipants(category, iTask, task, taskInfoId);
        checkPrio(category, iTask, task, taskInfoId);
    }
}

function checkParticipants(category, iTask, task, taskInfoId) {
    const taskParticipants = document.getElementById(`${taskInfoId}-participants-${category}-${iTask}`);

    if (task.participants != null) {
        for (let index = 0; index < task.participants.length; index++) {
            taskParticipants.innerHTML += participantsTemp(task, index)
        }
    }
}

function checkPrio(category, iTask, task, taskInfoId) {
    const taskPrio = document.getElementById(`${taskInfoId}-prio-${category}-${iTask}`);

    if (task.priority != null) {
        if (task.priority.includes('urgent')) {
            taskPrio.innerHTML = urgentPrioTemp();
        } else if (task.priority.includes('medium')) {
            taskPrio.innerHTML = mediumPrioTemp();
        } else {
            taskPrio.innerHTML = lowPrioTemp();
        }
    }
}

function checkSubtasksMainOverlay(task, taskProgress, taskInfoId) {
    for (let index = 0; index < task.subtasks.length; index++) {
        taskProgress.innerHTML += task.subtasks[index].name;
    }
}

function checkTaskOverlayInfos(category, iTask, taskInfoId) {
    const task = taskList[category][iTask];
    checkTaskType(category, iTask, task, taskInfoId);
    checkTaskDesc(category, iTask, task, taskInfoId);
    checkTaskOverlayPrio(category, iTask, task, taskInfoId);
    checkTaskOverlayParticipants(category, iTask, task, taskInfoId);
    checkTaskOverlaySubtasks(category, iTask, task, taskInfoId);
}

function checkTaskOverlayPrio(category, iTask, task, taskInfoId) {
    const taskPrio = document.getElementById(`${taskInfoId}-prio-${category}-${iTask}`);
    if (task.priority != null) {
        if (task.priority.includes('urgent')) {
            taskPrio.innerHTML = prioTaskOverlayTemp(task, urgentPrioTemp());
        } else if (task.priority.includes('medium')) {
            taskPrio.innerHTML = prioTaskOverlayTemp(task, mediumPrioTemp());
        } else {
            taskPrio.innerHTML = prioTaskOverlayTemp(task, lowPrioTemp());
        }
    }
}

function checkTaskOverlayParticipants(category, iTask, task, taskInfoId) {
    const taskParticipants = document.getElementById(`${taskInfoId}-participants-${category}-${iTask}`);

    if (task.participants != null) {
        taskParticipants.innerHTML += participantsTaskOverlayTemp(category, iTask)
        for (let index = 0; index < task.participants.length; index++) {
            document.getElementById(`participants-list-${category}-${iTask}`).innerHTML += participantTemp(task, index);
        }
    }
}

function checkTaskOverlaySubtasks(category, iTask, task, taskInfoId){
    const taskParticipants = document.getElementById(`${taskInfoId}-subtasks-${category}-${iTask}`);

    if (task.participants != null) {
        taskParticipants.innerHTML += subtasksTaskOverlay(category, iTask)
        for (let index = 0; index < task.subtasks.length; index++) {
            if (task.subtasks[index].status == true) {
                document.getElementById(`subtasks-list-${category}-${iTask}`).innerHTML += subtaskListTemp(task, index, subtaskDoneTemp());
            } else {
                document.getElementById(`subtasks-list-${category}-${iTask}`).innerHTML += subtaskListTemp(task, index, subtaskToDoTemp());
            }
        }
    }
}