/**
 * Opens the contact overlay by removing the hidden class
 * Makes the overlay visible to the user
*/
function openOverlay() {
    overlayRef.classList.remove('d_none');
}

/**
 * Closes the contact overlay by adding the hidden class
 * Hides the overlay from the user view and cleans up event listeners
 */
function closeOverlay() {
    overlayRef.classList.add('d_none');
    // Remove Enter key listener when closing overlay
    removeEnterKeyContactListener();
}

/**
 * Removes active class from all contact elements and restores hover class
 * Deselects all contacts in the contact list
 */
function removeActiveClass() {
    document.querySelectorAll("#contact_list li > div").forEach(el => {
        el.classList.remove("active-contact");
        el.classList.add("contact-container-hoverclass");
    });
}

/**
 * Highlights selected contact and opens/closes contact template
 * @param {HTMLElement} contactCardRef - The DOM element of the contact card
 * @param {Object} contactRef - The contact object with contact data
 * @param {boolean} isActive - Whether the contact is currently active
 */
function highlightContactAndOpenContactTemplate(contactCardRef, contactRef, isActive) {
    if (!isActive) {
        contactCardRef.classList.add("active-contact");
        contactCardRef.classList.remove("contact-container-hoverclass");
        templateRef.classList.remove("d_none");
        templateRef.innerHTML = getContactTemplate(contactRef);
    } else {
        contactCardRef.classList.remove("active-contact");
        contactCardRef.classList.add("contact-container-hoverclass");
        templateRef.classList.add("d_none");
    }
}

/** * Updates the contact template display and highlights the changed contact
 * Updates the contact template display and highlights the changed contact
 * @param {Object} contactRef - The updated contact object
 */
function showChangedTemplateAndHiglightIt(contactRef) {
    templateRef.innerHTML = getContactTemplate(contactRef);
    const contactInfoBigTemplateRef = document.getElementById('contact_info_big_template');
    contactInfoBigTemplateRef.classList.remove('fade-in-template');
    highlightChangedContact(contactRef);
}

/** * Highlights the changed contact in the contact list
 * @param {Object} contactRef - The updated contact object
 */
function highlightChangedContact(contactRef) {
    removeActiveClass();
    const firstLetter = contactRef.name.trim().charAt(0).toUpperCase();
    const groupedContacts = builtAcc();
    const index = groupedContacts[firstLetter].findIndex(
        c => c.name === contactRef.name && c.email === contactRef.email
    );
    highlightContact(firstLetter, index);
}

/** * Displays a temporary creation message with fade-in/out animation by setTimeout
 */
function fadeInCreateMsg() {
    let createMsgRef = document.getElementById('create_Msg');
    createMsgRef.classList.remove('animate-out');
    createMsgRef.classList.add('animate-in');
    createMsgRef.classList.remove('d_none');
    setTimeout(() => {
        setTimeout(() => {
            createMsgRef.classList.remove('animate-in');
            createMsgRef.classList.add('animate-out');
            setTimeout(() => {
                createMsgRef.classList.add('d_none');
            }, 300);
        }, 1000);
    }, 800);
}

/** * Displays the created contact template and handles responsive view
 * @param {Object} newContact - The newly created contact object
 */
function showCreatedContactTemplate(newContact) {
    let currentWidth = window.innerWidth;
    if (currentWidth <= 960) {
        contactListAreaRef.classList.add('d_none');
        contactAreaRef.style.display = "flex";
    }
    templateRef.classList.remove("d_none");
    templateRef.innerHTML = getContactTemplate(newContact);
    setTimeout(() => {
        fadeInCreateMsg();
    }, 800);
}

/**
 * Returns to the contact list view from contact details
 * Shows contact list and hides contact details on mobile devices
 */
function backToContactList() {
    contactListAreaRef.classList.remove('d_none');
    contactAreaRef.style.display = "";
    removeActiveClass();
}

/**
 * Opens the responsive contact edit menu for mobile devices
 * @param {string} name - The contact's name
 * @param {string} email - The contact's email
 * @param {string} phone - The contact's phone number
 */
function openResponsiveContactEditMenu(name, email, phone) {
    let toEditContact = contacts.find(c => c.name == name && c.email == email);
    overlayRef.classList.remove('d_none', 'overlay-contacts-bckgrnd-animation');
    overlayContentRef.innerHTML = showContactEditCard(toEditContact);
    const overlayCardRef = document.getElementById('overlay_edit_contact_card_container'); // ist der neue Container um die Card
    const smallResponsivMenuRef = document.getElementById('responsiv_contact_edit_small_menu');
    overlayCardRef.classList.add('d_none');
    smallResponsivMenuRef.classList.remove('animate-smallMenuOut');
    smallResponsivMenuRef.classList.remove('d_none');
    smallResponsivMenuRef.classList.add('animate-smallMenuIn');
    // Setup Enter key functionality for the edit form
    setupEnterKeyContact(toEditContact.name, toEditContact.email);
}

/**
 * Closes the responsive contact edit menu with animation
 * @param {number} time - Animation duration in milliseconds (default: 290)
 */
function closeResponsiveContactEditMenu(time = 290) {
    if (contactListAreaRef.classList.contains('d_none')) {
        const smallResponsivMenuRef = document.getElementById('responsiv_contact_edit_small_menu');
        if (!smallResponsivMenuRef.classList.contains('d_none')) {
            const smallResponsivMenuRef = document.getElementById('responsiv_contact_edit_small_menu');
            smallResponsivMenuRef.classList.remove('animate-smallMenuIn');
            smallResponsivMenuRef.classList.add('animate-smallMenuOut');
            setTimeout(() => {
                smallResponsivMenuRef.classList.add('d_none');
                // Remove Enter key listener when closing overlay
                removeEnterKeyContactListener();
                closeOverlay();
            }, time);
        }
    }
}

/**
 * Sets up Enter key functionality for contact forms (both editing and creating)
 * Allows saving contact changes or creating new contacts by pressing Enter key in any input field
 * Automatically removes previous event listeners to prevent duplicates
 * @param {string} originalName - The original contact name for identification (used in edit mode)
 * @param {string} originalEmail - The original contact email for identification (used in edit mode)
 * @param {string} editForm - The form mode: "edit" for editing existing contacts, other values for creating new contacts
 */
function setupEnterKeyContact(originalName, originalEmail, editForm = "edit") {
    document.removeEventListener('keypress', handleEnterKeyForContact);
    function handleEnterKeyForContact(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (editForm == "edit") {
                saveChangedContact(originalName, originalEmail);
            } else {
                createNewContact(originalName, originalEmail)
            }
        }
    }
    document.addEventListener('keypress', handleEnterKeyForContact);
    setupEnterKeyContact.currentHandler = handleEnterKeyForContact;
}

/**
 * Removes the Enter key event listener for contact editing
 * Cleans up the event listener to prevent memory leaks
 */
function removeEnterKeyContactListener() {
    if (setupEnterKeyContact.currentHandler) {
        document.removeEventListener('keypress', setupEnterKeyContact.currentHandler);
        setupEnterKeyContact.currentHandler = null;
    }
}