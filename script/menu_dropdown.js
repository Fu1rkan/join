/**
 * Toggles the visibility of the burger menu with dynamic positioning and outside clicking
 * @description Shows/hides profile menu with responsive positioning based on screen size
 */
function toggleBurgerMenu() {
    let profileMenu = document.getElementById('profile-menu');
    let profileButton = getProfileButtonElement();
    if (profileMenu && profileButton) {
        setMenuPosition(profileMenu, profileButton);
        toggleMenuVisibility(profileMenu);
        if (profileMenu.classList.contains('show')) {
            addOutsideClickListener();
        } else {
            removeOutsideClickListener();
        }
    }
}

/**
 * Updates menu position on window resize events
 * @description Maintains correct positioning when browser window is resized
 */
window.addEventListener('resize', function() {
    let profileMenu = document.getElementById('profile-menu');
    let profileButton = getProfileButtonElement();
    if (profileMenu && profileButton && profileMenu.classList.contains('show')) {
        setMenuPosition(profileMenu, profileButton);
    }
});

/**
 * Handles clicks outside the profile menu to close it
 * @param {Event} event - The click event
 */
function handleOutsideClick(event) {
    let profileMenu = document.getElementById('profile-menu');
    let profileButton = getProfileButtonElement();
    if (profileMenu && profileButton && 
        !profileMenu.contains(event.target) && 
        !profileButton.contains(event.target)) {
        toggleMenuVisibility(profileMenu);
        removeOutsideClickListener();
    }
}

/**
 * Adds outside click event listener with slight delay
 */
function addOutsideClickListener() {
    setTimeout(() => {
        document.addEventListener('click', handleOutsideClick);
    }, 0);
}

/**
 * Removes outside click event listener
 */
function removeOutsideClickListener() {
    document.removeEventListener('click', handleOutsideClick);
}

/**
 * Gets the profile button element by searching for common ID patterns
 * @returns {HTMLElement|null} The profile button element or null if not found
 */
function getProfileButtonElement() {
    let profileIds = [
        'profil_header_summary',
        'profil_header_contacts',
        'profil_header_board',
        'profil_header_add_task',
        'profil_header_help',
        'profil_header_privacy_policy',
        'profil_header_legal_notice'
    ];
    for (let id of profileIds) {
        let element = document.getElementById(id);
        if (element) {
            return element;
        }
    }
    return document.querySelector('.profil-header');
}

/**
 * Sets the position of the profile menu relative to the profile button
 * @param {HTMLElement} profileMenu - The profile menu element
 * @param {HTMLElement} profileButton - The profile button element
 */
function setMenuPosition(profileMenu, profileButton) {
    let buttonRect = profileButton.getBoundingClientRect();
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let offsets = getResponsiveOffsets();
    profileMenu.style.position = 'absolute';
    profileMenu.style.top = (buttonRect.bottom + scrollTop + offsets.top) + 'px';
    profileMenu.style.left = (buttonRect.left + offsets.left) + 'px';
    profileMenu.style.right = 'auto';
}

/**
 * Gets responsive offset values based on current screen width
 * @returns {Object} Object containing top and left offset values
 */
function getResponsiveOffsets() {
    if (window.innerWidth <= 950) {
        return { top: -75, left: 10 };
    } else if (window.innerWidth <= 1400) {
        return { top: -75, left: 10 };
    } else {
        return { top: -75, left: 25 };
    }
}

/**
 * Toggles the visibility state of the profile menu
 * @param {HTMLElement} profileMenu - The profile menu element to toggle
 */
function toggleMenuVisibility(profileMenu) {
    if (profileMenu.classList.contains('show')) {
        profileMenu.classList.remove('show');
        profileMenu.classList.add('hide');
    } else {
        profileMenu.classList.remove('hide');
        profileMenu.classList.add('show');
    }
}