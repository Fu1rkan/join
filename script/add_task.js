function openContactlist() {
  const list = document.getElementById("contacts");
  list.classList.add("open");
}

function closeContactlist() {
  const list = document.getElementById("contacts");
  list.classList.remove("open");
}

function closeProtection(event) {
  event.stopPropagation();
}
