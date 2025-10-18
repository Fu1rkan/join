let checkOverlay = 0

let currentDraggedElement;

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

function init() {
    renderToDo();
    renderInProgress();
    renderAwaitFeedback();
    renderDone();
}

function renderToDo() {
    let toDo = taskList.filter(t => t['category'] == 'to_do');
    document.getElementById('to-do-kanban').innerHTML = "";
    if (toDo.length > 0) {
        for (let i = 0; i < toDo.length; i++) {
            document.getElementById('to-do-kanban').innerHTML += taskTemp(toDo[i]);
            allObj.push(toDo[i]);
            checkTaskInfos(toDo[i]);
        }
    } else {
        document.getElementById('to-do-kanban').innerHTML = emptyTaskList();
    }
}

function renderInProgress() {
    let inProgress = taskList.filter(t => t['category'] == 'in_progress');
    document.getElementById('in-progress-kanban').innerHTML = "";
    if (inProgress.length > 0) {
        for (let i = 0; i < inProgress.length; i++) {
            document.getElementById('in-progress-kanban').innerHTML += taskTemp(inProgress[i]);
            allObj.push(inProgress[i]);
            checkTaskInfos(inProgress[i]);
        }
    } else {
        document.getElementById('in-progress-kanban').innerHTML = emptyTaskList();
    }
}

function renderAwaitFeedback() {
    let awaitFeedback = taskList.filter(t => t['category'] == 'await_feedback');
    document.getElementById('await-feedback-kanban').innerHTML = "";
    if (awaitFeedback.length > 0) {
        for (let i = 0; i < awaitFeedback.length; i++) {
            document.getElementById('await-feedback-kanban').innerHTML += taskTemp(awaitFeedback[i]);
            allObj.push(awaitFeedback[i]);
            checkTaskInfos(awaitFeedback[i]);
        }
    } else {
        document.getElementById('await-feedback-kanban').innerHTML = emptyTaskList();
    }
}

function renderDone() {
    let done = taskList.filter(t => t['category'] == 'done');
    document.getElementById('done-kanban').innerHTML = "";
    if (done.length > 0) {
        for (let i = 0; i < done.length; i++) {
            document.getElementById('done-kanban').innerHTML += taskTemp(done[i]);
            allObj.push(done[i]);
            checkTaskInfos(done[i]);
        }
    } else {
        document.getElementById('done-kanban').innerHTML = emptyTaskList();
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
        document.getElementById(`${taskCard}-type-${i.name}`).style.backgroundColor = 'rgba(0, 56, 255, 1)';
    } else {
        document.getElementById(`${taskCard}-type-${i.name}`).style.backgroundColor = 'rgba(31, 215, 193, 1)';
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

function checkParticipants(i, taskCard) {
    if (i.participants != null) {
        for (let index = 0; index < i.participants.length; index++) {
            if (index < 3) {
                document.getElementById(`${taskCard}-participants-${i.name}`).innerHTML += participantsTemp(i, index)
            } else {
                document.getElementById(`${taskCard}-participants-${i.name}`).innerHTML += moreParticipantsTemp()
                break
            }
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
    if (i.priority.includes('urgent')) {
        document.getElementById(`${taskOverlay}-prio-${i.name}`).innerHTML = prioTaskOverlayTemp(i, urgentPrioTemp());
    } else if (i.priority.includes('medium')) {
        document.getElementById(`${taskOverlay}-prio-${i.name}`).innerHTML = prioTaskOverlayTemp(i, mediumPrioTemp());
    } else {
        document.getElementById(`${taskOverlay}-prio-${i.name}`).innerHTML = prioTaskOverlayTemp(i, lowPrioTemp());
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

function checkTaskOverlaySubtasks(i, taskOverlay) {
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

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(card) {
    card.preventDefault();
}

function moveTo(category, id) {
    allObj[currentDraggedElement]['category'] = category;
    document.getElementById(id).classList.remove('drag-area-highlight');
    init();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}


(function addHorizontalFades() {
    const lists = document.querySelectorAll('.kanban-board .task-list');

    lists.forEach((list) => {
        // Wrapper erzeugen und list hineinverschieben
        const wrap = document.createElement('div');
        wrap.className = 'hs-wrap';
        list.parentNode.insertBefore(wrap, list);
        wrap.appendChild(list);

        // Fade-Overlays erstellen
        const fadeLeft = document.createElement('div');
        const fadeRight = document.createElement('div');
        fadeLeft.className = 'hs-fade hs-fade--left';
        fadeRight.className = 'hs-fade hs-fade--right';
        wrap.appendChild(fadeLeft);
        wrap.appendChild(fadeRight);

        // Update-Logik je nach Scrollposition
        const update = () => {
            // nur bei mobiler Ansicht relevant – dein Overflow ist dort aktiv
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

            // Am Anfang: nur rechter Fade sichtbar
            // In der Mitte: beide sichtbar
            // Am Ende: nur linker Fade sichtbar
            fadeLeft.style.opacity = atStart ? '0' : '1';
            fadeRight.style.opacity = atEnd ? '0' : '1';
        };

        // Events
        list.addEventListener('scroll', update, { passive: true });

        // Resize/Font/Layouträume können sich ändern
        const ro = new ResizeObserver(update);
        ro.observe(list);

        // Tasks können dynamisch dazu kommen/entfernt werden
        const mo = new MutationObserver(update);
        mo.observe(list, { childList: true, subtree: true });

        // Initial
        update();
    });
})();

function openDatePicker() {
    const input = document.getElementById('input-date');
    input.showPicker?.();
    input.focus();
}