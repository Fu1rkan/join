const BASE_URL =
  "https://joinda1329-a4df1-default-rtdb.europe-west1.firebasedatabase.app/";

async function loadData() {
  let response = await fetch(BASE_URL + ".json");
  let responseToJson = await response.json();
  console.log(responseToJson);
}

async function postTask(path = "", data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return (responseToJson = await response.json());
}

function checkNPost() {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let dueDate = document.getElementById("date").value;
  let priority = document.getElementById("priority").value;

  if (title.length < 1 || dueDate.length < 1 || priority.length < 1) {
    alert("Please fill in all required fields");
    return;
  } else {
    postTask("", {
      "title": title,
      "description": description,
      "dueDate": dueDate,
      "priority": priority,/* add the other inputs */
    });
  }
}


