let checkOverlay = 0

let currentDraggedElement;

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
        let task = taskList.filter(t => t['id'] == i);
        document.getElementById('task-dialog').innerHTML = taskOverlayTemp(task[0]);
        checkTaskOverlayInfos(task[0])
        checkOverlay += 1;
    } else {
        checkOverlay = 0;
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
    let task = taskList.filter(t => t['id'] == id);
    document.getElementById('task-dialog').innerHTML = taskEditOverlayTemp(task[0]);
    document.getElementById('change-title').value = task[0].name;
    document.getElementById('change-desc').value = task[0].description;
    document.getElementById('input-date').value = task[0].date;
    checkPriorityStatus(task[0])
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


function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(card) {
    card.preventDefault();
}


function moveTo(categoryTo, id) {
    let task = taskList.filter(t => t['id'] == currentDraggedElement);
    let categoryFrom = task[0]['category'];
    task[0]['category'] = categoryTo;
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