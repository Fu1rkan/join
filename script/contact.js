const overlayRef = document.getElementById("overlay_contacts");
const overlayContentRef = document.getElementById('overlay_contacts_content');
const contactListAreaRef = document.getElementById('contact_list_area');
const contactListRef = document.getElementById("contact_list");
const contactAreaRef = document.getElementById('contact_area');
const templateRef = document.getElementById("contact_template");

/**
 * Initializes the contacts page with data loading and UI setup
 * Loads contacts, renders profile header icon, and filters/displays contacts
 * @returns {Promise<void>} Promise that resolves when initialization is complete
*/
async function initContacts() {
    await loadContacts();
    rederProfilHeaderIcon('profil_header_contacts');
    filterContacts();
}

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
 * Toggles contact selection and displays contact details
 * @param {string} name - The contact's name
 * @param {string} email - The contact's email address
 * @param {string} keys - The letter key for grouping contacts
 * @param {number} index - The index of the contact in the group
 */
function toggleContact(name, email, keys, index) {
    const contactCardRef = document.getElementById(`letter_${keys}_${index}`);
    const contactRef = contacts.find(t => t.name === name && t.email === email);
    const isActive = contactCardRef.classList.contains("active-contact");
    let currentWidth = window.innerWidth;
    if (currentWidth <= 960) {
        contactListAreaRef.classList.add('d_none');
        contactAreaRef.style.display = "flex";
    }
    removeActiveClass();
    highlightContactAndOpenContactTemplate(contactCardRef, contactRef, isActive);
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

/**
 * Updates the contact object with new values
 * @param {Object} contactRef - The contact object to update
 * @param {string} createName - The new contact name
 * @param {string} createEmail - The new contact email
 * @param {string} createPhone - The new contact phone
 */
function changeEditedContact(contactRef, createName, createEmail, createPhone) {
    contactRef.name = createName;
    contactRef.email = createEmail;
    contactRef.phone = createPhone;
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

/**
 * Filters and displays contacts grouped by first letter
 * Creates grouped contact structure and renders the contact list
 */
function filterContacts() {
    const groupedContacts = builtAcc();
    renderContacts(groupedContacts);
}

/**
 * Builds an accumulator object grouping contacts by first letter of name
 * @returns {Object} Object with letters as keys and contact arrays as values
 */
function builtAcc() {
    return contacts.reduce((acc, contact) => {
        const firstLetter = contact.name.trim().charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(contact);
        return acc;
    }, {});
}

/**
 * Renders the contact list from grouped contacts data
 * @param {Object} groupedContacts - Contacts grouped by first letter
 */
function renderContacts(groupedContacts) {
    let keys = Object.keys(groupedContacts);
    renderContactList(keys);

    for (let index = 0; index < keys.length; index++) {
        let listRef = document.getElementById(`letter_${keys[index].toLowerCase()}`);
        listRef.innerHTML = "";

        for (let i = 0; i < groupedContacts[keys[index]].length; i++) {
            listRef.innerHTML += getSmallContactTemplate(groupedContacts[keys[index]], i, keys[index].toLowerCase());
        }
    }
}

/**
 * Renders the alphabetical contact list structure
 * @param {Array} keys - Array of letters that have contacts
 */
function renderContactList(keys) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    contactListRef.innerHTML = "";
    alphabet.forEach(letter => {
        const section = document.createElement("section");
        section.innerHTML = contactListTemplates(keys, letter);
        contactListRef.appendChild(section);
    });
}

/**
 * Removes highlight from form labels and hides required messages
 * Resets form validation visual feedback to default state
 */
function removeHiglightFromLabelsAndHideRequiredMsg() {
    document.querySelectorAll('.create-form-label').forEach(el => el.classList.remove('create-form-label-highlight'));
    document.querySelectorAll('.create-form-inputfields-required-msg').forEach(el => el.classList.add('d_none'));
}

/**
 * Validates phone number format (numbers only)
 * @param {string} createPhone - The phone number to validate
 * @returns {boolean} True if phone contains only numbers, false otherwise
 */
function checkPhoneValue(createPhone) {
    return /^[0-9]+$/.test(createPhone);
}

/**
 * Validates name format (must start with a letter)
 * @param {string} createName - The name to validate
 * @returns {boolean} True if name starts with a letter, false otherwise
 */
function checkNameValue(createName) {
    return /^[A-Za-z]/.test(createName);
}

/** * Highlights required input fields based on validation results
 * @param {string} createName - The name input value
 * @param {string} createEmail - The email input value
 * @param {string} createPhone - The phone input value
 * @param {boolean} correctPhoneValue - Whether the phone input is valid
 * @param {boolean} correctNameValue - Whether the name input is valid
 * @param {HTMLElement} createFormLabelNameRef - The name label element
 * @param {HTMLElement} createNameRequiredMsg - The name error message element
 * @param {HTMLElement} createFormLabelEmailRef - The email label element
 * @param {HTMLElement} createEmailRequiredMsg - The email error message element
 * @param {HTMLElement} createFormLabelPhoneRef - The phone label element
 * @param {HTMLElement} createPhoneRequiredMsg - The phone error message element
 */
function highlightRequiredInputs(createName, createEmail, createPhone, correctPhoneValue, correctNameValue, createFormLabelNameRef, createNameRequiredMsg, createFormLabelEmailRef, createEmailRequiredMsg, createFormLabelPhoneRef, createPhoneRequiredMsg) {
    if (!(createName != "")) {
        createNameRequiredMsg.innerText = "This field is required";
        showRequiredMsgAndHighlight(createFormLabelNameRef, createNameRequiredMsg);
    } else if (!correctNameValue) {
        createNameRequiredMsg.innerText = "First Sign must be a Letter";
        showRequiredMsgAndHighlight(createFormLabelNameRef, createNameRequiredMsg);
    }
    if (!(createEmail != "")) {
        createEmailRequiredMsg.innerText = "This field is required";
        showRequiredMsgAndHighlight(createFormLabelEmailRef, createEmailRequiredMsg);
    } else if (!(createEmail != "" && createEmail.includes("@"))) {
        createEmailRequiredMsg.innerText = "Email must include '@'";
        showRequiredMsgAndHighlight(createFormLabelEmailRef, createEmailRequiredMsg);
    }
    if (createPhone != "" && !(createPhone == "" || correctPhoneValue)) {
        showRequiredMsgAndHighlight(createFormLabelPhoneRef, createPhoneRequiredMsg);
    }
}

/** * Shows required message and highlights the target label
 * @param {HTMLElement} target - The label element to highlight
 * @param {HTMLElement} targetMsg - The error message element to show
 */
function showRequiredMsgAndHighlight(target, targetMsg) {
    target.classList.add('create-form-label-highlight');
    targetMsg.classList.remove('d_none');
}

/** * Finds the newest contact and highlights it in the contact list
 * @param {string} createName - The name of the newly created contact
 */
function findNewestContactAndHighlightIt(createName) {
    removeActiveClass();
    const groupedContacts = builtAcc();
    const firstLetter = createName.trim().charAt(0).toUpperCase();
    const index = groupedContacts[firstLetter].length - 1;
    highlightContact(firstLetter, index);
}

/** * Highlights a contact in the contact list by first letter and index
 * @param {string} firstLetter - The first letter of the contact's name
 * @param {number} index - The index of the contact in the group
 */
function highlightContact(firstLetter, index) {
    const contactElem = document.getElementById(`letter_${firstLetter.toLowerCase()}_${index}`);
    if (contactElem) {
        contactElem.classList.add('active-contact');
        contactElem.classList.remove("contact-container-hoverclass");
        contactElem.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    }
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
 * Sets up Enter key functionality for contact editing
 * Allows saving contact changes by pressing Enter key in any input field
 * @param {string} originalName - The original contact name for identification
 * @param {string} originalEmail - The original contact email for identification
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