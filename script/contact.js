let overlayRef = document.getElementById("overlay");

function openOverlay() {
    overlayRef.classList.remove('d_none');
}

function closeOverlay() {
    overlayRef.classList.add('d_none');
}

function showContact(name, email, keys, index) {
    let contactCardRef = document.getElementById(`letter_${keys}_${index}`);
    let contactListRef = document.getElementById('contact_list');
    let contactsList = contactListRef.querySelectorAll("li>div");

    contactsList.forEach(el => {
        el.style.backgroundColor ="";
        el.style.color = "";
        el.classList.add('contact-container-hoverclass');
    });
    
    let templateRef = document.getElementById('contact_template');
    let contactRef = contacts.filter(t => t["name"] == name && t["email"] == email);
    
    contactCardRef.onclick = () => {
        hideContact(name, email, keys, index);
    };
    contactCardRef.classList.remove('contact-container-hoverclass');
    contactCardRef.style.backgroundColor = "#2A3647";
    contactCardRef.style.color = "#FFFFFF";
    templateRef.classList.remove('d_none');
    templateRef.innerHTML = getContactTemplate(contactRef[0]);
}

function hideContact(name, email, keys, index) {
    let contactCardRef = document.getElementById(`letter_${keys}_${index}`);
    let templateRef = document.getElementById('contact_template');
    contactCardRef.classList.add('contact-container-hoverclass');
    contactCardRef.style.backgroundColor = "";
    contactCardRef.style.color = "";
    contactCardRef.onclick = () => {
        showContact(name, email, keys, index)
    };
    templateRef.classList.add('d_none');
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

function editContact(name, email) {
    overlayRef.classList.remove('d_none');
    let overlayContentRef = document.getElementById('overlay_content');
    overlayContentRef.innerHTML = showContactEditCard(name, email);
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
    
    for (let index = 0; index < keys.length; index++) {
        let listRef = document.getElementById(`letter_${keys[index].toLowerCase()}`);
        listRef.innerHTML = "";

        for (let i = 0; i < groupedContacts[keys[index]].length; i++) {
            listRef.innerHTML += getSmallContactTemplate(groupedContacts[keys[index]], i, keys[index].toLowerCase());  
        }  
    }
    
}

function getSmallContactTemplate(array, index, keys) {
    return `<li>
                <div id="letter_${keys}_${index}" onclick="showContact('${array[index].name}', '${array[index].email}', '${keys}', '${index}')" class="contact-container contact-container-hoverclass">
                    ${array[index].svg}
                    <div class="contact-info">
                        <h5 class="contact-name">${array[index].name}</h5>
                        <a class="contact-e-mail" href="mailto:${array[index].email}">${array[index].email}</a>
                    </div>
                </div>
            </li>`
}