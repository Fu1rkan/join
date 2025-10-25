// const BASE_URL =
//   "https://joinda1329-a4df1-default-rtdb.europe-west1.firebasedatabase.app/";

// async function loadData() {
//   let response = await fetch(BASE_URL + ".json");
//   let responseToJson = await response.json();
//   // console.log(responseToJson);
// }

async function postTask(path, data = {}) {    // "user/tasks/", testTasks
  let response = await fetch(BASE_URL + path + ".json", {
    method: "PUT",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return (responseToJson = await response.json());
}

function checkNPost() {
  let title = document.getElementById("title");
  let description = document.getElementById("description").value;
  let dueDate = document.getElementById("date");
  let priority = document.getElementById("priority").value;
  let category = document.getElementById("category_input");

  if (title.value.length < 1 || dueDate.value.length < 1 || category.value.length < 1) {
    requiredNotice(title, "title");
    requiredNotice(dueDate, "due_date");
    requiredNotice(category, "category");

  } else {
    // postTask("", {
    // "name": title.value,
    // "description": description,
    // "date": dueDate.value,
    // "priority": priority,
    // "assigned_to": "placeholder",
    // "category": category.value,
    // "subtask": ["text1", "text2", "text3"],
    //   /* add the other inputs */

    let newestTask = {
      "name": title.value,
      "description": description,
      "date": dueDate.value,
      "priority": priority,
      "assigned_to": "placeholder",
      "categoryType": category.value,
      "category": "to-do",
      "subtask": ["text1", "text2", "text3"],
    }

    testTasks.push(newestTask);
    clearForm();
    console.log(testTasks);
    
    postTask("user/tasks/", testTasks);
    init();

  };
}

function requiredNotice(x, y) {
  let notice = document.getElementById("required_notice_" + y);
  if (x.value.length < 1) {

    x.classList.add("required_input");
    notice.classList.remove("d_none");
  } else {
    x.classList.remove("required_input");
    //  console.log(notice);
    notice.classList.add("d_none");
    // console.log(notice);

  }
}
