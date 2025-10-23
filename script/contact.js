const overlayRef = document.getElementById("overlay_contacts");
const overlayContentRef = document.getElementById('overlay_contacts_content');
const contactListAreaRef = document.getElementById('contact_list_area');
const contactListRef = document.getElementById("contact_list");
const contactAreaRef = document.getElementById('contact_area');
const templateRef = document.getElementById("contact_template");



function openOverlay() {
    overlayRef.classList.remove('d_none');
}

function closeOverlay() {
    overlayRef.classList.add('d_none');
}

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

function removeActiveClass() {
    document.querySelectorAll("#contact_list li > div").forEach(el => {
        el.classList.remove("active-contact");
        el.classList.add("contact-container-hoverclass");
    });
}

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

function addNewContact() {
    overlayRef.classList.remove('d_none');
    overlayRef.classList.add('overlay-contacts-bckgrnd-animation');
    overlayContentRef.innerHTML = showAddContactCard();
    const addContactCardRef = document.getElementById('overlay_add_contact_card');
    animationOverlayCardFadeIn(addContactCardRef);
}

function editContact(name, email, phone, mobile = "false") {

    overlayRef.classList.remove('d_none', 'overlay-contacts-bckgrnd-animation');
    if (mobile == "false") {
        overlayRef.classList.add('overlay-contacts-bckgrnd-animation');
        overlayContentRef.innerHTML = showContactEditCard(name, email, phone);
        const editContactCardRef = document.getElementById('overlay_edit_contact_card');
        animationOverlayCardFadeIn(editContactCardRef);
    } else {
        overlayContentRef.innerHTML = showContactEditCard(name, email, phone);
        const contactCardContainerRef = document.getElementById('overlay_edit_contact_card_container');
        const smallResponsivMenuRef = document.getElementById('responsiv_contact_edit_small_menu');
        smallResponsivMenuRef.classList.remove('d_none');
        contactCardContainerRef.classList.add('z-2');
        const editContactCardRef = document.getElementById('overlay_edit_contact_card');
        animationOverlayCardFadeIn(editContactCardRef);
    }

}

function hideAddContactCard() {
    const addContactCardRef = document.getElementById('overlay_add_contact_card');
    animationOverlayCardFadeOut(addContactCardRef);
}

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

function animationOverlayCardFadeIn(target) {
    target.classList.remove('overlay-card-fadeOut');
    target.classList.add('overlay-card-fadeIn');
}

function animationOverlayCardFadeOut(target) {
    target.classList.remove('overlay-card-fadeIn');
    target.classList.add('overlay-card-fadeOut');
    setTimeout(() => {
        closeOverlay();
    }, 300)
}

function saveChangedContact(name, email) {
    const contactRef = contacts.find(t => t.name === name && t.email === email);
    let contactName = document.getElementById('edit_name').value;
    let contactEmail = document.getElementById('edit_email').value;
    let contactPhone = document.getElementById('edit_phone').value;
    contactRef.name = contactName;
    contactRef.email = contactEmail;
    contactRef.phone = contactPhone;
    filterContacts();
    templateRef.innerHTML = getContactTemplate(contactRef);
    const contactInfoBigTemplateRef = document.getElementById('contact_info_big_template');
    contactInfoBigTemplateRef.classList.remove('fade-in-template');
    highlightChangedContact(contactRef);
}

function highlightChangedContact(contactRef) {
    removeActiveClass();
    const firstLetter = contactRef.name.trim().charAt(0).toUpperCase();
    const groupedContacts = builtAcc();
    const index = groupedContacts[firstLetter].findIndex(
        c => c.name === contactRef.name && c.email === contactRef.email
    );
    highlightContact(firstLetter, index);
}

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

function filterContacts() {
    const groupedContacts = builtAcc();
    renderContacts(groupedContacts);
}

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

function renderContactList(keys) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    contactListRef.innerHTML = "";
    alphabet.forEach(letter => {
        const section = document.createElement("section");
        section.innerHTML = contactListTemplates(keys, letter);
        contactListRef.appendChild(section);
    });
}

function createNewContact() {
    document.querySelectorAll('.create-form-label').forEach(el => el.classList.remove('create-form-label-highlight'));
    document.querySelectorAll('.create-form-inputfields-required-msg').forEach(el => el.classList.add('d_none'));
    let createName = document.getElementById('create_name').value;
    let createEmail = document.getElementById('create_email').value;
    let createPhone = document.getElementById('create_phone').value;
    let createNameRequiredMsg = document.getElementById('create_name_required_msg');
    let createEmailRequiredMsg = document.getElementById('create_email_required_msg');
    let createFormLabelNameRef = document.getElementById('create-form-label-name');
    let createFormLabelEmailRef = document.getElementById('create-form-label-email');

    checkCreateValuesAndCreateContact(createEmail, createPhone, createName, createFormLabelNameRef, createNameRequiredMsg, createFormLabelEmailRef, createEmailRequiredMsg);

}

function checkCreateValuesAndCreateContact(createEmail, createPhone, createName, createFormLabelNameRef, createNameRequiredMsg, createFormLabelEmailRef, createEmailRequiredMsg) {
    if (createName != "" && createEmail != "" && createEmail.includes('@')) {
        createContactAndHighlight(createName, createEmail, createPhone)
    } else if (createName == "" && createEmail != "") {
        showRequiredMsgAndHighlight(createFormLabelNameRef, createNameRequiredMsg);
    } else if (createName != "" && createEmail == "") {
        showRequiredMsgAndHighlight(createFormLabelEmailRef, createEmailRequiredMsg);
    } else if (createName == "" && createEmail == "") {
        showRequiredMsgAndHighlight(createFormLabelNameRef, createNameRequiredMsg);
        showRequiredMsgAndHighlight(createFormLabelEmailRef, createEmailRequiredMsg);
    } else {
        showRequiredMsgAndHighlight(createFormLabelEmailRef, createEmailRequiredMsg);
        createEmailRequiredMsg.innerText = "Email must include '@'";
    }
}

function createContactAndHighlight(createName, createEmail, createPhone) {
    let capitalizedName = generatecapitalizedName(createName);
    let nameLetters = generateLetters(capitalizedName);
    let fillColor = getRandomColor();
    createObjectNewContact(capitalizedName, createEmail, createPhone, nameLetters, fillColor);
    closeOverlay();
    filterContacts();
    findNewestContactAndHighlightIt(createName);
}

function showRequiredMsgAndHighlight(target, targetMsg) {
    target.classList.add('create-form-label-highlight');
    targetMsg.classList.remove('d_none');
}

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

function findNewestContactAndHighlightIt(createName) {
    removeActiveClass();
    const groupedContacts = builtAcc();
    const firstLetter = createName.trim().charAt(0).toUpperCase();
    const index = groupedContacts[firstLetter].length - 1;
    highlightContact(firstLetter, index);
}

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

function createObjectNewContact(createName, createEmail, createPhone, nameLetters, fillColor) {

    if (createName != "") {
        let newContact = {
            "name": createName,
            "email": createEmail,
            "phone": createPhone,
            "fillColor": fillColor,
            "nameLetters": nameLetters
        }
        contacts.push(newContact);
        showCreatedContactTemplate(newContact);
    }
}

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

function getRandomColor() {
    // Generate a random color with good contrast (avoid too light/dark colors)
    let color;
    do {
        // Generate colors with each RGB channel between 64 and 192 for better visibility
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

function deleteCurrentContact(name, email) {
    let currentWidth = window.innerWidth;
    contacts.splice(contacts.findIndex(t => t.name == name && t.email == email), 1);
    filterContacts();
    templateRef.classList.add('d_none');
    if (currentWidth <= 960) {
        backToContactList();
    }

}

function backToContactList() {
    contactListAreaRef.classList.remove('d_none');
    contactAreaRef.style.display = "";
    removeActiveClass();
}

function openResponsiveContactEditMenu(name, email, phone) {
    overlayRef.classList.remove('d_none', 'overlay-contacts-bckgrnd-animation');
    overlayContentRef.innerHTML = showContactEditCard(name, email, phone);
    const overlayCardRef = document.getElementById('overlay_edit_contact_card_container'); // ist der neue Container um die Card
    const smallResponsivMenuRef = document.getElementById('responsiv_contact_edit_small_menu');

    overlayCardRef.classList.add('d_none');
    smallResponsivMenuRef.classList.remove('animate-smallMenuOut');
    smallResponsivMenuRef.classList.remove('d_none');
    smallResponsivMenuRef.classList.add('animate-smallMenuIn');
}

function closeResponsiveContactEditMenu() {
    const smallResponsivMenuRef = document.getElementById('responsiv_contact_edit_small_menu');
    if (!smallResponsivMenuRef.classList.contains('d_none')) {
        const smallResponsivMenuRef = document.getElementById('responsiv_contact_edit_small_menu');
        smallResponsivMenuRef.classList.remove('animate-smallMenuIn');
        smallResponsivMenuRef.classList.add('animate-smallMenuOut');
        setTimeout(() => {
            smallResponsivMenuRef.classList.add('d_none');
            closeOverlay();
        }, 300);
    } 
}

