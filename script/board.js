const toDoList = document.getElementById('to-do-kanban');
const inProgressList = document.getElementById('in-progress-kanban');
const awaitFeedback = document.getElementById('await-feedback-kanban');
const done = document.getElementById('done-kanban');

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

function toggleTaskOverlay(id){
    let bleurBg = document.getElementById('bleur-bg');
    let dialog = document.getElementById(`${id}`);
    bleurBg.classList.toggle('d_none');
    dialog.classList.toggle('tf_tlx100');
}

function stopPropagation(event) {
    event.stopPropagation();
}

function renderTask(){
    for (let iCategory = 0; iCategory < kanbans.length; iCategory++) {
        if (taskList[kanbans[iCategory]].length > 0) {
            for (let iTask = 0; iTask < taskList[kanbans[iCategory]].length; iTask++) {
                kanbansRef[iCategory].innerHTML += taskTemp(kanbans[iCategory], iTask);
                checkTaskInfos(kanbans[iCategory], iTask);
            }
        }else{
            kanbansRef[iCategory].innerHTML = emptyTaskList();
        }
    }
}

function checkTaskInfos(category, iTask){
    const task = taskList[category][iTask];
    checkTaskType(category, iTask, task);
    checkTaskDesc(category, iTask, task);
    checkProgress(category, iTask, task);
    checkFooter(category, iTask, task);
}

function checkTaskType(category, iTask, task){
    const taskType = document.getElementById(`type-${category}-${iTask}`);

    if (task.type != null) {
        taskType.innerHTML += task.type;
        if (task.type.includes('User')) {
            taskType.style.backgroundColor = 'rgba(0, 56, 255, 1)';
        }else{
            taskType.style.backgroundColor = 'rgba(31, 215, 193, 1)';            
        }
    }
}

function checkTaskDesc(category, iTask, task){
    const taskDesc = document.getElementById(`desc-${category}-${iTask}`);

    if (task.description != null) {
        taskDesc.innerHTML += task.description;
    }
}

function checkProgress(category, iTask, task){
    const taskProgress = document.getElementById(`subtasks-${category}-${iTask}`);
    
    if (task.subtasks != null) {
        let trueCount = task.subtasks.filter(s => s.status === true).length;        
        taskProgress.innerHTML = progressTemp(task.subtasks.length, trueCount);
    }
}

function checkFooter(category, iTask, task){
    if (task.participants > 0 || task.priority != null) {
        document.getElementById(`footer-${category}-${iTask}`).innerHTML = taskFooterTemp(category, iTask);
        checkParticipants(category, iTask, task);
        checkPrio(category, iTask, task);
    }
}

function checkParticipants(category, iTask, task){
    const taskParticipants = document.getElementById(`participants-${category}-${iTask}`);
    
    if (task.participants != null) {
        for (let index = 0; index < task.participants.length; index++) {
            taskParticipants.innerHTML += participantsTemp(task, index)
        }
    }
}

function checkPrio(category, iTask, task){
    const taskPrio = document.getElementById(`prio-${category}-${iTask}`);
    
    if (task.priority != null) {
        if (task.priority.includes('urgent')) {
            taskPrio.innerHTML = urgentPrioTemp();
        } else if(task.priority.includes('medium')){
            taskPrio.innerHTML = mediumPrioTemp();
        }else{
            taskPrio.innerHTML = lowPrioTemp();
        }
    }
}

function checkSubtasksMainOverlay(task, taskProgress){
    for (let index = 0; index < task.subtasks.length; index++) {
        taskProgress.innerHTML += task.subtasks[index].name; 
    }
}