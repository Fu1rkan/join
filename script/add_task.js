async function init() {
  addCalender();
  buttonActive('medium')
  await loadTasks();
  await loadContacts();  
}



function openContactlist() {
  const list = document.getElementById("task_contacts");
  list.innerHTML = "";
  // 
  for (let index = 0; index < contacts.length; index++) {
    list.innerHTML += `<li class="single_contact">
  <div class="contactslist-icon-and-name-container">
    <div class="pb_bubble" style="background-color: ${contacts[index]['fillColor']}">
    <p>${contacts[index]['nameLetters']}</p>
    </div>
    <p>${contacts[index]['name']}</p>
  </div>
  <svg class="checkbox" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1.96582" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2" />
  </svg>
</li>`;
  }

  const arrow = document.getElementById("arrow");
  list.classList.add("open");
  arrow.classList.add("arrow_up");
}

function closeContactlist() {
  const list = document.getElementById("task_contacts");
  const arrow = document.getElementById("arrow");
  list.classList.remove("open");
  arrow.classList.remove("arrow_up");
}

function closeProtection(event) {
  event.stopPropagation();
}

function openCategoryList() {
  const list = document.getElementById("categorys");
  const arrow = document.getElementById("arrow2");
  list.classList.add("open");
  arrow.classList.add("arrow_up");
}

function closeCategoryList() {
  const list = document.getElementById("categorys");
  const arrow = document.getElementById("arrow2");
  list.classList.remove("open");
  arrow.classList.remove("arrow_up");
}

function selectCategory(inputValue) {
  let category_input = document.getElementById("category_input");
  category_input.value = inputValue;
}

function capitalizeFirst(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function toLower(str) {
  return str.toLowerCase();
}

function buttonActive(xy) {
  const activeButton = document.getElementById(xy + "_btn");
  const valueTarget = document.getElementById("priority");
  btnReset();
  activeButton.classList.add(xy + "_btn_active");
  let svg = getPrioSVG(xy, true);
  activeButton.innerHTML = ` ${capitalizeFirst(xy)}${svg}`;
  valueTarget.value = xy;
}

function getPrioSVG(xy, active) {
  if (xy === "urgent") return prioUrgentSVG(active);
  if (xy === "medium") return prioMediumSVG(active);
  if (xy === "low") return prioLowSVG(active);
  return "";
}

function btnReset() {
  const btnLow = document.getElementById("low_btn");
  const btnMedium = document.getElementById("medium_btn");
  const btnUrgent = document.getElementById("urgent_btn");
  btnLow.classList.remove("low_btn_active");
  btnMedium.classList.remove("medium_btn_active");
  btnUrgent.classList.remove("urgent_btn_active");
  btnLow.innerHTML = `Low${prioLowSVG(false)}`;
  btnMedium.innerHTML = `Medium${prioMediumSVG(false)}`;
  btnUrgent.innerHTML = `Urgent${prioUrgentSVG(false)}`;
}

function addCalender() {
  const dateInput = document.getElementById("date");
  dateInput.addEventListener("focus", () => {
    dateInput.showPicker?.();
  });
}

function openCalender(id) {
  const dateInput = document.getElementById(id);
  dateInput.focus();
}

document.addEventListener("DOMContentLoaded", () => {
  setupContactClick();
  setupDropdownArrows();
  setupInputFocus();
  setupSubtaskInput();
});

function setupContactClick() {
  document.querySelectorAll('.contacts').forEach(list => {
    list.addEventListener('click', function (e) {
      const contact = e.target.closest('.single_contact');
      if (!contact) return;
      toggleContactActive(contact);
    });
  });
}

function setupDropdownArrows() {
  const arrow = document.getElementById("arrow");
  if (arrow) {
    arrow.addEventListener("click", function (event) {
      event.stopPropagation();
      toggleContactDropdown();
    });
  }
  const arrow2 = document.getElementById("arrow2");
  if (arrow2) {
    arrow2.addEventListener("click", function (event) {
      event.stopPropagation();
      toggleCategoryDropdown();
    });
  }
}

function setupInputFocus() {
  const contactInput = document.querySelector('.asssigned_to input[placeholder="Select contacts to assign"]');
  if (contactInput) {
    contactInput.addEventListener("focus", function (event) {
      event.stopPropagation();
      openContactlist();
    });
  }
  const categoryInput = document.getElementById("category_input");
  if (categoryInput) {
    categoryInput.addEventListener("focus", function (event) {
      event.stopPropagation();
      openCategoryList();
    });
  }
}

function setupSubtaskInput() {
  const subtaskInput = document.getElementById('subtask');
  const subtaskList = document.querySelector('.subtask_list');
  if (!subtaskInput || !subtaskList) return;
  subtaskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSubtaskToList(subtaskInput, subtaskList);
    }
  });
  const checkIcon = document.querySelector('.subtask_input_button svg:nth-child(3)');
  if (checkIcon) {
    checkIcon.addEventListener('click', () => addSubtaskToList(subtaskInput, subtaskList));
  }
  const clearIcon = document.querySelector('.subtask_input_button svg:first-child');
  if (clearIcon) {
    clearIcon.addEventListener('click', () => {
      subtaskInput.value = '';
      subtaskInput.focus();
    });
  }
}

function addSubtaskToList(subtaskInput, subtaskList) {
  const value = subtaskInput.value.trim();
  if (value) {
    subtaskList.appendChild(createSubtaskItem(value));
    subtaskInput.value = '';
  }
}

function createSubtaskItem(value) {
  const wrapper = document.createElement('div');
  wrapper.className = 'subtask_item_wrapper';
  wrapper.innerHTML = getSubtaskHTML(value);
  bindSubtaskEvents(wrapper);
  return wrapper;
}

function bindSubtaskEvents(wrapper) {
  wrapper.querySelector('.subtask-delete-btn').addEventListener('click', () => wrapper.remove());
  const input = wrapper.querySelector('.subtask_item');
  const bullet = wrapper.querySelector('.subtask_bullet');
  const editBtn = wrapper.querySelector('.subtask-edit-btn');
  if (editBtn) editBtn.addEventListener('click', () => startEditSubtask(wrapper, input, bullet));
  input.addEventListener('dblclick', () => startEditSubtask(wrapper, input, bullet));
}

function startEditSubtask(wrapper, input, bullet) {
  if (input.readOnly) {
    input.removeAttribute('readonly');
    input.focus();
    wrapper.classList.add('subtask_item_wrapper_edit');
    if (bullet) bullet.style.visibility = 'hidden';
    replaceEditWithSave(wrapper, input, bullet);
    setTimeout(() => {
      document.addEventListener('mousedown', (e) => handleOutsideEdit(e, wrapper, input, bullet), { once: true });
    }, 0);
  }
}

function replaceEditWithSave(wrapper, input, bullet) {
  const editBtn = wrapper.querySelector('.subtask-edit-btn');
  if (editBtn) {
    editBtn.outerHTML = `<svg class="subtask-save-btn" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" style="cursor:pointer;">
      <path d="M5.69474 9.15L14.1697 0.675C14.3697 0.475 14.6072 0.375 14.8822 0.375C15.1572 0.375 15.3947 0.475 15.5947 0.675C15.7947 0.875 15.8947 1.1125 15.8947 1.3875C15.8947 1.6625 15.7947 1.9 15.5947 2.1L6.39474 11.3C6.19474 11.5 5.96141 11.6 5.69474 11.6C5.42807 11.6 5.19474 11.5 4.99474 11.3L0.694738 7C0.494738 6.8 0.398905 6.5625 0.407238 6.2875C0.415572 6.0125 0.519738 5.775 0.719738 5.575C0.919738 5.375 1.15724 5.275 1.43224 5.275C1.70724 5.275 1.94474 5.375 2.14474 5.575L5.69474 9.15Z" fill="#2A3647"/>
    </svg>`;
    const saveBtn = wrapper.querySelector('.subtask-save-btn');
    if (saveBtn) saveBtn.addEventListener('click', () => finishEditSubtask(wrapper, input, bullet));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') finishEditSubtask(wrapper, input, bullet);
    }, { once: true });
  }
}

function finishEditSubtask(wrapper, input, bullet) {
  input.setAttribute('readonly', true);
  wrapper.classList.remove('subtask_item_wrapper_edit');
  if (bullet) bullet.style.visibility = '';
  const saveBtn = wrapper.querySelector('.subtask-save-btn');
  if (saveBtn) {
    saveBtn.outerHTML = `<svg class="subtask-edit-btn" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" style="cursor:pointer;">
      <path d="M2.14453 17H3.54453L12.1695 8.375L10.7695 6.975L2.14453 15.6V17ZM16.4445 6.925L12.1945 2.725L13.5945 1.325C13.9779 0.941667 14.4487 0.75 15.007 0.75C15.5654 0.75 16.0362 0.941667 16.4195 1.325L17.8195 2.725C18.2029 3.10833 18.4029 3.57083 18.4195 4.1125C18.4362 4.65417 18.2529 5.11667 17.8695 5.5L16.4445 6.925ZM14.9945 8.4L4.39453 19H0.144531V14.75L10.7445 4.15L14.9945 8.4Z" fill="#2A3647"/>
    </svg>`;
    const editBtn = wrapper.querySelector('.subtask-edit-btn');
    if (editBtn) editBtn.addEventListener('click', () => startEditSubtask(wrapper, input, bullet));
    input.addEventListener('dblclick', () => startEditSubtask(wrapper, input, bullet));
  }
}

function handleOutsideEdit(e, wrapper, input, bullet) {
  if (!wrapper.contains(e.target)) {
    finishEditSubtask(wrapper, input, bullet);
  }
}

function toggleContactDropdown() {
  const list = document.getElementById("task_contacts");
  if (list.classList.contains("open")) closeContactlist();
  else openContactlist();
}

function toggleCategoryDropdown() {
  const list = document.getElementById("categorys");
  if (list.classList.contains("open")) closeCategoryList();
  else openCategoryList();
}

function toggleContactActive(contact) {
  const checkbox = contact.querySelector('.checkbox');
  if (contact.classList.contains('active')) {
    contact.classList.remove('active');
    checkbox.innerHTML = `<rect x="1" y="1.96582" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>`;
  } else {
    contact.classList.add('active');
    checkbox.innerHTML = `<path d="M17 8.96582V14.9658C17 16.6227 15.6569 17.9658 14 17.9658H4C2.34315 17.9658 1 16.6227 1 14.9658V4.96582C1 3.30897 2.34315 1.96582 4 1.96582H12" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M5 9.96582L9 13.9658L17 2.46582" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
}

// ...existing code for prioUrgentSVG, prioMediumSVG, prioLowSVG, etc...
function toggleContactDropdown() {
  const list = document.getElementById("task_contacts");
  const arrow = document.getElementById("arrow");
  if (list.classList.contains("open")) {
    closeContactlist();
  } else {
    openContactlist();
  }
}

function toggleCategoryDropdown() {
  const list = document.getElementById("categorys");
  const arrow = document.getElementById("arrow2");
  if (list.classList.contains("open")) {
    closeCategoryList();
  } else {
    openCategoryList();
  }
}

function toggleContactActive(contact) {
  const checkbox = contact.querySelector('.checkbox');
  if (contact.classList.contains('active')) {
    contact.classList.remove('active');
    checkbox.innerHTML = `<rect x="1" y="1.96582" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>`;
  } else {
    contact.classList.add('active');
    // White checkbox_active.svg
  //   checkbox.innerHTML = `<path d="M17 8.96582V14.9658C17 16.6227 15.6569 17.9658 14 17.9658H4C2.34315 17.9658 1 16.6227 1 14.9658V4.96582C1 3.30897 2.34315 1.96582 4 1.96582H12" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M5 9.96582L9 13.9658L17 2.46582" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
}

function clearFormAddTask(id) {
  let formRef = document.getElementById(id);
  formRef.reset();
}


