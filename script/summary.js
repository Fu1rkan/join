// Show and hide animated overlay for responsive/mobile devices when coming from login
function checkAndShowOverlay() {
    let urlParams = new URLSearchParams(window.location.search);
    let showOverlay = urlParams.get('showOverlay');
    let loginType = urlParams.get('loginType');

    if (showOverlay === 'true' && window.innerWidth < 900) {
        let overlay = document.getElementById('animated_overlay_id');
            if (loginType === 'guest') {
                overlay.innerHTML = summaryGuestOverlayTemplate();
            } else {
                overlay.innerHTML = summaryOverlayTemplate();
            }
            setTimeout(() => {
                updateGreeting();
            }, 100);
            overlay.classList.add('show');
            setTimeout(() => {
                overlay.classList.remove('show');
            }, 3000);
    }
    let newUrl = window.location.pathname;
    window.history.replaceState(null, '', newUrl);
}

function openBoard() {
    window.location.href = './board.html';
}

checkAndShowOverlay();/** Greeting changed by time*/
function getGreetingByHour(h) {
    if (h >= 5 && h <= 11) return "Good morning,";
    if (h >= 12 && h <= 16) return "Good afternoon,";
    if (h >= 17 && h <= 21) return "Good evening,";
    return "Good night,";
}
// Update greeting every minute
function updateGreeting() {
    let now = new Date();
    let hour = now.getHours();
    document.getElementById("greeting-text").textContent = getGreetingByHour(hour);
}

updateGreeting();
setInterval(updateGreeting, 60);



// Menu Toggle function
document.addEventListener('DOMContentLoaded', function () {
    let profileButton = document.getElementById('profile-toggle');
    let profileMenu = document.getElementById('profile-menu');

    // Toggle Menu click action
    profileButton.addEventListener('click', function () {
        profileMenu.classList.toggle('show');
    });

    // Menu close when clicking outside
    document.addEventListener('click', function (event) {
        if (!profileMenu.contains(event.target) && !profileButton.contains(event.target)) {
            profileMenu.classList.remove('show');
        }
    });
});

// stop propagation on menu click
function stopPropagation(event) {
    event.stopPropagation();
}