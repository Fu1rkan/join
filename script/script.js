async function init() {
    await getUsers();
}


function stopPropagation(event) {
    event.stopPropagation();
}

// Toggle Burger Menu functionality
function toggleBurgerMenu() {
    let menu = document.getElementById('profile-menu');
    if (menu.classList.contains('show')) {
        menu.classList.remove('show');
        menu.classList.add('hide');
        setTimeout(() => {
            if (menu.classList.contains('hide')) {
                menu.classList.remove('hide');
            }
        }, 300);
    } else {
        menu.classList.add('show');
    }
}


function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}