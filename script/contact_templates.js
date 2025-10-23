function contactListTemplates(keys, letter) {
    return `<div class="contact-list-head ${keys.includes(letter) ? "" : " d_none"}">
        <h4 class="contact-list-section-head">${letter}</h4>
    </div>
    <div class="section-seperator-container ${keys.includes(letter) ? "" : " d_none"}">
        <div class="section-seperator"></div>
    </div>
    <ul id="letter_${letter.toLowerCase()}" class="list-items"></ul>`
}

function getSmallContactTemplate(array, index, keys) {
    return `<li>
                <div id="letter_${keys}_${index}" onclick="toggleContact('${array[index].name}', '${array[index].email}', '${keys}', '${index}')" class="contact-container contact-container-hoverclass">
                    <div class="contact-circle-img-small" style="background-color:${array[index].fillColor};">
                        <p>${array[index].nameLetters}</p>
                    </div>
                    <div class="contact-info">
                        <h5 class="contact-name">${array[index].name}</h5>
                        <a class="contact-e-mail" href="mailto:${array[index].email}">${array[index].email}</a>
                    </div>
                </div>
            </li>`
}

function getContactTemplate(contact) {
    return `<div id="contact_info_big_template" class="contact-info-big-container fade-in-template">
    <section class="contact-info-big">
        <div class="contact-circle-img-big" style="background-color:${contact.fillColor};">
            <p>${contact.nameLetters}</p>
        </div>
        <div class="contact-info-big-name-edit-container">
            <p class="contact-info-big-name">${contact.name}</p>
            <div class="contact-info-big-edit">
                <button class="contact-btn contact-edit-btn"
                    onclick="editContact('${contact.name}', '${contact.email}', '${contact.phone}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <mask id="mask0_373102_2514" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                            width="24" height="24">
                            <rect width="24" height="24" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_373102_2514)">
                            <path
                                d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z"
                                fill="#2A3647" />
                        </g>
                    </svg>
                    <p class="contact-btn-txt">Edit</p>
                </button>
                <button class="contact-btn contact-delete-btn"
                    onclick="deleteCurrentContact('${contact.name}', '${contact.email}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <mask id="mask0_373102_1542" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                            width="24" height="24">
                            <rect width="24" height="24" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_373102_1542)">
                            <path
                                d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z"
                                fill="#2A3647" />
                        </g>
                    </svg>
                    <p class="contact-btn-txt">Delete</p>
                </button>
            </div>
        </div>
    </section>
    <p class="contact-inforamtion-txt">Contact Information</p>
    <section class="contact-informations">
        <div>
            <h5>Email</h5>
            <a href="mailto:antom@gmail.com">${contact.email}</a>
        </div>
        <div>
            <h5>Phone</h5>
            <p class="contact-informations-phone-number">${contact.phone}</p>
        </div>
    </section>
    <div class="succes-created-container">
        <div id="create_Msg" class="creates-msg d_none">
            <h5 class="succesfully-created-msg">Contact succesfully created</h5>
        </div>
    </div>
    <div class="contact-rightside-menu-btn-container">
                            <button class="contact-rightside-menu-btn" onclick="openResponsiveContactEditMenu('${contact.name}', '${contact.email}', '${contact.phone}')">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"
                                    fill="none">
                                    <mask id="mask0_383768_2743" style="mask-type:alpha" maskUnits="userSpaceOnUse"
                                        x="0" y="0" width="32" height="32">
                                        <rect width="32" height="32" fill="#D9D9D9" />
                                    </mask>
                                    <g mask="url(#mask0_383768_2743)">
                                        <path
                                            d="M15.9997 26.6666C15.2663 26.6666 14.6386 26.4055 14.1163 25.8833C13.5941 25.361 13.333 24.7333 13.333 23.9999C13.333 23.2666 13.5941 22.6388 14.1163 22.1166C14.6386 21.5944 15.2663 21.3333 15.9997 21.3333C16.733 21.3333 17.3608 21.5944 17.883 22.1166C18.4052 22.6388 18.6663 23.2666 18.6663 23.9999C18.6663 24.7333 18.4052 25.361 17.883 25.8833C17.3608 26.4055 16.733 26.6666 15.9997 26.6666ZM15.9997 18.6666C15.2663 18.6666 14.6386 18.4055 14.1163 17.8833C13.5941 17.361 13.333 16.7333 13.333 15.9999C13.333 15.2666 13.5941 14.6388 14.1163 14.1166C14.6386 13.5944 15.2663 13.3333 15.9997 13.3333C16.733 13.3333 17.3608 13.5944 17.883 14.1166C18.4052 14.6388 18.6663 15.2666 18.6663 15.9999C18.6663 16.7333 18.4052 17.361 17.883 17.8833C17.3608 18.4055 16.733 18.6666 15.9997 18.6666ZM15.9997 10.6666C15.2663 10.6666 14.6386 10.4055 14.1163 9.88325C13.5941 9.36103 13.333 8.73325 13.333 7.99992C13.333 7.26659 13.5941 6.63881 14.1163 6.11659C14.6386 5.59436 15.2663 5.33325 15.9997 5.33325C16.733 5.33325 17.3608 5.59436 17.883 6.11659C18.4052 6.63881 18.6663 7.26659 18.6663 7.99992C18.6663 8.73325 18.4052 9.36103 17.883 9.88325C17.3608 10.4055 16.733 10.6666 15.9997 10.6666Z"
                                            fill="white" />
                                    </g>
                                </svg>
                            </button>

                        </div>
</div>`;
}

function showAddContactCard() {
    return `<div class="overlay-edit-contact-card-container" onclick="hideAddContactCard()">
    <section id="overlay_add_contact_card" class="overlay-card" onclick="event.stopPropagation()">
        <section class="overlay-left-side">
        <div class="responsiv-overlay-card-close-btn-container">
            <button class="responsiv-overlay-card-close-btn" onclick="hideAddContactCard()">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M6.575 7.975L1.675 12.875C1.49167 13.0583 1.25833 13.15 0.975 13.15C0.691667 13.15 0.458333 13.0583 0.275 12.875C0.0916667 12.6917 0 12.4583 0 12.175C0 11.8917 0.0916667 11.6583 0.275 11.475L5.175 6.575L0.275 1.675C0.0916667 1.49167 0 1.25833 0 0.975C0 0.691667 0.0916667 0.458333 0.275 0.275C0.458333 0.0916667 0.691667 0 0.975 0C1.25833 0 1.49167 0.0916667 1.675 0.275L6.575 5.175L11.475 0.275C11.6583 0.0916667 11.8917 0 12.175 0C12.4583 0 12.6917 0.0916667 12.875 0.275C13.0583 0.458333 13.15 0.691667 13.15 0.975C13.15 1.25833 13.0583 1.49167 12.875 1.675L7.975 6.575L12.875 11.475C13.0583 11.6583 13.15 11.8917 13.15 12.175C13.15 12.4583 13.0583 12.6917 12.875 12.875C12.6917 13.0583 12.4583 13.15 12.175 13.15C11.8917 13.15 11.6583 13.0583 11.475 12.875L6.575 7.975Z" fill="white"/>
                </svg>
            </button>
        </div>
            <div class="overlay-left-side-content">
                <svg class="add-contact-card-svg" xmlns="http://www.w3.org/2000/svg" width="57" height="67"
                    viewBox="0 0 57 67" fill="none">
                    <path d="M40.7397 0H28.4242V13.8957H40.7397V0Z" fill="white" />
                    <path
                        d="M28.4243 25.197H40.7397V44.7947C40.796 49.5105 39.4275 54.1362 36.8083 58.0839C34.222 61.9194 29.2295 66.4829 19.9929 66.4829C9.93211 66.4829 4.06806 61.8167 0.903931 59.2597L8.67215 49.8621C11.7605 52.3352 14.7351 54.3696 20.0403 54.3696C24.057 54.3696 25.658 52.7645 26.5959 51.3646C27.8709 49.4203 28.5304 47.1465 28.4906 44.8321L28.4243 25.197Z"
                        fill="white" />
                    <path d="M22.1434 16.4248H9.82792V28.5567H22.1434V16.4248Z" fill="#29ABE2" />
                    <path
                        d="M47.1911 60.7904C47.1911 63.3754 45.8554 64.7659 43.9891 64.7659C42.1228 64.7659 40.9008 63.1141 40.9008 60.9211C40.9008 58.728 42.1607 56.9922 44.0933 56.9922C46.0259 56.9922 47.1911 58.7 47.1911 60.7904ZM42.3312 60.8931C42.3312 62.4516 42.966 63.5994 44.0554 63.5994C45.1449 63.5994 45.7606 62.3862 45.7606 60.7997C45.7606 59.4092 45.1922 58.1027 44.0554 58.1027C42.9186 58.1027 42.3312 59.3626 42.3312 60.8931Z"
                        fill="white" />
                    <path d="M49.6353 57.104V64.6445H48.2711V57.104H49.6353Z" fill="white" />
                    <path
                        d="M51.1131 64.6445V57.104H52.6289L54.2583 60.2116C54.6778 61.0242 55.051 61.8592 55.3762 62.7127C55.2909 61.7795 55.253 60.7063 55.253 59.5117V57.104H56.5035V64.6445H55.092L53.4436 61.4715C53.0072 60.638 52.6182 59.7812 52.2784 58.9051C52.2784 59.8384 52.3447 60.8929 52.3447 62.1901V64.6351L51.1131 64.6445Z"
                        fill="white" />
                </svg>
                <div class="add-contact-card-headline">
                    <h2 class="add-contact-card-title">Add contact</h2>
                    <p class="add-contact-card-txt">Tasks are better with a team!</p>
                    <div class="add-contact-card-underline-styled"></div>
                </div>
            </div>
        </section>
        <section class="overlay-right-side">
            <svg class="overlay-character-icon" xmlns="http://www.w3.org/2000/svg" width="134" height="134"
                viewBox="0 0 134 134" fill="none">
                <g filter="url(#filter0_d_576_4825)">
                    <rect x="7" y="7" width="120" height="120" rx="60" fill="white" />
                    <rect x="5.5" y="5.5" width="123" height="123" rx="61.5" stroke="white" stroke-width="3" />
                    <circle cx="67" cy="67" r="60" fill="#D1D1D1" />
                    <mask id="mask0_576_4825" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="35" y="35"
                        width="64" height="64">
                        <rect x="35" y="35" width="64" height="64" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_576_4825)">
                        <path
                            d="M67.0001 67.0001C64.0667 67.0001 61.5556 65.9556 59.4667 63.8667C57.3779 61.7779 56.3334 59.2667 56.3334 56.3334C56.3334 53.4001 57.3779 50.889 59.4667 48.8001C61.5556 46.7112 64.0667 45.6667 67.0001 45.6667C69.9334 45.6667 72.4445 46.7112 74.5334 48.8001C76.6223 50.889 77.6667 53.4001 77.6667 56.3334C77.6667 59.2667 76.6223 61.7779 74.5334 63.8667C72.4445 65.9556 69.9334 67.0001 67.0001 67.0001ZM83.0001 88.3334H51.0001C49.5334 88.3334 48.2779 87.8112 47.2334 86.7668C46.189 85.7223 45.6667 84.4668 45.6667 83.0001V80.8667C45.6667 79.3556 46.0556 77.9667 46.8334 76.7001C47.6112 75.4334 48.6445 74.4667 49.9334 73.8001C52.689 72.4223 55.489 71.389 58.3334 70.7001C61.1779 70.0112 64.0667 69.6667 67.0001 69.6667C69.9334 69.6667 72.8223 70.0112 75.6667 70.7001C78.5112 71.389 81.3112 72.4223 84.0667 73.8001C85.3556 74.4667 86.389 75.4334 87.1667 76.7001C87.9445 77.9667 88.3334 79.3556 88.3334 80.8667V83.0001C88.3334 84.4668 87.8112 85.7223 86.7668 86.7668C85.7223 87.8112 84.4668 88.3334 83.0001 88.3334ZM51.0001 83.0001H83.0001V80.8667C83.0001 80.3779 82.8779 79.9334 82.6334 79.5334C82.389 79.1334 82.0667 78.8223 81.6667 78.6001C79.2668 77.4001 76.8445 76.5001 74.4001 75.9001C71.9556 75.3001 69.489 75.0001 67.0001 75.0001C64.5112 75.0001 62.0445 75.3001 59.6001 75.9001C57.1556 76.5001 54.7334 77.4001 52.3334 78.6001C51.9334 78.8223 51.6112 79.1334 51.3667 79.5334C51.1223 79.9334 51.0001 80.3779 51.0001 80.8667V83.0001ZM67.0001 61.6667C68.4667 61.6667 69.7223 61.1445 70.7668 60.1001C71.8112 59.0556 72.3334 57.8001 72.3334 56.3334C72.3334 54.8667 71.8112 53.6112 70.7668 52.5667C69.7223 51.5223 68.4667 51.0001 67.0001 51.0001C65.5334 51.0001 64.2779 51.5223 63.2334 52.5667C62.189 53.6112 61.6667 54.8667 61.6667 56.3334C61.6667 57.8001 62.189 59.0556 63.2334 60.1001C64.2779 61.1445 65.5334 61.6667 67.0001 61.6667Z"
                            fill="white" />
                    </g>
                </g>
                <defs>
                    <filter id="filter0_d_576_4825" x="0" y="0" width="134" height="134" filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha" />
                        <feOffset />
                        <feGaussianBlur stdDeviation="2" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_576_4825" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_576_4825" result="shape" />
                    </filter>
                </defs>
            </svg>
            <section class="add-contact-content-container">
                <div class="position-container-close-icon">
                    <div class="add-contact-close-icon-container" onclick="hideAddContactCard()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <mask id="mask0_71720_5491" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="4"
                                width="24" height="25">
                                <rect x="4" y="4.96582" width="24" height="24" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_71720_5491)">
                                <path
                                    d="M15.9998 18.3659L11.0998 23.2659C10.9165 23.4492 10.6831 23.5409 10.3998 23.5409C10.1165 23.5409 9.88314 23.4492 9.6998 23.2659C9.51647 23.0825 9.4248 22.8492 9.4248 22.5659C9.4248 22.2825 9.51647 22.0492 9.6998 21.8659L14.5998 16.9659L9.6998 12.0659C9.51647 11.8825 9.4248 11.6492 9.4248 11.3659C9.4248 11.0825 9.51647 10.8492 9.6998 10.6659C9.88314 10.4825 10.1165 10.3909 10.3998 10.3909C10.6831 10.3909 10.9165 10.4825 11.0998 10.6659L15.9998 15.5659L20.8998 10.6659C21.0831 10.4825 21.3165 10.3909 21.5998 10.3909C21.8831 10.3909 22.1165 10.4825 22.2998 10.6659C22.4831 10.8492 22.5748 11.0825 22.5748 11.3659C22.5748 11.6492 22.4831 11.8825 22.2998 12.0659L17.3998 16.9659L22.2998 21.8659C22.4831 22.0492 22.5748 22.2825 22.5748 22.5659C22.5748 22.8492 22.4831 23.0825 22.2998 23.2659C22.1165 23.4492 21.8831 23.5409 21.5998 23.5409C21.3165 23.5409 21.0831 23.4492 20.8998 23.2659L15.9998 18.3659Z"
                                    fill="#2A3647" />
                            </g>
                        </svg>
                    </div>
                </div>
                <form action="" class="create-form" onsubmit="closeOverlay();return false">
                    <section class="create-form-inputfields">
                    <div class="create-form-inputfields-container">
                        <label id="create-form-label-name" class="create-form-label" for="create_name">
                            <input id="create_name" placeholder="Name" type="text">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <mask id="mask0_373102_1025" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                    y="0" width="24" height="24">
                                    <rect width="24" height="24" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_373102_1025)">
                                    <path
                                        d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM18 20H6C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20ZM6 18H18V17.2C18 17.0167 17.9542 16.85 17.8625 16.7C17.7708 16.55 17.65 16.4333 17.5 16.35C16.6 15.9 15.6917 15.5625 14.775 15.3375C13.8583 15.1125 12.9333 15 12 15C11.0667 15 10.1417 15.1125 9.225 15.3375C8.30833 15.5625 7.4 15.9 6.5 16.35C6.35 16.4333 6.22917 16.55 6.1375 16.7C6.04583 16.85 6 17.0167 6 17.2V18ZM12 10C12.55 10 13.0208 9.80417 13.4125 9.4125C13.8042 9.02083 14 8.55 14 8C14 7.45 13.8042 6.97917 13.4125 6.5875C13.0208 6.19583 12.55 6 12 6C11.45 6 10.9792 6.19583 10.5875 6.5875C10.1958 6.97917 10 7.45 10 8C10 8.55 10.1958 9.02083 10.5875 9.4125C10.9792 9.80417 11.45 10 12 10Z"
                                        fill="#A8A8A8" />
                                </g>
                            </svg>
                        </label>
                        <div class="create-form-inputfields-required"><p id="create_name_required_msg" class="create-form-inputfields-required-msg d_none">This field is required</p></div> 
                    </div>
                    <div class="create-form-inputfields-container">    
                        <label id="create-form-label-email" class="create-form-label" for="create_email">
                            <input id="create_email" placeholder="Email" type="text">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <mask id="mask0_373102_1032" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                    y="0" width="24" height="24">
                                    <rect width="24" height="24" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_373102_1032)">
                                    <path
                                        d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM20 8L12.525 12.675C12.4417 12.725 12.3542 12.7625 12.2625 12.7875C12.1708 12.8125 12.0833 12.825 12 12.825C11.9167 12.825 11.8292 12.8125 11.7375 12.7875C11.6458 12.7625 11.5583 12.725 11.475 12.675L4 8V18H20V8ZM12 11L20 6H4L12 11ZM4 8.25V6.775V6.8V6.7875V8.25Z"
                                        fill="#A8A8A8" />
                                </g>
                            </svg>
                        </label>
                        <div class="create-form-inputfields-required"><p id="create_email_required_msg" class="create-form-inputfields-required-msg d_none">This field is required</p></div>
                    </div>
                    <div class="create-form-inputfields-container">    
                        <label for="create_phone" class="create-form-label">
                            <input id="create_phone" placeholder="Phone" type="text">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <mask id="mask0_373102_1039" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                    y="0" width="24" height="24">
                                    <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_373102_1039)">
                                    <path
                                        d="M19.95 21.5C17.8667 21.5 15.8083 21.0458 13.775 20.1375C11.7417 19.2292 9.89167 17.9417 8.225 16.275C6.55833 14.6083 5.27083 12.7583 4.3625 10.725C3.45417 8.69167 3 6.63333 3 4.55C3 4.25 3.1 4 3.3 3.8C3.5 3.6 3.75 3.5 4.05 3.5H8.1C8.33333 3.5 8.54167 3.57917 8.725 3.7375C8.90833 3.89583 9.01667 4.08333 9.05 4.3L9.7 7.8C9.73333 8.06667 9.725 8.29167 9.675 8.475C9.625 8.65833 9.53333 8.81667 9.4 8.95L6.975 11.4C7.30833 12.0167 7.70417 12.6125 8.1625 13.1875C8.62083 13.7625 9.125 14.3167 9.675 14.85C10.1917 15.3667 10.7333 15.8458 11.3 16.2875C11.8667 16.7292 12.4667 17.1333 13.1 17.5L15.45 15.15C15.6 15 15.7958 14.8875 16.0375 14.8125C16.2792 14.7375 16.5167 14.7167 16.75 14.75L20.2 15.45C20.4333 15.5167 20.625 15.6375 20.775 15.8125C20.925 15.9875 21 16.1833 21 16.4V20.45C21 20.75 20.9 21 20.7 21.2C20.5 21.4 20.25 21.5 19.95 21.5ZM6.025 9.5L7.675 7.85L7.25 5.5H5.025C5.10833 6.18333 5.225 6.85833 5.375 7.525C5.525 8.19167 5.74167 8.85 6.025 9.5ZM14.975 18.45C15.625 18.7333 16.2875 18.9583 16.9625 19.125C17.6375 19.2917 18.3167 19.4 19 19.45V17.25L16.65 16.775L14.975 18.45Z"
                                        fill="#A8A8A8" />
                                </g>
                            </svg>
                        </label>
                    </div>    
                    </section>

                    <section class="add-contact-buttons">
                        <button class="add-contact-cancel-btn" onclick="hideAddContactCard(); return false">
                            <p class="add-contact-cancel-btn-txt">Cancel</p>
                            <!--<div class="add-contact-btn-svg add-contact-btn-cancel-svg"></div>-->
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <path
                                    d="M12.0692 12.0001L17.3122 17.2431M6.82617 17.2431L12.0692 12.0001L6.82617 17.2431ZM17.3122 6.75708L12.0682 12.0001L17.3122 6.75708ZM12.0682 12.0001L6.82617 6.75708L12.0682 12.0001Z"
                                    stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                        <button class="add-contact-create-contact-btn" onclick="createNewContact(); return false">
                            <p class="add-contact-create-contact-btn-txt">Create contact</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <mask id="mask0_71766_6020" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                    y="0" width="24" height="24">
                                    <rect x="0.0683594" width="24" height="24" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_71766_6020)">
                                    <path
                                        d="M9.61905 15.15L18.0941 6.675C18.2941 6.475 18.5316 6.375 18.8066 6.375C19.0816 6.375 19.3191 6.475 19.5191 6.675C19.7191 6.875 19.8191 7.1125 19.8191 7.3875C19.8191 7.6625 19.7191 7.9 19.5191 8.1L10.3191 17.3C10.1191 17.5 9.88572 17.6 9.61905 17.6C9.35239 17.6 9.11905 17.5 8.91905 17.3L4.61905 13C4.41905 12.8 4.32322 12.5625 4.33155 12.2875C4.33989 12.0125 4.44405 11.775 4.64405 11.575C4.84405 11.375 5.08155 11.275 5.35655 11.275C5.63155 11.275 5.86905 11.375 6.06905 11.575L9.61905 15.15Z"
                                        fill="white" />
                                </g>
                            </svg>
                        </button>
                    </section>
                </form>
            </section>

        </section>
    </section>`;
}

function showContactEditCard(name, email, phone) {
    return `<div id="overlay_edit_contact_card_container" class="overlay-edit-contact-card-container" onclick="hideEditContactCard(), event.stopPropagation()">
    <section id="overlay_edit_contact_card" class="overlay-card" onclick="event.stopPropagation()">
        <section class="overlay-left-side">
            <div class="overlay-left-side-content">
            <div class="responsiv-overlay-card-close-btn-container">
            <button class="responsiv-overlay-card-close-btn" onclick="hideEditContactCard()">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M6.575 7.975L1.675 12.875C1.49167 13.0583 1.25833 13.15 0.975 13.15C0.691667 13.15 0.458333 13.0583 0.275 12.875C0.0916667 12.6917 0 12.4583 0 12.175C0 11.8917 0.0916667 11.6583 0.275 11.475L5.175 6.575L0.275 1.675C0.0916667 1.49167 0 1.25833 0 0.975C0 0.691667 0.0916667 0.458333 0.275 0.275C0.458333 0.0916667 0.691667 0 0.975 0C1.25833 0 1.49167 0.0916667 1.675 0.275L6.575 5.175L11.475 0.275C11.6583 0.0916667 11.8917 0 12.175 0C12.4583 0 12.6917 0.0916667 12.875 0.275C13.0583 0.458333 13.15 0.691667 13.15 0.975C13.15 1.25833 13.0583 1.49167 12.875 1.675L7.975 6.575L12.875 11.475C13.0583 11.6583 13.15 11.8917 13.15 12.175C13.15 12.4583 13.0583 12.6917 12.875 12.875C12.6917 13.0583 12.4583 13.15 12.175 13.15C11.8917 13.15 11.6583 13.0583 11.475 12.875L6.575 7.975Z" fill="white"/>
                </svg>
            </button>
        </div>
                <svg class="add-contact-card-svg" xmlns="http://www.w3.org/2000/svg" width="57" height="67"
                    viewBox="0 0 57 67" fill="none">
                    <path d="M40.7397 0H28.4242V13.8957H40.7397V0Z" fill="white" />
                    <path
                        d="M28.4243 25.197H40.7397V44.7947C40.796 49.5105 39.4275 54.1362 36.8083 58.0839C34.222 61.9194 29.2295 66.4829 19.9929 66.4829C9.93211 66.4829 4.06806 61.8167 0.903931 59.2597L8.67215 49.8621C11.7605 52.3352 14.7351 54.3696 20.0403 54.3696C24.057 54.3696 25.658 52.7645 26.5959 51.3646C27.8709 49.4203 28.5304 47.1465 28.4906 44.8321L28.4243 25.197Z"
                        fill="white" />
                    <path d="M22.1434 16.4248H9.82792V28.5567H22.1434V16.4248Z" fill="#29ABE2" />
                    <path
                        d="M47.1911 60.7904C47.1911 63.3754 45.8554 64.7659 43.9891 64.7659C42.1228 64.7659 40.9008 63.1141 40.9008 60.9211C40.9008 58.728 42.1607 56.9922 44.0933 56.9922C46.0259 56.9922 47.1911 58.7 47.1911 60.7904ZM42.3312 60.8931C42.3312 62.4516 42.966 63.5994 44.0554 63.5994C45.1449 63.5994 45.7606 62.3862 45.7606 60.7997C45.7606 59.4092 45.1922 58.1027 44.0554 58.1027C42.9186 58.1027 42.3312 59.3626 42.3312 60.8931Z"
                        fill="white" />
                    <path d="M49.6353 57.104V64.6445H48.2711V57.104H49.6353Z" fill="white" />
                    <path
                        d="M51.1131 64.6445V57.104H52.6289L54.2583 60.2116C54.6778 61.0242 55.051 61.8592 55.3762 62.7127C55.2909 61.7795 55.253 60.7063 55.253 59.5117V57.104H56.5035V64.6445H55.092L53.4436 61.4715C53.0072 60.638 52.6182 59.7812 52.2784 58.9051C52.2784 59.8384 52.3447 60.8929 52.3447 62.1901V64.6351L51.1131 64.6445Z"
                        fill="white" />
                </svg>
                <div class="add-contact-card-edit-headline">
                    <h2 class="add-contact-card-title">Edit contact</h2>
                    <div class="add-contact-card-underline-styled"></div>
                </div>
            </div>
        </section>
        <section class="overlay-right-side">
            <svg class="overlay-character-icon" xmlns="http://www.w3.org/2000/svg" width="134" height="134"
                viewBox="0 0 134 134" fill="none">
                <g filter="url(#filter0_d_636_3723)">
                    <rect x="7" y="7" width="120" height="120" rx="60" fill="white" />
                    <rect x="5.5" y="5.5" width="123" height="123" rx="61.5" stroke="white" stroke-width="3" />
                    <circle cx="67" cy="67" r="60" fill="#FF7A00" />
                    <path
                        d="M36.0977 83.7144H30.6233L42.9241 49.5325H48.8825L61.1833 83.7144H55.7089L46.0452 55.7413H45.7781L36.0977 83.7144ZM37.0157 70.3287H54.7742V74.6682H37.0157V70.3287ZM66.1195 49.5325H72.3783L83.2604 76.1036H83.661L94.5431 49.5325H100.802V83.7144H95.895V58.9793H95.5779L85.4969 83.6643H81.4245L71.3435 58.9626H71.0264V83.7144H66.1195V49.5325Z"
                        fill="white" />
                </g>
                <defs>
                    <filter id="filter0_d_636_3723" x="0" y="0" width="134" height="134" filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha" />
                        <feOffset />
                        <feGaussianBlur stdDeviation="2" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_636_3723" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_636_3723" result="shape" />
                    </filter>
                </defs>
            </svg>
            <section class="add-contact-content-container">
                <div class="position-container-close-icon">
                    <div class="add-contact-close-icon-container" onclick="hideEditContactCard()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <mask id="mask0_71720_5491" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="4"
                                width="24" height="25">
                                <rect x="4" y="4.96582" width="24" height="24" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_71720_5491)">
                                <path
                                    d="M15.9998 18.3659L11.0998 23.2659C10.9165 23.4492 10.6831 23.5409 10.3998 23.5409C10.1165 23.5409 9.88314 23.4492 9.6998 23.2659C9.51647 23.0825 9.4248 22.8492 9.4248 22.5659C9.4248 22.2825 9.51647 22.0492 9.6998 21.8659L14.5998 16.9659L9.6998 12.0659C9.51647 11.8825 9.4248 11.6492 9.4248 11.3659C9.4248 11.0825 9.51647 10.8492 9.6998 10.6659C9.88314 10.4825 10.1165 10.3909 10.3998 10.3909C10.6831 10.3909 10.9165 10.4825 11.0998 10.6659L15.9998 15.5659L20.8998 10.6659C21.0831 10.4825 21.3165 10.3909 21.5998 10.3909C21.8831 10.3909 22.1165 10.4825 22.2998 10.6659C22.4831 10.8492 22.5748 11.0825 22.5748 11.3659C22.5748 11.6492 22.4831 11.8825 22.2998 12.0659L17.3998 16.9659L22.2998 21.8659C22.4831 22.0492 22.5748 22.2825 22.5748 22.5659C22.5748 22.8492 22.4831 23.0825 22.2998 23.2659C22.1165 23.4492 21.8831 23.5409 21.5998 23.5409C21.3165 23.5409 21.0831 23.4492 20.8998 23.2659L15.9998 18.3659Z"
                                    fill="#2A3647" />
                            </g>
                        </svg>
                    </div>
                </div>
                <form action="" class="create-form" onsubmit="return false">
                    <section class="create-form-inputfields responsiv-edit-create-form-inputfields">
                    <div class="create-form-inputfields-container">
                        <label class="create-form-label">
                            <input id="edit_name" placeholder="Name" value="${name}" type="text">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <mask id="mask0_373102_1025" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                    y="0" width="24" height="24">
                                    <rect width="24" height="24" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_373102_1025)">
                                    <path
                                        d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM18 20H6C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20ZM6 18H18V17.2C18 17.0167 17.9542 16.85 17.8625 16.7C17.7708 16.55 17.65 16.4333 17.5 16.35C16.6 15.9 15.6917 15.5625 14.775 15.3375C13.8583 15.1125 12.9333 15 12 15C11.0667 15 10.1417 15.1125 9.225 15.3375C8.30833 15.5625 7.4 15.9 6.5 16.35C6.35 16.4333 6.22917 16.55 6.1375 16.7C6.04583 16.85 6 17.0167 6 17.2V18ZM12 10C12.55 10 13.0208 9.80417 13.4125 9.4125C13.8042 9.02083 14 8.55 14 8C14 7.45 13.8042 6.97917 13.4125 6.5875C13.0208 6.19583 12.55 6 12 6C11.45 6 10.9792 6.19583 10.5875 6.5875C10.1958 6.97917 10 7.45 10 8C10 8.55 10.1958 9.02083 10.5875 9.4125C10.9792 9.80417 11.45 10 12 10Z"
                                        fill="#A8A8A8" />
                                </g>
                            </svg>
                        </label>
                    </div>
                    <div class="create-form-inputfields-container">
                        <label class="create-form-label">
                            <input id="edit_email" placeholder="Email" value="${email}" type="text">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <mask id="mask0_373102_1032" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                    y="0" width="24" height="24">
                                    <rect width="24" height="24" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_373102_1032)">
                                    <path
                                        d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM20 8L12.525 12.675C12.4417 12.725 12.3542 12.7625 12.2625 12.7875C12.1708 12.8125 12.0833 12.825 12 12.825C11.9167 12.825 11.8292 12.8125 11.7375 12.7875C11.6458 12.7625 11.5583 12.725 11.475 12.675L4 8V18H20V8ZM12 11L20 6H4L12 11ZM4 8.25V6.775V6.8V6.7875V8.25Z"
                                        fill="#A8A8A8" />
                                </g>
                            </svg>
                        </label>
                    </div>
                    <div class="create-form-inputfields-container">    
                        <label class="create-form-label">
                            <input id="edit_phone" placeholder="Phone" value="${phone}" type="text">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <mask id="mask0_373102_1039" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                    y="0" width="24" height="25">
                                    <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_373102_1039)">
                                    <path
                                        d="M19.95 21.5C17.8667 21.5 15.8083 21.0458 13.775 20.1375C11.7417 19.2292 9.89167 17.9417 8.225 16.275C6.55833 14.6083 5.27083 12.7583 4.3625 10.725C3.45417 8.69167 3 6.63333 3 4.55C3 4.25 3.1 4 3.3 3.8C3.5 3.6 3.75 3.5 4.05 3.5H8.1C8.33333 3.5 8.54167 3.57917 8.725 3.7375C8.90833 3.89583 9.01667 4.08333 9.05 4.3L9.7 7.8C9.73333 8.06667 9.725 8.29167 9.675 8.475C9.625 8.65833 9.53333 8.81667 9.4 8.95L6.975 11.4C7.30833 12.0167 7.70417 12.6125 8.1625 13.1875C8.62083 13.7625 9.125 14.3167 9.675 14.85C10.1917 15.3667 10.7333 15.8458 11.3 16.2875C11.8667 16.7292 12.4667 17.1333 13.1 17.5L15.45 15.15C15.6 15 15.7958 14.8875 16.0375 14.8125C16.2792 14.7375 16.5167 14.7167 16.75 14.75L20.2 15.45C20.4333 15.5167 20.625 15.6375 20.775 15.8125C20.925 15.9875 21 16.1833 21 16.4V20.45C21 20.75 20.9 21 20.7 21.2C20.5 21.4 20.25 21.5 19.95 21.5ZM6.025 9.5L7.675 7.85L7.25 5.5H5.025C5.10833 6.18333 5.225 6.85833 5.375 7.525C5.525 8.19167 5.74167 8.85 6.025 9.5ZM14.975 18.45C15.625 18.7333 16.2875 18.9583 16.9625 19.125C17.6375 19.2917 18.3167 19.4 19 19.45V17.25L16.65 16.775L14.975 18.45Z"
                                        fill="#A8A8A8" />
                                </g>
                            </svg>
                        </label>
                    </div>    
                    </section>

                    <section class="edit-contact-d-s-buttons">
                        <button class="edit-contact-delete-btn" onclick="closeOverlay(); deleteCurrentContact('${name}','${email}')">
                            <p class="edti-contact-delete-btn-txt">Delete</p>
                        </button>
                        <button class="edit-contact-save-contact-btn" onclick=" closeOverlay(); saveChangedContact('${name}','${email}')">
                            <p class="edit-contact-save-contact-btn-txt">Save</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <mask id="mask0_71766_6020" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                    y="0" width="24" height="24">
                                    <rect x="0.0683594" width="24" height="24" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_71766_6020)">
                                    <path
                                        d="M9.61905 15.15L18.0941 6.675C18.2941 6.475 18.5316 6.375 18.8066 6.375C19.0816 6.375 19.3191 6.475 19.5191 6.675C19.7191 6.875 19.8191 7.1125 19.8191 7.3875C19.8191 7.6625 19.7191 7.9 19.5191 8.1L10.3191 17.3C10.1191 17.5 9.88572 17.6 9.61905 17.6C9.35239 17.6 9.11905 17.5 8.91905 17.3L4.61905 13C4.41905 12.8 4.32322 12.5625 4.33155 12.2875C4.33989 12.0125 4.44405 11.775 4.64405 11.575C4.84405 11.375 5.08155 11.275 5.35655 11.275C5.63155 11.275 5.86905 11.375 6.06905 11.575L9.61905 15.15Z"
                                        fill="white" />
                                </g>
                            </svg>
                        </button>
                    </section>
                </form>
            </section>

        </section>
    </section>
    </div>
        <div id="responsiv_contact_edit_small_menu" class="responsiv-edit-delete-menu d_none" onclick="event.stopPropagation()">
            <button onclick="editContact('${name}', '${email}', '${phone}', 'true')">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <mask id="mask0_71395_18215" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                        width="24" height="24">
                        <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_71395_18215)">
                        <path
                            d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z"
                            fill="#2A3647" />
                    </g>
                </svg>
                <p>Edit</p>
            </button>
            <button onclick="deleteCurrentContact('${name}', '${email}'); closeResponsiveContactEditMenu(0)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <mask id="mask0_383915_3631" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                        width="24" height="24">
                        <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_383915_3631)">
                        <path
                            d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z"
                            fill="#2A3647" />
                    </g>
                </svg>
                <p>Delete</p>
            </button>
        </div>`;
}
