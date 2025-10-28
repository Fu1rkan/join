let testContacts = [
    {
        "name": "Anton Mayer",
        "email": "antonm@gmail.com",
        "phone": "+49 1111 111 11 1", "fillColor": "rgba(255, 122, 0, 1)",
        "nameLetters": "AM"
    },
    {
        "name": "Anja Schulz",
        "email": "schulz@gmail.com",
        "phone": "+49 2222 222 22 2",
        "fillColor": "rgba(147, 39, 255, 1)",
        "nameLetters": "AS"
    },
    {
        "name": "Benedikt Ziegler", "email": "benedikt@gmail.com",
        "phone": "+49 3333 333 33 3",
        "fillColor": "rgba(110, 82, 255, 1)",
        "nameLetters": "BZ"
    },
    {
        "name": "David Eisenberg",
        "email": "davidberg@gmail.com",
        "phone": "+49 4444 444 44 4",
        "fillColor": "rgba(252, 113, 255, 1)",
        "nameLetters": "DE"
    },
    {
        "name": "Eva Fischer",
        "email": "eva@gmail.com",
        "phone": "+49 5555 555 55 5",
        "fillColor": "rgba(255, 187, 43, 1)",
        "nameLetters": "EF"
    },
    {
        "name": "Emmanuel Mauer",
        "email": "emmanuelma@gmail.com",
        "phone": "+49 6666 666 66 6",
        "fillColor": "rgba(31, 215, 193, 1)",
        "nameLetters": "EM"
    },
    {
        "name": "Marcel Bauer",
        "email": "bauer@gmail.com",
        "phone": "+49 7777 777 77 7",
        "fillColor": "rgba(31, 215, 77, 1)",
        "nameLetters": "MB"
    },
    {
        "name": "Tatjana Wolf",
        "email": "wolf@gmail.com",
        "phone": "+49 8888 888 88 8",
        "fillColor": "rgba(71, 31, 215, 1)",
        "nameLetters": "TW"
    }
]


let priorityTaskActive = "medium";
let currentAssignedTo = [];

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
    if(currentAssignedTo.includes(testContacts[index])) {
        currentAssignedTo.splice(currentAssignedTo.findIndex(contact => contact.name == testContacts[index].name && contact.email == testContacts[index].email) ,1);
    } else {
        currentAssignedTo.push(testContacts[index]);
    }
    console.log(currentAssignedTo);
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
    for (let index = 0; index < testContacts.length; index++) {
        addTaskAssignedToList.innerHTML += getAddTaskAssignedToListItem(testContacts, index);
    }
}

function getAddTaskAssignedToListItem(testContacts, index) {
    return `<li id="${index}"
                                            class="add-task-form-assigned-to-dropdown-contacts-default-hover-class"
                                            onclick="selectContact(${index})">
                                            <div class="add-task-form-assigned-to-dropdown-list-contact">
                                                <div class="add-task-form-assigned-to-dropdown-contacts-icon" style="background-color:${testContacts[index].fillColor}">
                                                    <p>${testContacts[index].nameLetters}</p>
                                                </div>
                                                <p>${testContacts[index].name}</p>
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