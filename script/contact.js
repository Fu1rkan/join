let overlayRef = document.getElementById("overlay");

function openOverlay() {
    overlayRef.classList.remove('d_none');
}

function closeOverlay() {
    overlayRef.classList.add('d_none');
}

function toggleContact(name, email, keys, index) {
    const contactCardRef = document.getElementById(`letter_${keys}_${index}`);
    const templateRef = document.getElementById("contact_template");
    const contactRef = contacts.find(t => t.name === name && t.email === email);
    const isActive = contactCardRef.classList.contains("active-contact");
    removeActiveClass();
    highlightContactAndOpenContactTemplate(contactCardRef, templateRef, contactRef, isActive);
}

function removeActiveClass() {
    document.querySelectorAll("#contact_list li > div").forEach(el => {
        el.classList.remove("active-contact");
        el.classList.add("contact-container-hoverclass");
    });
}

function highlightContactAndOpenContactTemplate(contactCardRef, templateRef, contactRef, isActive) {

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
    let overlayContentRef = document.getElementById('overlay_content');
    overlayContentRef.innerHTML = showAddContactCard();
}

function editContact(name, email, phone) {
    overlayRef.classList.remove('d_none');
    let overlayContentRef = document.getElementById('overlay_content');
    overlayContentRef.innerHTML = showContactEditCard(name, email, phone);
}

function saveChangedContact(name, email) {
    const contactRef = contacts.find(t => t.name === name && t.email === email);
    const templateRef = document.getElementById("contact_template");
    let contactName = document.getElementById('edit_name').value;
    let contactEmail = document.getElementById('edit_email').value;
    let contactPhone = document.getElementById('edit_phone').value;
    contactRef.name = contactName;
    contactRef.email = contactEmail;
    contactRef.phone = contactPhone;
    filterContacts();
    templateRef.classList.add('d_none')
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
    const groupedContacts = contacts.reduce((acc, contact) => {
        const firstLetter = contact.name.trim().charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(contact);
        return acc;
    }, {});
    renderContacts(groupedContacts);
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
    const contactListRef = document.getElementById("contact_list");
    contactListRef.innerHTML = "";
    alphabet.forEach(letter => {
        const section = document.createElement("section");
        section.innerHTML = contactListTemplates(keys, letter);
        contactListRef.appendChild(section);
    });
}

function createNewContact() {
    let createName = document.getElementById('create_name').value;
    let createEmail = document.getElementById('create_email').value;
    let createPhone = document.getElementById('create_phone').value;

    if (createName != "") {
        let capitalizedName = generatecapitalizedName(createName);
        let nameLetters = generateLetters(capitalizedName);
        let fillColor = getRandomColor();
        createObjectNewContact(capitalizedName, createEmail, createPhone, nameLetters, fillColor);
        closeOverlay();
        filterContacts();
        findNewestContactAndHighlightIt(createName);
    }
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
    document.querySelectorAll('.active-contact').forEach(el => el.classList.remove('active-contact'));
    // Find the index and key for the new contact
    const groupedContacts = contacts.reduce((acc, contact) => {
        const firstLetter = contact.name.trim().charAt(0).toUpperCase();
        if (!acc[firstLetter]) acc[firstLetter] = [];
        acc[firstLetter].push(contact);
        return acc;
    }, {});
    const firstLetter = createName.trim().charAt(0).toUpperCase();
    const index = groupedContacts[firstLetter].length - 1;
    highlightNewestContact(firstLetter, index);
}

function highlightNewestContact(firstLetter, index) {
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
            "svg": createOutlinedCircleSVG(nameLetters, 42, fillColor, 12),
            "svg_big": createOutlinedCircleSVG(nameLetters, 120, fillColor, 47)
        }
        contacts.push(newContact);
        showCreatedContactTemplate(newContact);
    }
}

function generateLetters(capitolName) {
    let createtFullName = capitolName;
    let nameArray = createtFullName.split(" ");
    let firstNameLetter = (nameArray[0]);
    let lastNameletter = (nameArray[nameArray.length - 1]);
    let firstLetters = firstNameLetter.charAt(0).concat(lastNameletter.charAt(0));
    return firstLetters;
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
    const templateRef = document.getElementById("contact_template");
    templateRef.classList.remove("d_none");
    templateRef.innerHTML = getContactTemplate(newContact);
    setTimeout(() => {
        fadeInCreateMsg();
    }, 800);
}

function deleteCurrentContact(name, email) {
    const templateRef = document.getElementById("contact_template");
    contacts.splice(contacts.findIndex(t => t.name == name && t.email == email),1);
    filterContacts();
    templateRef.classList.add('d_none');

    
}