async function init() {
    await loadContacts();
    await loadTasks();
}

let priorityTaskActive = "medium";
let currentAssignedTo = [];
let currentChoosedCategory = "";
let currentCreatedSubtasks = [];

function openCalender() {
    let calenderRef = document.getElementById('add_task_due_date')
    calenderRef.showPicker();
}

function activatePriority(para = "medium") {
    PriorityTaskActive = "";
    resetPriorityButtonHighlight();
    let buttonRef = document.getElementById(`add_task_priority_${para}`);
    let svgRef = document.getElementById(`add_task_priority_${para}_svg`);
    if (para == 'urgent') {
        highlightPriorityButton(para, buttonRef, svgRef);
    } else if (para == 'medium') {
        highlightPriorityButton(para, buttonRef, svgRef);
    } else {
        highlightPriorityButton(para, buttonRef, svgRef);
    }
    priorityTaskActive = para;
}

function resetPriorityButtonHighlight() {
    document.querySelectorAll('.add-task-priority-btns-container button').forEach(btn => {
        btn.classList.remove('add-task-priority-btn-urgent-active', 'add-task-priority-btn-medium-active', 'add-task-priority-btn-low-active');
        btn.classList.add('add-task-priority-btns-hover-class');
    });
    document.querySelectorAll('.add-task-priority-btns-container button svg').forEach(svg => {
        svg.classList.remove('add_task_priority_active_svg');
    })
}

function highlightPriorityButton(para, buttonRef, svgRef) {
    buttonRef.classList.remove('add-task-priority-btns-hover-class');
    buttonRef.classList.add(`add-task-priority-btn-${para}-active`);
    svgRef.classList.add(`add_task_priority_active_svg`);
}


function selectContact(index) {
    let contactRef = document.getElementById(index);
    let svgUncheckedRef = document.getElementById(`${index}_unchecked`);
    let svgCheckedRef = document.getElementById(`${index}_checked`);
    contactRef.classList.toggle('add-task-form-assigned-to-dropdown-contacts-default-hover-class')
    contactRef.classList.toggle('add-task-form-assigned-to-dropdown-contacts-checked')
    svgUncheckedRef.classList.toggle('d_none');
    svgCheckedRef.classList.toggle('d_none');
    if (currentAssignedTo.includes(contacts[index])) {
        currentAssignedTo.splice(currentAssignedTo.findIndex(contact => contact.name == contacts[index].name && contact.email == contacts[index].email), 1);
    } else {
        currentAssignedTo.push(contacts[index]);
    }
}

function toggleAssignedToContactList() {
    let addTaskAssignedToList = document.getElementById('add_task_form_assigned_to_dropdown_contacts');
    let addTaskAssignedToArrow = document.getElementById('add_task_form_assigned_to_arrow_svg');
    addTaskAssignedToList.classList.toggle('d_none');
    addTaskAssignedToArrow.classList.toggle('add-task-form-assigned-to-arrow-up-svg');
    if (!addTaskAssignedToList.classList.contains('d_none')) {
        renderContactsInList();
    }
}

function renderContactsInList() {
    let addTaskAssignedToList = document.getElementById('add_task_form_assigned_to_dropdown_contacts');
    addTaskAssignedToList.innerHTML = "";
    for (let index = 0; index < contacts.length; index++) {
        addTaskAssignedToList.innerHTML += getAddTaskAssignedToListItem(index);
    }
}

function getAddTaskAssignedToListItem(index) {
    return `<li id="${index}"
                                            class="add-task-form-assigned-to-dropdown-contacts-default-hover-class"
                                            onclick="selectContact(${index})">
                                            <div class="add-task-form-assigned-to-dropdown-list-contact">
                                                <div class="add-task-form-assigned-to-dropdown-contacts-icon" style="background-color:${contacts[index].fillColor}">
                                                    <p>${contacts[index].nameLetters}</p>
                                                </div>
                                                <p>${contacts[index].name}</p>
                                            </div>
                                            <div id="${index}_unchecked" class="">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none">
                                                    <rect x="4" y="4" width="16" height="16" rx="3" stroke="#2A3647"
                                                        stroke-width="2" />
                                                </svg>
                                            </div>
                                            <div id="${index}_checked" class="d_none">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none">
                                                    <path
                                                        d="M20 11V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V7C4 5.34315 5.34315 4 7 4H15"
                                                        stroke="white" stroke-width="2" stroke-linecap="round" />
                                                    <path d="M8 12L12 16L20 4.5" stroke="white" stroke-width="2"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                        </li>`
}

function toggleCategoryList() {
    let addTaskCategoryListRef = document.getElementById('add_task_form_category_dropdown_category');
    let addTaskCategoryArrowRef = document.getElementById('add_task_form_category_arrow_svg');
    addTaskCategoryListRef.classList.toggle('d_none');
    addTaskCategoryArrowRef.classList.toggle('add-task-form-assigned-to-arrow-up-svg');
}

function chooseCategory(categoryName) {
    let addTaskCategoryInputRef = document.getElementById('add_task_category');
    toggleCategoryList();
    addTaskCategoryInputRef.value = categoryName;
    currentChoosedCategory = categoryName;
}

function changeCurrentSubtask() {
    let subtaskListRef = document.getElementById('add_task_form_subtasks_dropdown_subtasks');
    let subtaskListItemRef = document.getElementById('current_subtask_li');
    let currentSubtaskValue = document.getElementById('current_subtask');
    let currentSubtaskChangeLabelRef = document.getElementById('label_current_subtask');
    let currentSubtaskChangeinputRef = document.getElementById('change_current_element');
    subtaskListRef.classList.add('list-style-none');
    subtaskListItemRef.classList.remove('add-task-form-subtasks-dropdown-subtasks-list-item');
    currentSubtaskValue.classList.add('d_none');
    currentSubtaskChangeLabelRef.classList.remove('d_none');
    currentSubtaskChangeinputRef.value = currentSubtaskValue.innerText
}

function highlightInputFields(activeInputField) {
    let inputFieldRef = document.getElementById(activeInputField);
    let inputFieldAddFormSubtasksBtnsRef = document.getElementById('add_task_form_subtasks_btns');
    inputFieldAddFormSubtasksBtnsRef.classList.add('d_none');
    removeHighlightInputFields();
    inputFieldRef.classList.add('add-task-inputfield-highlight');
    if (activeInputField == "add_task_subtasks") {
        inputFieldAddFormSubtasksBtnsRef.classList.remove('d_none');
    }
}

function removeHighlightInputFields() {
    document.querySelectorAll('.add-task-form input').forEach(el => el.classList.remove('add-task-inputfield-highlight'));
    document.querySelectorAll('.add-task-form textarea').forEach(el => el.classList.remove('add-task-inputfield-highlight'));
}

function resetAddTaskSubtasksInputField(activeInputField = "add_task_subtasks") {
    let subtasksInputField = document.getElementById(activeInputField);
    subtasksInputField.value = "";
}

function setSubtask(activeInputField = "add_task_subtasks") {
    let subtasksInputField = document.getElementById(activeInputField);
    currentCreatedSubtasks.push(
        {
            "name": subtasksInputField.value
        }
    );
    resetAddTaskSubtasksInputField();
    // renderCurrentCreatedSubtasks();
}

function renderCurrentCreatedSubtasks() {
    let subtasksContentList = document.getElementById('add_task_form_subtasks_dropdown_subtasks');
    subtasksContentList.innerHTML = "";
    for (let index = 0; index < currentCreatedSubtasks.length; index++) {
        subtasksContentList.innerHTML += getSubtaskTemplate(index);
    }
}

