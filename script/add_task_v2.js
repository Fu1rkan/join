let priorityTaskActive = "medium";

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


function selectContact(contact) {
    let contactRef = document.getElementById(contact);
    let svgUncheckedRef = document.getElementById(`${contact}_unchecked`);
    let svgCheckedRef = document.getElementById(`${contact}_checked`);
    contactRef.classList.remove('add-task-form-assigned-to-dropdown-contacts-default-hover-class')
    contactRef.classList.add('add-task-form-assigned-to-dropdown-contacts-checked')
    svgUncheckedRef.classList.add('d_none');
    svgCheckedRef.classList.remove('d_none');
}