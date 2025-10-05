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
    document.querySelectorAll("#contact_list li > div").forEach(el => {
        el.classList.remove("active-contact");
        el.classList.add("contact-container-hoverclass");
    });

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


function displayContact() {
    let contactRef = document.getElementById('contact_card_am');
    let contentAreaRef = document.getElementById('contact_template');

    contactRef.style.display = "none";
    contentAreaRef.style.display = "none";
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

    contactListRef.innerHTML ="";
    alphabet.forEach(letter => {
        const section = document.createElement("section");
        section.innerHTML = contactListTemplates(keys, letter);
        contactListRef.appendChild(section);  
    });
}

function getSmallContactTemplate(array, index, keys) {
    return `<li>
                <div id="letter_${keys}_${index}" onclick="toggleContact('${array[index].name}', '${array[index].email}', '${keys}', '${index}')" class="contact-container contact-container-hoverclass">
                    ${array[index].svg}
                    <div class="contact-info">
                        <h5 class="contact-name">${array[index].name}</h5>
                        <a class="contact-e-mail" href="mailto:${array[index].email}">${array[index].email}</a>
                    </div>
                </div>
            </li>`
}

function createNewContact() {
    let createName = document.getElementById('create_name').value;
    let createEmail = document.getElementById('create_email').value;
    let createPhone = document.getElementById('create_phone').value;

    if (createName != "") {
        let newContact = {
            "name": createName,
            "email": createEmail,
            "phone": createPhone
        }

        contacts.push(newContact);
    }
    filterContacts();
}