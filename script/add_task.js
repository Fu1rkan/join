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
  activeButton.innerHTML = ` ${capitalizeFirst(xy)}
                  <img src="./assets/svg/Prio_${toLower(
                    xy
                  )}_white.svg" alt="" />
                `;
  valueTarget.value = xy;
}

function btnReset() {
  const btnLow = document.getElementById("low_btn");
  const btnMedium = document.getElementById("medium_btn");
  const btnUrgent = document.getElementById("urgent_btn");
  btnLow.classList.remove("low_btn_active");
  btnMedium.classList.remove("medium_btn_active");
  btnUrgent.classList.remove("urgent_btn_active");
  btnLow.innerHTML = `Low
                  <img src="./assets/svg/Prio_low_green.svg" alt="" />
                `;
  btnMedium.innerHTML = `Medium
                  <img src="./assets/svg/Prio_medium_orange.svg" alt="" />
                `;
  btnUrgent.innerHTML = `Urgent
                  <img src="./assets/svg/Prio_urgent_red.svg" alt="" />
                `;
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

