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
    for (let i = 0; i < kanbans.length; i++) {
        if (taskList[kanbans[i]].length > 0) {
            for (let index = 0; index < taskList[kanbans[i]].length; index++) {
                kanbansRef[i].innerHTML += taskTemp();
                checkTaskInfos(i);
            }
        }else{
            kanbansRef[i].innerHTML = emptyTaskList();
        }
    }
}

function checkTaskInfos(index){
    let task = taskList[kanbans[index]];
}