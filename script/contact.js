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
    await loadTasks();
    rederProfilHeaderIcon('profil_header_contacts');
    filterContacts();
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

/** * Validates email format using regex
 * @param {string} createEmail - The email address to validate
 * @returns {boolean} True if email format is valid, false otherwise
 */
function checkEmailValue(createEmail) {
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let isEmailValid = emailRegex.test(createEmail);
    return isEmailValid;
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
function highlightRequiredInputs(createName, createEmail, createPhone, correctPhoneValue, correctNameValue, correctEmailValue, createFormLabelNameRef, createNameRequiredMsg, createFormLabelEmailRef, createEmailRequiredMsg, createFormLabelPhoneRef, createPhoneRequiredMsg) {
    showCreateNameRequiredMsg(createName, correctNameValue, createNameRequiredMsg, createFormLabelNameRef);
    showCreateEmailRequiredMsg(createEmail, correctEmailValue, createEmailRequiredMsg, createFormLabelEmailRef);
    showCreatePhoneRequiredMsg(createPhone, correctPhoneValue, createPhoneRequiredMsg, createFormLabelPhoneRef);
}

/** * Shows required message and highlights name label based on validation
 * @param {string} createName - The name input value
 * @param {boolean} correctNameValue - Whether the name input is valid
 * @param {HTMLElement} createNameRequiredMsg - The name error message element
 * @param {HTMLElement} createFormLabelNameRef - The name label element
 */
function showCreateNameRequiredMsg(createName, correctNameValue, createNameRequiredMsg, createFormLabelNameRef) {
    if (!(createName != "")) {
        createNameRequiredMsg.innerText = "This field is required";
        showRequiredMsgAndHighlight(createFormLabelNameRef, createNameRequiredMsg);
    } else if (!correctNameValue) {
        createNameRequiredMsg.innerText = "First Sign must be a Letter";
        showRequiredMsgAndHighlight(createFormLabelNameRef, createNameRequiredMsg);
    }
}

/** * Shows required message and highlights email label based on validation
 * @param {string} createEmail - The email input value
 * @param {boolean} correctEmailValue - Whether the email input is valid
 * @param {HTMLElement} createEmailRequiredMsg - The email error message element
 * @param {HTMLElement} createFormLabelEmailRef - The email label element
 */
function showCreateEmailRequiredMsg(createEmail, correctEmailValue, createEmailRequiredMsg, createFormLabelEmailRef) {
    if (!(createEmail != "")) {
        createEmailRequiredMsg.innerText = "This field is required";
        showRequiredMsgAndHighlight(createFormLabelEmailRef, createEmailRequiredMsg);
    } else if (!(createEmail != "" && correctEmailValue)) {
        createEmailRequiredMsg.innerText = "Please enter a valid email address";
        showRequiredMsgAndHighlight(createFormLabelEmailRef, createEmailRequiredMsg);
    }
}

/** * Shows required message and highlights phone label based on validation
 * @param {string} createPhone - The phone input value
 * @param {boolean} correctPhoneValue - Whether the phone input is valid
 * @param {HTMLElement} createPhoneRequiredMsg - The phone error message element
 * @param {HTMLElement} createFormLabelPhoneRef - The phone label element
 */
function showCreatePhoneRequiredMsg(createPhone, correctPhoneValue, createPhoneRequiredMsg, createFormLabelPhoneRef) {
    if (!(createPhone != "")) {
        createPhoneRequiredMsg.innerText = "This field is required";
        showRequiredMsgAndHighlight(createFormLabelPhoneRef, createPhoneRequiredMsg);
    } else if (!(createPhone != "" && correctPhoneValue)) {
        createPhoneRequiredMsg.innerText = "This field must include only Numbers";
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
    let currentWidth = window.innerWidth;
    if (currentWidth > 960) {
        removeActiveClass();
        const groupedContacts = builtAcc();
        const firstLetter = createName.trim().charAt(0).toUpperCase();
        const index = groupedContacts[firstLetter].length - 1;
        highlightContact(firstLetter, index);
    }

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