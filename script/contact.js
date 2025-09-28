let overlayRef = document.getElementById("overlay");

function openOverlay() {
    overlayRef.classList.remove('d_none');
}

function closeOverlay() {
    overlayRef.classList.add('d_none');
}

function showContact() {
    let contactCardRef = document.getElementById('contact_card_am');
    let templateRef = document.getElementById('contact_template');
    let name = document.getElementById('name_am').innerHTML;
    let email = document.getElementById('email_am').innerHTML;

    contactCardRef.onclick = hideContact;
    contactCardRef.classList.remove('contact-container-hoverclass');
    contactCardRef.style.backgroundColor = "#2A3647";
    contactCardRef.style.color = "#FFFFFF";
    templateRef.classList.remove('d_none');
    templateRef.innerHTML = getContactTemplate(name, email);
}

function hideContact() {
    let contactCardRef = document.getElementById('contact_card_am');
    let templateRef = document.getElementById('contact_template');
    contactCardRef.classList.add('contact-container-hoverclass');
    contactCardRef.style.backgroundColor = "";
    contactCardRef.style.color = "";
    contactCardRef.onclick = showContact;
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