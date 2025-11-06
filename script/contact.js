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
 * Hides the overlay from the user view
 */
function closeOverlay() {
    overlayRef.classList.add('d_none');
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
 * Opens the add new contact overlay with animation
 * Displays the add contact form with fade-in animation
 */
function addNewContact() {
    overlayRef.classList.remove('d_none');
    overlayRef.classList.add('overlay-contacts-bckgrnd-animation');
    overlayContentRef.innerHTML = showAddContactCard();
    const addContactCardRef = document.getElementById('overlay_add_contact_card');
    animationOverlayCardFadeIn(addContactCardRef);
}

/**
 * Opens the edit contact overlay for a specific contact
 * @param {string} name - The contact's name
 * @param {string} email - The contact's email address
 * @param {string} phone - The contact's phone number
 * @param {string} mobile - Whether this is a mobile view ("false" by default)
 */
function editContact(name, email, phone, mobile = "false") {
    let toEditContact = contacts.find(c => c.name == name && c.email == email);
    overlayRef.classList.remove('d_none', 'overlay-contacts-bckgrnd-animation');
    if (mobile == "false") {
        animationOverlayCardDesktop(toEditContact);
    } else {
        animationOverlayCardMobile(toEditContact);
    }
}

/**
 * Handles desktop animation for edit contact overlay
 * @param {Object} toEditContact - The contact object to be edited
 */
function animationOverlayCardDesktop(toEditContact) {
    overlayRef.classList.add('overlay-contacts-bckgrnd-animation');
    overlayContentRef.innerHTML = showContactEditCard(toEditContact);
    const editContactCardRef = document.getElementById('overlay_edit_contact_card');
    animationOverlayCardFadeIn(editContactCardRef);
}

/**
 * Handles mobile animation for edit contact overlay
 * @param {Object} toEditContact - The contact object to be edited
 */
function animationOverlayCardMobile(toEditContact) {
    overlayContentRef.innerHTML = showContactEditCard(toEditContact);
    const contactCardContainerRef = document.getElementById('overlay_edit_contact_card_container');
    const smallResponsivMenuRef = document.getElementById('responsiv_contact_edit_small_menu');
    smallResponsivMenuRef.classList.remove('d_none');
    contactCardContainerRef.classList.add('z-2');
    const editContactCardRef = document.getElementById('overlay_edit_contact_card');
    animationOverlayCardFadeIn(editContactCardRef);
}

/**
 * Hides the add contact card with fade-out animation
 * Triggers the fade-out animation for the add contact overlay
 */
function hideAddContactCard() {
    const addContactCardRef = document.getElementById('overlay_add_contact_card');
    animationOverlayCardFadeOut(addContactCardRef);
}

/**
 * Hides the edit contact card with appropriate animation based on screen size
 * Uses different animations for mobile and desktop views
 */
function hideEditContactCard() {
    let currentWidth = window.innerWidth;
    if (currentWidth <= 525) {
        const editContactCardRef = document.getElementById('overlay_edit_contact_card');
        const editCardContainerRef = document.getElementById('overlay_edit_contact_card_container');
        editContactCardRef.classList.remove('overlay-card-fadeIn');
        editContactCardRef.classList.add('overlay-card-fadeOut');
        setTimeout(() => {
            editCardContainerRef.classList.add('d_none');
        }, 300)
    } else {
        const editContactCardRef = document.getElementById('overlay_edit_contact_card');
        animationOverlayCardFadeOut(editContactCardRef);
    }
}

/**
 * Applies fade-in animation to the target overlay card
 * @param {HTMLElement} target - The DOM element to animate
 */
function animationOverlayCardFadeIn(target) {
    target.classList.remove('overlay-card-fadeOut');
    target.classList.add('overlay-card-fadeIn');
}

/**
 * Applies fade-out animation to the target overlay card and closes overlay
 * @param {HTMLElement} target - The DOM element to animate
 */
function animationOverlayCardFadeOut(target) {
    target.classList.remove('overlay-card-fadeIn');
    target.classList.add('overlay-card-fadeOut');
    setTimeout(() => {
        closeOverlay();
    }, 300)
}

/**
 * Saves changes to an existing contact after validation
 * @param {string} name - The original contact name
 * @param {string} email - The original contact email
 * @returns {Promise<void>} Promise that resolves when contact is saved
 */
async function saveChangedContact(name, email) {
    removeHiglightFromLabelsAndHideRequiredMsg();
    const contactRef = contacts.find(t => t.name === name && t.email === email);
    let contactName = document.getElementById('edit_name').value.trim();
    let contactEmail = document.getElementById('edit_email').value.trim();
    let contactPhone = document.getElementById('edit_phone').value.trim();
    let editFormLabelNameRef = document.getElementById('edit_form_label_name');
    let editFormLabelEmailRef = document.getElementById('edit_form_label_email');
    let editFormLabelPhoneRef = document.getElementById('edit_form_label_phone');
    let editNameRequiredMsg = document.getElementById('edit_name_required_msg');
    let editEmailRequiredMsg = document.getElementById('edit_email_required_msg');
    let editPhoneRequiredMsg = document.getElementById('edit_phone_required_msg');
    checkCreateValuesAndCreateContact(contactEmail, contactPhone, contactName, editFormLabelNameRef, editNameRequiredMsg, editFormLabelEmailRef, editEmailRequiredMsg, editFormLabelPhoneRef, editPhoneRequiredMsg, "change", contactRef)
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

/** * Updates contact, saves to storage, closes overlay, filters contacts, and shows updated template
 * @param {Object} contactRef - The contact object to update
 * @param {string} createName - The new contact name
 * @param {string} createEmail - The new contact email
 * @param {string} createPhone - The new contact phone
 */
async function changeEditedContactPutINContactsCloseOverlayFilterContactsAndShowTemplate(contactRef, createName, createEmail, createPhone) {
    changeEditedContact(contactRef, createName, createEmail, createPhone);
    await putContacts(contacts);
    closeOverlay();
    filterContacts();
    showChangedTemplateAndHiglightIt(contactRef);
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
 * Creates a new contact after form validation
 * Validates input fields and creates contact if all validations pass
 */
function createNewContact() {
    removeHiglightFromLabelsAndHideRequiredMsg();
    let createName = document.getElementById('create_name').value.trim();
    let createEmail = document.getElementById('create_email').value.trim();
    let createPhone = document.getElementById('create_phone').value.trim();
    let createNameRequiredMsg = document.getElementById('create_name_required_msg');
    let createEmailRequiredMsg = document.getElementById('create_email_required_msg');
    let createPhoneRequiredMsg = document.getElementById('create_phone_required_msg');
    let createFormLabelNameRef = document.getElementById('create_form_label_name');
    let createFormLabelEmailRef = document.getElementById('create_form_label_email');
    let createFormLabelPhoneRef = document.getElementById('create_form_label_phone');
    checkCreateValuesAndCreateContact(createEmail, createPhone, createName, createFormLabelNameRef, createNameRequiredMsg, createFormLabelEmailRef, createEmailRequiredMsg, createFormLabelPhoneRef, createPhoneRequiredMsg);
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

/**
 * Validates contact form values and creates/updates contact
 * @param {string} createEmail - Email to validate
 * @param {string} createPhone - Phone to validate
 * @param {string} createName - Name to validate
 * @param {HTMLElement} createFormLabelNameRef - Name label element
 * @param {HTMLElement} createNameRequiredMsg - Name error message element
 * @param {HTMLElement} createFormLabelEmailRef - Email label element
 * @param {HTMLElement} createEmailRequiredMsg - Email error message element
 * @param {HTMLElement} createFormLabelPhoneRef - Phone label element
 * @param {HTMLElement} createPhoneRequiredMsg - Phone error message element
 * @param {string} param - Operation type ("add" or "change")
 * @param {Object} contactRef - Contact object for editing
 */
function checkCreateValuesAndCreateContact(createEmail, createPhone, createName, createFormLabelNameRef, createNameRequiredMsg, createFormLabelEmailRef, createEmailRequiredMsg, createFormLabelPhoneRef, createPhoneRequiredMsg, param = "add", contactRef = {}) {
    let correctPhoneValue = checkPhoneValue(createPhone);
    let correctNameValue = checkNameValue(createName);
    if (param == "add") {
        if (createName != "" && correctNameValue && createEmail != "" && createEmail.includes("@") && (createPhone == "" || correctPhoneValue)) {
            createContactAndHighlight(createName, createEmail, createPhone);
            return;
        }
    } else {
        if (createName != "" && correctNameValue && createEmail != "" && createEmail.includes("@") && (createPhone == "" || correctPhoneValue)) {
            changeEditedContactPutINContactsCloseOverlayFilterContactsAndShowTemplate(contactRef, createName, createEmail, createPhone);
            return;
        }
    }
    highlightRequiredInputs(createName, createEmail, createPhone, correctPhoneValue, correctNameValue, createFormLabelNameRef, createNameRequiredMsg, createFormLabelEmailRef, createEmailRequiredMsg, createFormLabelPhoneRef, createPhoneRequiredMsg);
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

/** * Creates a new contact and highlights it in the contact list
 * @param {string} createName - The contact name
 * @param {string} createEmail - The contact email
 * @param {string} createPhone - The contact phone
 */
function createContactAndHighlight(createName, createEmail, createPhone) {
    let capitalizedName = generatecapitalizedName(createName);
    let nameLetters = generateLetters(capitalizedName);
    let fillColor = getRandomColor();
    createObjectNewContact(capitalizedName, createEmail, createPhone, nameLetters, fillColor);
    closeOverlay();
    filterContacts();
    findNewestContactAndHighlightIt(createName);
}

/** * Shows required message and highlights the target label
 * @param {HTMLElement} target - The label element to highlight
 * @param {HTMLElement} targetMsg - The error message element to show
 */
function showRequiredMsgAndHighlight(target, targetMsg) {
    target.classList.add('create-form-label-highlight');
    targetMsg.classList.remove('d_none');
}

/** * Generates a capitalized version of the contact name
 * @param {string} createName - The original contact name
 * @returns {string} Capitalized contact name
 */
function generatecapitalizedName(createName) {
    let nameArray = createName.split(" ");
    let capitalizedArray = nameArray.map((word) => {
        if (word != "") {
            let firstLetter = word.charAt(0).toUpperCase();
            let restName = word.slice(1);
            return firstLetter + restName;
        } else {
            return word;
        }
    });
    let resultFullName = capitalizedArray.join(" ");
    return resultFullName;
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

/** * Creates a new contact object and saves it to storage
 * @param {string} createName - The contact name
 * @param {string} createEmail - The contact email
 * @param {string} createPhone - The contact phone
 */
async function createObjectNewContact(createName, createEmail, createPhone, nameLetters, fillColor) {
    if (createName != "") {
        let newContact = {
            "name": createName,
            "email": createEmail,
            "phone": createPhone,
            "fillColor": fillColor,
            "nameLetters": nameLetters
        }
        contacts.push(newContact);
        await putContacts(contacts);
        showCreatedContactTemplate(newContact);
    }
}

/** * Generates initials from the contact name
 * @param {string} capitolName - The capitalized contact name
 * @returns {string} Initials derived from the contact name
 */
function generateLetters(capitolName) {
    let createtFullName = capitolName;
    let nameArray = createtFullName.split(" ");
    if (nameArray.length >= 2) {
        let firstNameLetter = nameArray[0];
        let lastNameletter = nameArray[nameArray.length - 1];
        let firstLetters = firstNameLetter.charAt(0).concat(lastNameletter.charAt(0));
        return firstLetters;
    } else {
        let singleLetter = nameArray[0].charAt(0);
        return singleLetter;
    }
}

/** * Generates a random color for better contrast
 * @returns {string} Hex color code
 */
function getRandomColor() {
    let color;
    do {
        const r = Math.floor(Math.random() * 128) + 64;
        const g = Math.floor(Math.random() * 128) + 64;
        const b = Math.floor(Math.random() * 128) + 64;
        color = "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
    } while (
        color.toLowerCase() === "#000000" ||
        color.toLowerCase() === "#ffffff"
    );
    return color;
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
 * Deletes the currently selected contact
 * @param {string} name - The contact's name
 * @param {string} email - The contact's email
 * @returns {Promise<void>} Promise that resolves when contact is deleted
 */
async function deleteCurrentContact(name, email) {
    let currentWidth = window.innerWidth;
    contacts.splice(contacts.findIndex(t => t.name == name && t.email == email), 1);
    await putContacts(contacts)
    initContacts();
    templateRef.classList.add('d_none');
    if (currentWidth <= 960) {
        closeOverlay();
        backToContactList();
    }
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
                closeOverlay();
            }, time);
        }
    }
}
