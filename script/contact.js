let overlayRef = document.getElementById("overlay");

function openOverlay() {
    overlayRef.classList.remove('d_none');
}

function closeOverlay() {
    overlayRef.classList.add('d_none');
}

function showContact() {
    let contactCardRef = document.getElementById('contact_card_am');
    let name = document.getElementById('name_am').innerHTML;
    let email = document.getElementById('email_am').innerHTML;


    contactCardRef.classList.remove('contact-container-hoverclass')
    contactCardRef.style.backgroundColor = "#2A3647"; 
    let templateRef = document.getElementById('contact_template');
    templateRef.innerHTML = getContactTemplate(name, email);
}

function displayContact() {
    let contactRef = document.getElementById('contact_card_am');
    let contentAreaRef = document.getElementById('contact_template');

    contactRef.style.display = "none";
    contentAreaRef.style.display = "none";
}

function getContactTemplate(name, email) {
    return `<section class="contact-info-big">
                        <img id="user_svg" class="svg-img-big" src="./img/icons/test-am-icon-svg.svg" alt="">
                        <div class="contact-info-big-name-edit-container">
                            <p class="contact-info-big-name">${name}</p>
                            <div class="contact-info-big-edit">
                                <button class="contact-btn contact-edit-btn" onclick="editContact('${name}', '${email}')">
                                    <div class="contact-btn-img contact-btn-img-edit"></div>
                                    <p class="contact-btn-txt">Edit</p>
                                </button>
                                <button class="contact-btn contact-delete-btn" onclick="displayContact()">
                                    <div class="contact-btn-img contact-btn-img-delete"></div>
                                    <p class="contact-btn-txt">Delete</p>
                                </button>
                            </div>
                        </div>
                    </section>
                    <p class="contact-inforamtion-txt">Contact Information</p>
                    <section class="contact-informations">
                        <div>
                            <h5>Email</h5>
                            <a href="mailto:antom@gmail.com">${email}</a>
                        </div>
                        <div>
                            <h5>Phone</h5>
                            <p class="contact-informations-phone-number">+49 1111 111 11 1</p>
                        </div>
                    </section>`;
}

function addNewContact() {
    overlayRef.classList.remove('d_none');
    let overlayContentRef = document.getElementById('overlay_content');
    overlayContentRef.innerHTML = showAddContactCard();
}

function showAddContactCard() {
    return `<section class="overlay-card" onclick="event.stopPropagation()">
                <section class="overlay-left-side">
                    <div class="overlay-left-side-content">
                        <img class="add-contact-card-svg" src="./assets/svg/logo_join_navbar.svg" alt="Join Logo">
                        <div class="add-contact-card-headline">
                            <h2 class="add-contact-card-title">Add contact</h2>
                            <p class="add-contact-card-txt">Tasks are better with a team!</p>
                            <div class="add-contact-card-underline-styled"></div>
                        </div>
                    </div>
                </section>
                <section class="overlay-right-side">
                    <img class="overlay-character-icon" src="./assets/svg/char_icon_add_contact.svg"
                        alt=" Empty Character Logo ">
                    <section class="add-contact-content-container">
                        <div class="position-container-close-icon">
                            <div class="add-contact-close-icon-container" onclick="closeOverlay()">
                                <img class="add-contact-close-icon" src="./assets/svg/close.svg" alt="Close Icon">
                            </div>
                        </div>
                        <form action="" class="create-form">
                            <section class="create-form-inputfields">
                                <label for="input_1">
                                    <input id="input_1" placeholder="Name" type="text">
                                    <img src="./assets/svg/person.svg" alt="Person Logo">
                                </label>
                                <label>
                                    <input placeholder="Email" type="text">
                                    <img src="./assets/svg/mail.svg" alt="Mail Logo">
                                </label>
                                <label>
                                    <input placeholder="Phone" type="text">
                                    <img src="./assets/svg/call.svg" alt="Phone Logo">
                                </label>
                            </section>

                            <section class="add-contact-buttons">
                                <button class="add-contact-cancel-btn" onclick="closeOverlay()">
                                    <p class="add-contact-cancel-btn-txt">Cancel</p><div class="add-contact-btn-svg add-contact-btn-cancel-svg"></div>
                                </button>
                                <button class="add-contact-create-contact-btn">
                                    <p class="add-contact-create-contact-btn-txt">Create contact</p><img
                                        class="add-contact-btn-svg" src="./assets/svg/check.svg" alt="Check Icon">
                                </button>
                            </section>
                        </form>
                    </section>

                </section>
            </section>`;
}

function editContact(name, email) {
    overlayRef.classList.remove('d_none');
    let svgRef = document.getElementById('user_svg').src;
    let overlayContentRef = document.getElementById('overlay_content');
    overlayContentRef.innerHTML = showContactEditCard(name, email, svgRef);
}

function showContactEditCard(name, email, svgRef) {
    return `<section class="overlay-card" onclick="event.stopPropagation()">
                <section class="overlay-left-side">
                    <div class="overlay-left-side-content">
                        <img class="add-contact-card-svg" src="./assets/svg/logo_join_navbar.svg" alt="Join Logo">
                        <div class="add-contact-card-headline">
                            <h2 class="add-contact-card-title">Edit contact</h2>
                            <div class="add-contact-card-underline-styled"></div>
                        </div>
                    </div>
                </section>
                <section class="overlay-right-side">
                    <img class="overlay-character-icon" src="${svgRef}"
                        alt=" Empty Character Logo ">
                    <section class="add-contact-content-container">
                        <div class="position-container-close-icon">
                            <div class="add-contact-close-icon-container" onclick="closeOverlay()">
                                <img class="add-contact-close-icon" src="./assets/svg/close.svg" alt="Close Icon">
                            </div>
                        </div>
                        <form action="" class="create-form" onsubmit="return false">
                            <section class="create-form-inputfields">
                                <div>
                                    <input placeholder="Name" value="${name}" type="text">
                                    <img src="./assets/svg/person.svg" alt="Person Logo">
                                </div>
                                <div>
                                    <input placeholder="Email" value="${email}" type="text">
                                    <img src="./assets/svg/mail.svg" alt="Mail Logo">
                                </div>
                                <div>
                                    <input placeholder="Phone" value="+49 1111 111 11 1" type="text">
                                    <img src="./assets/svg/call.svg" alt="Phone Logo">
                                </div>
                            </section>

                            <section class="edit-contact-d-s-buttons">
                                <button class="edit-contact-delete-btn" onclick="closeOverlay(); displayContact()">
                                    <p class="edti-contact-delete-btn-txt">Delete</p>
                                </button>
                                <button class="edit-contact-save-contact-btn">
                                    <p class="edit-contact-save-contact-btn-txt">Save</p><img
                                        class="add-contact-btn-svg" src="./assets/svg/check.svg" alt="Check Icon">
                                </button>
                            </section>
                        </form>
                    </section>

                </section>
            </section>`;
}