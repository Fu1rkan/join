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
            for (let index = 0; index < taskList[kanbans[iCategory]].length; index++) {
                kanbansRef[iCategory].innerHTML += taskTemp(kanbans[iCategory], index);
                checkTaskInfos(kanbans[iCategory], index);
            }
        }else{
            kanbansRef[iCategory].innerHTML = emptyTaskList();
        }
    }
}

function checkTaskInfos(category, iTask){
    let task = taskList[category][iTask];
    console.log(task);
    
    if (taskList.category) {
        
    }
}