function init() {
  addCalender();
}

function openContactlist() {
  const list = document.getElementById("contacts");
  const arrow = document.getElementById("arrow");
  list.classList.add("open");
  arrow.classList.add("arrow_up");
}

function closeContactlist() {
  const list = document.getElementById("contacts");
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
  // Use SVG template functions
  let svg;
  if (xy === "urgent") svg = prioUrgentSVG(true);
  else if (xy === "medium") svg = prioMediumSVG(true);
  else if (xy === "low") svg = prioLowSVG(true);
  activeButton.innerHTML = ` ${capitalizeFirst(xy)}${svg}`;
  valueTarget.value = xy;
}

function btnReset() {
  const btnLow = document.getElementById("low_btn");
  const btnMedium = document.getElementById("medium_btn");
  const btnUrgent = document.getElementById("urgent_btn");
  btnLow.classList.remove("low_btn_active");
  btnMedium.classList.remove("medium_btn_active");
  btnUrgent.classList.remove("urgent_btn_active");
  // Use SVG template functions
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

function openCalender() {
  const dateInput = document.getElementById("date");
  dateInput.focus();
}

function addSubtask(){

}

function addSubtask(){

}

document.addEventListener("DOMContentLoaded", () => {
  // Delegate click for all .single_contact elements
  document.querySelectorAll('.contacts').forEach(list => {
    list.addEventListener('click', function (e) {
      const contact = e.target.closest('.single_contact');
      if (!contact) return;
      toggleContactActive(contact);
    });
  });

  // Toggle contacts dropdown on arrow click (open/close)
  const arrow = document.getElementById("arrow");
  if (arrow) {
    arrow.addEventListener("click", function (event) {
      event.stopPropagation();
      toggleContactDropdown();
    });
  }

  // Toggle category dropdown on arrow2 click (open/close)
  const arrow2 = document.getElementById("arrow2");
  if (arrow2) {
    arrow2.addEventListener("click", function (event) {
      event.stopPropagation();
      toggleCategoryDropdown();
    });
  }

  // Prevent input focus from opening and closing at the same time
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

  const subtaskInput = document.getElementById('subtask');
  const subtaskList = document.querySelector('.subtask_list');

  function createSubtaskItem(value) {
    const wrapper = document.createElement('div');
    wrapper.className = 'subtask_item_wrapper';

    // Add a span for the bullet so we can hide/show it
    wrapper.innerHTML = `
      <span class="subtask_bullet">•</span>
      <input class="subtask_item" value="${value}" type="text" readonly />
      <div class="subtask_item_edit">
        <!-- Subtask_edit.svg -->
        <svg class="subtask-edit-btn" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" style="cursor:pointer;">
          <path d="M2.14453 17H3.54453L12.1695 8.375L10.7695 6.975L2.14453 15.6V17ZM16.4445 6.925L12.1945 2.725L13.5945 1.325C13.9779 0.941667 14.4487 0.75 15.007 0.75C15.5654 0.75 16.0362 0.941667 16.4195 1.325L17.8195 2.725C18.2029 3.10833 18.4029 3.57083 18.4195 4.1125C18.4362 4.65417 18.2529 5.11667 17.8695 5.5L16.4445 6.925ZM14.9945 8.4L4.39453 19H0.144531V14.75L10.7445 4.15L14.9945 8.4Z" fill="#2A3647"/>
        </svg>
        <hr />
        <!-- Subtask_delete.svg -->
        <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="subtask-delete-btn" style="cursor:pointer;">
          <path d="M3.14453 18C2.59453 18 2.1237 17.8042 1.73203 17.4125C1.34036 17.0208 1.14453 16.55 1.14453 16V3C0.861198 3 0.623698 2.90417 0.432031 2.7125C0.240365 2.52083 0.144531 2.28333 0.144531 2C0.144531 1.71667 0.240365 1.47917 0.432031 1.2875C0.623698 1.09583 0.861198 1 1.14453 1H5.14453C5.14453 0.716667 5.24036 0.479167 5.43203 0.2875C5.6237 0.0958333 5.8612 0 6.14453 0H10.1445C10.4279 0 10.6654 0.0958333 10.857 0.2875C11.0487 0.479167 11.1445 0.716667 11.1445 1H15.1445C15.4279 1 15.6654 1.09583 15.857 1.2875C16.0487 1.47917 16.1445 1.71667 16.1445 2C16.1445 2.28333 16.0487 2.52083 15.857 2.7125C15.6654 2.90417 15.4279 3 15.1445 3V16C15.1445 16.55 14.9487 17.0208 14.557 17.4125C14.1654 17.8042 13.6945 18 13.1445 18H3.14453ZM3.14453 3V16H13.1445V3H3.14453ZM5.14453 13C5.14453 13.2833 5.24036 13.5208 5.43203 13.7125C5.6237 13.9042 5.8612 14 6.14453 14C6.42786 14 6.66536 13.9042 6.85703 13.7125C7.0487 13.5208 7.14453 13.2833 7.14453 13V6C7.14453 5.71667 7.0487 5.47917 6.85703 5.2875C6.66536 5.09583 6.42786 5 6.14453 5C5.8612 5 5.6237 5.09583 5.43203 5.2875C5.24036 5.47917 5.14453 5.71667 5.14453 6V13ZM9.14453 13C9.14453 13.2833 9.24037 13.5208 9.43203 13.7125C9.6237 13.9042 9.8612 14 10.1445 14C10.4279 14 10.6654 13.9042 10.857 13.7125C11.0487 13.5208 11.1445 13.2833 11.1445 13V6C11.1445 5.71667 11.0487 5.47917 10.857 5.2875C10.6654 5.09583 10.4279 5 10.1445 5C9.8612 5 9.6237 5.09583 9.43203 5.2875C9.24037 5.47917 9.14453 5.71667 9.14453 6V13Z" fill="#2A3647"/>
        </svg>
      </div>
    `;

    // Delete logic
    wrapper.querySelector('.subtask-delete-btn').addEventListener('click', () => {
      wrapper.remove();
    });

    const input = wrapper.querySelector('.subtask_item');
    const bullet = wrapper.querySelector('.subtask_bullet');
    let editing = false;

    function startEdit() {
      if (editing) return;
      editing = true;
      input.removeAttribute('readonly');
      input.focus();
      wrapper.classList.add('subtask_item_wrapper_edit');
      if (bullet) bullet.style.visibility = 'hidden';
      // Replace edit icon with check icon
      const editBtn = wrapper.querySelector('.subtask-edit-btn');
      if (editBtn) {
        editBtn.outerHTML = `
          <svg class="subtask-save-btn" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" style="cursor:pointer;">
            <path d="M5.69474 9.15L14.1697 0.675C14.3697 0.475 14.6072 0.375 14.8822 0.375C15.1572 0.375 15.3947 0.475 15.5947 0.675C15.7947 0.875 15.8947 1.1125 15.8947 1.3875C15.8947 1.6625 15.7947 1.9 15.5947 2.1L6.39474 11.3C6.19474 11.5 5.96141 11.6 5.69474 11.6C5.42807 11.6 5.19474 11.5 4.99474 11.3L0.694738 7C0.494738 6.8 0.398905 6.5625 0.407238 6.2875C0.415572 6.0125 0.519738 5.775 0.719738 5.575C0.919738 5.375 1.15724 5.275 1.43224 5.275C1.70724 5.275 1.94474 5.375 2.14474 5.575L5.69474 9.15Z" fill="#2A3647"/>
          </svg>
        `;
      }
      bindSaveBtn();
      setTimeout(() => {
        document.addEventListener('mousedown', handleOutsideClick);
      }, 0);
    }

    function bindSaveBtn() {
      const saveBtn = wrapper.querySelector('.subtask-save-btn');
      if (saveBtn) {
        saveBtn.addEventListener('click', finishEdit);
      }
      input.addEventListener('keydown', onKey);
    }

    function onKey(e) {
      if (e.key === 'Enter') {
        finishEdit();
      }
    }

    function finishEdit() {
      if (!editing) return;
      editing = false;
      input.setAttribute('readonly', true);
      wrapper.classList.remove('subtask_item_wrapper_edit');
      if (bullet) bullet.style.visibility = '';
      // Replace check icon with edit icon
      const saveBtn = wrapper.querySelector('.subtask-save-btn');
      if (saveBtn) {
        saveBtn.outerHTML = `
          <svg class="subtask-edit-btn" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" style="cursor:pointer;">
            <path d="M2.14453 17H3.54453L12.1695 8.375L10.7695 6.975L2.14453 15.6V17ZM16.4445 6.925L12.1945 2.725L13.5945 1.325C13.9779 0.941667 14.4487 0.75 15.007 0.75C15.5654 0.75 16.0362 0.941667 16.4195 1.325L17.8195 2.725C18.2029 3.10833 18.4029 3.57083 18.4195 4.1125C18.4362 4.65417 18.2529 5.11667 17.8695 5.5L16.4445 6.925ZM14.9945 8.4L4.39453 19H0.144531V14.75L10.7445 4.15L14.9945 8.4Z" fill="#2A3647"/>
          </svg>
        `;
      }
      input.removeEventListener('keydown', onKey);
      const newEditBtn = wrapper.querySelector('.subtask-edit-btn');
      if (newEditBtn) {
        newEditBtn.addEventListener('click', startEdit);
      }
      input.addEventListener('dblclick', startEdit);
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    function handleOutsideClick(e) {
      if (!wrapper.contains(e.target)) {
        finishEdit();
      }
    }

    // Initial bindings
    const editBtn = wrapper.querySelector('.subtask-edit-btn');
    if (editBtn) {
      editBtn.addEventListener('click', startEdit);
    }
    input.addEventListener('dblclick', startEdit);

    return wrapper;
  }

  function addSubtask() {
    const value = subtaskInput.value.trim();
    if (value) {
      subtaskList.appendChild(createSubtaskItem(value));
      subtaskInput.value = '';
    }
  }

  // Add on Enter key
  subtaskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSubtask();
    }
  });

  // Add on check icon click
  const checkIcon = document.querySelector('.subtask_input_button svg:nth-child(3)');
  if (checkIcon) {
    checkIcon.addEventListener('click', addSubtask);
  }

  // Clear input on "X" icon click
  const clearIcon = document.querySelector('.subtask_input_button svg:first-child');
  if (clearIcon) {
    clearIcon.addEventListener('click', () => {
      subtaskInput.value = '';
      subtaskInput.focus();
    });
  }
});

function toggleContactDropdown() {
  const list = document.getElementById("contacts");
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
    checkbox.innerHTML = `<path d="M17 8.96582V14.9658C17 16.6227 15.6569 17.9658 14 17.9658H4C2.34315 17.9658 1 16.6227 1 14.9658V4.96582C1 3.30897 2.34315 1.96582 4 1.96582H12" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M5 9.96582L9 13.9658L17 2.46582" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
}

