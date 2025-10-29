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
    let contactRef = document.getElementById(`add_task_assigned_to_contact_${index}`);
    let svgUncheckedRef = document.getElementById(`${index}_unchecked`);
    let svgCheckedRef = document.getElementById(`${index}_checked`);
    contactRef.classList.toggle('add-task-form-assigned-to-dropdown-contacts-default-hover-class');
    contactRef.classList.toggle('add-task-form-assigned-to-dropdown-contacts-checked');
    svgUncheckedRef.classList.toggle('d_none');
    svgCheckedRef.classList.toggle('d_none');
    if (currentAssignedTo.includes(contacts[index])) {
        currentAssignedTo.splice(currentAssignedTo.findIndex(contact => contact.name == contacts[index].name && contact.email == contacts[index].email), 1);
    } else {
        currentAssignedTo.push(contacts[index]);
    }
    renderCurrentAssignedTo();
}

function renderCurrentAssignedTo() {
    let currentAssignedToSectionRef = document.getElementById('add_task_form_assigned_to_section');
    let currentAssignedToListRef = document.getElementById('current_assigned_to_contacts');
    currentAssignedToSectionRef.classList.remove('h-130');
    currentAssignedToListRef.classList.add('d_none');
    currentAssignedToListRef.innerHTML = "";
    if (currentAssignedTo.length > 0) {
        currentAssignedToSectionRef.classList.add('h-130');
        currentAssignedToListRef.classList.remove('d_none');
        for (let index = 0; index < 4; index++) {
            currentAssignedToListRef.innerHTML += getCurrentAssignedContactTemplate(index);
        }
        if (currentAssignedTo.length > 4) {
            currentAssignedToListRef.innerHTML += `+${currentAssignedTo.length - 4}`;
        }
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
    const addTaskAssignedToList = document.getElementById('add_task_form_assigned_to_dropdown_contacts');
    addTaskAssignedToList.innerHTML = "";
    if (currentAssignedTo.length === 0) {
        for (let index = 0; index < contacts.length; index++) {
            addTaskAssignedToList.innerHTML += getAddTaskAssignedToListItem(index);
        }
        return;
    }
    renderChangedContaktList(addTaskAssignedToList);
}

function renderChangedContaktList(addTaskAssignedToList) {
    const activeContactIndices = contacts
        .map((contact, i) => (currentAssignedTo.includes(contact) ? i : -1))
        .filter(i => i !== -1);

    for (let i = 0; i < contacts.length; i++) {
        if (activeContactIndices.includes(i)) {
            addTaskAssignedToList.innerHTML += getAddTaskAssignedToListItem(i);
            markAsChecked(i);
        } else {
            addTaskAssignedToList.innerHTML += getAddTaskAssignedToListItem(i);
        }
    }
}

function markAsChecked(i) {
    let contactRef = document.getElementById(`add_task_assigned_to_contact_${i}`);
    let svgUncheckedRef = document.getElementById(`${i}_unchecked`);
    let svgCheckedRef = document.getElementById(`${i}_checked`);
    contactRef.classList.add('add-task-form-assigned-to-dropdown-contacts-checked');
    svgUncheckedRef.classList.add('d_none');
    svgCheckedRef.classList.remove('d_none');
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

function changeCurrentSubtask(index) {
    let subtaskListItemRef = document.getElementById(`current_subtask_li_${index}`);
    let currentSubtaskValue = document.getElementById(`current_subtask_${index}`);
    let currentSubtaskChangeLabelRef = document.getElementById(`label_current_subtask_${index}`);
    let currentSubtaskChangeinputRef = document.getElementById(`change_current_element_${index}`);
    subtaskListItemRef.classList.add('list-style-none');
    subtaskListItemRef.classList.remove('add-task-form-subtasks-dropdown-subtasks-list-item');
    currentSubtaskValue.classList.add('d_none');
    currentSubtaskChangeLabelRef.classList.remove('d_none');
    currentSubtaskChangeinputRef.value = currentSubtaskValue.innerText
}

function highlightInputFields(activeInputField) {
    let inputFieldRef = document.getElementById(activeInputField);
    let inputFieldAddFormCalenderRef = document.getElementById('add_task_due_date_label_placeholder_svg');
    let inputFieldAddFormSubtasksBtnsRef = document.getElementById('add_task_form_subtasks_btns');
    inputFieldAddFormCalenderRef.classList.remove('d_none');
    inputFieldAddFormSubtasksBtnsRef.classList.add('d_none');
    removeHighlightInputFields();
    inputFieldRef.classList.add('add-task-inputfield-highlight');
    switchHighlightInputFields(activeInputField, inputFieldAddFormSubtasksBtnsRef, inputFieldAddFormCalenderRef);
}

function switchHighlightInputFields(activeInputField, inputFieldAddFormSubtasksBtnsRef, inputFieldAddFormCalenderRef) {
    switch (activeInputField) {
        case "add_task_subtasks":
            inputFieldAddFormSubtasksBtnsRef.classList.remove('d_none');
            break;
        case "add_task_due_date":
            inputFieldAddFormCalenderRef.classList.add('d_none');
            break;
        default:
            break;
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
            "name": subtasksInputField.value,
            "status": false
        }
    );
    resetAddTaskSubtasksInputField();
    renderCurrentCreatedSubtasks();
}

function renderCurrentCreatedSubtasks() {
    let subtasksContentList = document.getElementById('add_task_form_subtasks_dropdown_subtasks');
    subtasksContentList.innerHTML = "";
    for (let index = 0; index < currentCreatedSubtasks.length; index++) {
        subtasksContentList.innerHTML += getSubtaskTemplate(index);
    }
}

function deleteCurrentSubtask(index) {
    currentCreatedSubtasks.splice(index, 1);
    renderCurrentCreatedSubtasks();
}

function saveChangedSubtask(index) {
    let subtaskListRef = document.getElementById('add_task_form_subtasks_dropdown_subtasks');
    let inputChangedSubtaskRef = document.getElementById(`change_current_element_${index}`);
    let labelChangedSubtaskRef = document.getElementById(`label_current_subtask_${index}`);
    let valueChangedSubtaskRef = document.getElementById(`current_subtask_${index}`);
    currentCreatedSubtasks[index].name = inputChangedSubtaskRef.value;
    subtaskListRef.classList.remove('list-style-none');
    renderCurrentCreatedSubtasks();
}

function createNewTask() {
    let titleRef = document.getElementById('add_task_title');
    let descriptionRef = document.getElementById('add_task_description');
    let dueDateRef = document.getElementById('add_task_due_date');
    checkArrayLength();
    checkValuesAndPushNewObject(titleRef, descriptionRef, dueDateRef);
    resetGlobalVariables();
    clearForm();
    init();
    activatePriority();
    postTask("user/tasks/", taskList);
}

function checkArrayLength() {
    if (currentAssignedTo.length == 0 && currentCreatedSubtasks.length == 0) {
        currentAssignedTo = false;
        currentCreatedSubtasks = false;
    } else if (currentAssignedTo.length == 0) {
        currentAssignedTo = false;
    } else if (currentCreatedSubtasks.length == 0) {
        currentCreatedSubtasks = false;
    }
}

function checkValuesAndPushNewObject(titleRef, descriptionRef, dueDateRef) {
    if (titleRef.value != "" && dueDateRef.value != "" && currentChoosedCategory != "") {
        pushNewObject(titleRef, descriptionRef, dueDateRef);
    }
}

function pushNewObject(titleRef, descriptionRef, dueDateRef) {
    taskList.push(
        {
            "id": taskList.length,
            "name": titleRef.value,
            "description": descriptionRef.value,
            "date": dueDateRef.value,
            "priority": priorityTaskActive,
            "category": "to-do",
            "type": currentChoosedCategory,
            "participants": currentAssignedTo,
            "subtasks": currentCreatedSubtasks
        }
    )
}

function resetGlobalVariables() {
    priorityTaskActive = "medium";
    currentAssignedTo = [];
    currentChoosedCategory = "";
    currentCreatedSubtasks = [];
}

function clearForm() {
    let formRef = document.getElementById('add_task_form');
    formRef.reset();
    activatePriority();
}

function closeDropdownMenus(ev) {
    let inputFieldAssignedToRef = document.getElementById('add_task_assigned_to');
    let inputFieldAssignedToContactListRef = document.getElementById('add_task_form_assigned_to_dropdown_contacts');
    let inputFieldCategoryRef = document.getElementById('add_task_category');
    let inputFieldCategoryListRef = document.getElementById('add_task_form_category_dropdown_category');
    let addTaskAssignedToArrow = document.getElementById('add_task_form_assigned_to_arrow_svg');
    let addTaskCategoryArrowRef = document.getElementById('add_task_form_category_arrow_svg');
    let addTaskSubtasksBtnsRef = document.getElementById('add_task_form_subtasks_btns');
    closeMenus(ev, inputFieldAssignedToRef, inputFieldAssignedToContactListRef, inputFieldCategoryRef, inputFieldCategoryListRef, addTaskAssignedToArrow, addTaskCategoryArrowRef, addTaskSubtasksBtnsRef);
    removeHighlightInputFields();
}

function closeMenus(ev, inputFieldAssignedToRef, inputFieldAssignedToContactListRef, inputFieldCategoryRef, inputFieldCategoryListRef, addTaskAssignedToArrow, addTaskCategoryArrowRef, addTaskSubtasksBtnsRef) {
    if (!inputFieldAssignedToRef.contains(ev.target) && !inputFieldAssignedToContactListRef.contains(ev.target) || !inputFieldCategoryRef.contains(ev.target) && !inputFieldCategoryListRef.contains(ev.target)) {
        inputFieldAssignedToContactListRef.classList.add('d_none');
        inputFieldCategoryListRef.classList.add('d_none');
        addTaskAssignedToArrow.classList.remove('add-task-form-assigned-to-arrow-up-svg');
        addTaskCategoryArrowRef.classList.remove('add-task-form-assigned-to-arrow-up-svg');
        addTaskSubtasksBtnsRef.classList.add('d_none');
    }
}
