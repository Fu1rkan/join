function getCurrentAssignedContactTemplate(index) {
    return `<div class="current-assigned-to-contact" style="background-color:${currentAssignedTo[index].fillColor}">
                                        <p>${currentAssignedTo[index].nameLetters}</p>
                                    </div>`
}

function getAddTaskAssignedToActiveListItem(index) {
    return `<li id="add_task_assigned_to_contact_${index}"
                                            class="add-task-form-assigned-to-dropdown-contacts-checked"
                                            onclick="selectContact(${index})">
                                            <div class="add-task-form-assigned-to-dropdown-list-contact">
                                                <div class="add-task-form-assigned-to-dropdown-contacts-icon" style="background-color:${contacts[index].fillColor}">
                                                    <p>${contacts[index].nameLetters}</p>
                                                </div>
                                                <p>${contacts[index].name}</p>
                                            </div>
                                            <div id="${index}_unchecked" class="d_none">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none">
                                                    <rect x="4" y="4" width="16" height="16" rx="3" stroke="#2A3647"
                                                        stroke-width="2" />
                                                </svg>
                                            </div>
                                            <div id="${index}_checked" class="">
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

function getAddTaskAssignedToListItem(index) {
    return `<li id="add_task_assigned_to_contact_${index}"
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

function getSubtaskTemplate(index) {
    return `<li id="current_subtask_li_${index}" onclick="changeCurrentSubtask(${index})"
                                            class="add-task-form-subtasks-dropdown-subtasks-list-item">
                                            <div class="add-task-form-subtasks-dropdown-subtasks-item">
                                                <p id="current_subtask_${index}"
                                                    class="add-task-form-subtasks-dropdown-subtasks-list-item-subtask-title">${currentCreatedSubtasks[index].name}</p>
                                                <label id="label_current_subtask_${index}" for="change_current_element_${index}"
                                                    class="d_none" onclick="event.stopPropagation()">
                                                    <input id="change_current_element_${index}" type="text"
                                                        class="add-task-form-subtasks-dropdown-subtasks-list-item-subtask-input">
                                                    <section class="add_task_form_subtasks_dropdown_subtasks-btns">
                                                        <button onclick="deleteCurrentSubtask(${index})">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                height="24" viewBox="0 0 24 24" fill="none">
                                                                <mask id="mask0_75601_14777" style="mask-type:alpha"
                                                                    maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                                                                    height="24">
                                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                                </mask>
                                                                <g mask="url(#mask0_75601_14777)">
                                                                    <path
                                                                        d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z"
                                                                        fill="#2A3647" />
                                                                </g>
                                                            </svg>
                                                        </button>
                                                        <div class="add-task-subtasks-dropdown-subtasks-item-seperator">
                                                        </div>
                                                        <button onclick="saveChangedSubtask(${index})">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                height="24" viewBox="0 0 24 24" fill="none">
                                                                <mask id="mask0_75601_14779" style="mask-type:alpha"
                                                                    maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                                                                    height="24">
                                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                                </mask>
                                                                <g mask="url(#mask0_75601_14779)">
                                                                    <path
                                                                        d="M9.55021 15.15L18.0252 6.675C18.2252 6.475 18.4627 6.375 18.7377 6.375C19.0127 6.375 19.2502 6.475 19.4502 6.675C19.6502 6.875 19.7502 7.1125 19.7502 7.3875C19.7502 7.6625 19.6502 7.9 19.4502 8.1L10.2502 17.3C10.0502 17.5 9.81687 17.6 9.55021 17.6C9.28354 17.6 9.05021 17.5 8.85021 17.3L4.55021 13C4.35021 12.8 4.25437 12.5625 4.26271 12.2875C4.27104 12.0125 4.37521 11.775 4.57521 11.575C4.77521 11.375 5.01271 11.275 5.28771 11.275C5.56271 11.275 5.80021 11.375 6.00021 11.575L9.55021 15.15Z"
                                                                        fill="#2A3647" />
                                                                </g>
                                                            </svg>
                                                        </button>
                                                    </section>
                                                </label>

                                            </div>
                                        </li>`
}