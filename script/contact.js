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

function getContactTemplate(name, email) {
    return `<section class="contact-info-big">
                        <img class="svg-img-big" src="./img/icons/test-am-icon-svg.svg" alt="">
                        <div class="contact-info-big-name-edit-container">
                            <p class="contact-info-big-name">${name}</p>
                            <div class="contact-info-big-edit">
                                <button class="contact-btn contact-edit-btn">
                                    <div class="contact-btn-img contact-btn-img-edit"></div>
                                    <p class="contact-btn-txt">Edit</p>
                                </button>
                                <button class="contact-btn contact-delete-btn">
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
                    </section>`
}