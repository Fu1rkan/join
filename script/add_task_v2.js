let PriorityTaskActive = "medium";

function activatePriority(para) {
    PriorityTaskActive ="";
    resetPriorityButtonHighlight();
    let buttonRef = document.getElementById(`add_task_priority_${para}`);
    let svgRef = document.getElementById(`add_task_priority_${para}_svg`);
    if (para == 'urgent') {
        highlightPriorityButton(para, buttonRef, svgRef);
        PriorityTaskActive ="urgent";
    } else if (para == 'medium') {
        highlightPriorityButton(para, buttonRef, svgRef);
        PriorityTaskActive ="medium";
    } else {
        highlightPriorityButton(para, buttonRef, svgRef);
        PriorityTaskActive ="low";
    }  
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