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
    setupEnterKeyContact("", "", "add");
    document.body.classList.add('of_hidden');
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
 * Opens the edit contact overlay for a specific contact
 * @param {string} name - The contact's name
 * @param {string} email - The contact's email address
 * @param {string} phone - The contact's phone number
 * @param {string} mobile - Whether this is a mobile view ("false" by default)
 */
function editContact(name, email, mobile = "false") {
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
 * Applies fade-out animation to the target overlay card and closes overlay
 * @param {HTMLElement} target - The DOM element to animate
 */
function animationOverlayCardFadeOut(target) {
    target.classList.remove('overlay-card-fadeIn');
    target.classList.add('overlay-card-fadeOut');
    setTimeout(() => {
        closeOverlay();
    }, 300)
    document.body.classList.remove('of_hidden');
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
    let correctEmailValue = checkEmailValue(createEmail);
    if (param == "add") {
        if (createName != "" && correctNameValue && createEmail != "" && correctEmailValue && createPhone != "" && correctPhoneValue) {
            createContactAndHighlight(createName, createEmail, createPhone);
            return;
        }
    } else {
        if (createName != "" && correctNameValue && createEmail != "" && correctEmailValue && createPhone != "" && correctPhoneValue) {
            changeEditedContactPutINContactsCloseOverlayFilterContactsAndShowTemplate(contactRef, createName, createEmail, createPhone);
            return;
        }
    }
    highlightRequiredInputs(createName, createEmail, createPhone, correctPhoneValue, correctNameValue, correctEmailValue, createFormLabelNameRef, createNameRequiredMsg, createFormLabelEmailRef, createEmailRequiredMsg, createFormLabelPhoneRef, createPhoneRequiredMsg);
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
    deleteContactFromTask(name);
}

/**
 * Deletes contact from all tasks where they are a participant
 * @param {string} nameIndex - The name of the contact to delete from tasks
 */
function deleteContactFromTask(nameIndex) {

    let task = taskList.filter(t => t.participants && t.participants.some(p => p.name === nameIndex));

    for (let index = 0; index < task.length; index++) {
        let i = task[index].participants.findIndex(c => c.name == nameIndex);
        task[index].participants.splice(i, 1);

        console.log(task[index].participants.length);

        if (task[index].participants.length == 0) {
            task[index].participants = false;
        }
    }
    putTask(taskList);
};