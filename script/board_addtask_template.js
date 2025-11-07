
/**
 * Returns the HTML template for the board add task overlay
 * @returns {string} Complete HTML template for the add task form in the board overlay
 */
function boardAddTaskTemplate(progress) {
    return `
        <div class="add-task-card" onclick="event.stopPropagation(); closeDropdownMenus(event)">
            <div class="add-task-header">
                <h2>Add Task</h2>
                <div class="close-board-overlay" onclick="toggleAddTaskOverlay()">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <mask id="mask0_71720_5535" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="4" width="24"
                            height="24">
                            <rect x="4" y="4" width="24" height="24" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_71720_5535)">
                            <path
                                d="M16 17.4L11.1 22.3C10.9167 22.4834 10.6833 22.575 10.4 22.575C10.1167 22.575 9.88333 22.4834 9.7 22.3C9.51667 22.1167 9.425 21.8834 9.425 21.6C9.425 21.3167 9.51667 21.0834 9.7 20.9L14.6 16L9.7 11.1C9.51667 10.9167 9.425 10.6834 9.425 10.4C9.425 10.1167 9.51667 9.88338 9.7 9.70005C9.88333 9.51672 10.1167 9.42505 10.4 9.42505C10.6833 9.42505 10.9167 9.51672 11.1 9.70005L16 14.6L20.9 9.70005C21.0833 9.51672 21.3167 9.42505 21.6 9.42505C21.8833 9.42505 22.1167 9.51672 22.3 9.70005C22.4833 9.88338 22.575 10.1167 22.575 10.4C22.575 10.6834 22.4833 10.9167 22.3 11.1L17.4 16L22.3 20.9C22.4833 21.0834 22.575 21.3167 22.575 21.6C22.575 21.8834 22.4833 22.1167 22.3 22.3C22.1167 22.4834 21.8833 22.575 21.6 22.575C21.3167 22.575 21.0833 22.4834 20.9 22.3L16 17.4Z"
                                fill="#2A3647" />
                        </g>
                    </svg>
                </div>
            </div>
            <form id="add_task_form" class="add-task-form-overlay" action="" onsubmit="return false;">
                <div class="add-task-form-main">
                    <section class="add-task-form-left">
                        <div class="h-96" onclick="event.stopPropagation()">
                            <label for="add_task_title">
                                <p>Titel</p>
                                <p class="add-task-form-required">*</p>

                            </label>
                            <div class="add-tast-form-input-required-container">
                                <input id="add_task_title" type="text"
                                    class="w-100 add-task-form-left-title-input add-task-form-input-placeholder-default"
                                    placeholder="Enter a Title" onfocus="highlightInputFields('add_task_title')">
                                <div class="h-16">
                                    <p id="required_msg_title" class="add-tast-form-required-msg d_none">This field
                                        is required</p>
                                </div>
                            </div>
                        </div>

                        <div onclick="event.stopPropagation()">
                            <label for="add_task_description">
                                <p>Description</p>
                            </label>
                            <div class="h-136">
                                <textarea name="" id="add_task_description" placeholder="Enter a Description"
                                    class="w-100 add-task-form-textarea add-task-form-input-placeholder-default"
                                    onfocus="highlightInputFields('add_task_description')"></textarea>
                                <div class="h-16"></div>
                            </div>
                        </div>
                        <div class="h-96" onclick="event.stopPropagation()">
                            <label for="add_task_due_date" class="add-task-due-date-label">
                                <div class="add-task-required-label-head">
                                    <p>Due date</p>
                                    <p class="add-task-form-required">*</p>
                                </div>
                                <div class="add-task-form-input-required-container">
                                    <div id="add_task_due_date_label_placeholder_svg"
                                        class="add-task-due-date-label-placeholder-svg">
                                        <svg class="" xmlns="http://www.w3.org/2000/svg" width="117" height="20"
                                            viewBox="0 0 117 20" fill="none">
                                            <path
                                                d="M4.6307 15.4543C3.72161 15.4543 2.91906 15.2247 2.22303 14.7654C1.52701 14.3014 0.982503 13.648 0.589511 12.8052C0.196518 11.9576 2.22623e-05 10.9562 2.22623e-05 9.80091C2.22623e-05 8.65508 0.196518 7.66076 0.589511 6.81796C0.982503 5.97516 1.52938 5.32411 2.23014 4.86483C2.93089 4.40555 3.74055 4.17591 4.65911 4.17591C5.36934 4.17591 5.93042 4.29429 6.34235 4.53103C6.75902 4.76304 7.07625 5.02819 7.29406 5.32648C7.51659 5.62004 7.68942 5.86152 7.81252 6.05091H7.95457V0.681596H9.6307V15.2271H8.01139V13.5509H7.81252C7.68942 13.7498 7.51423 14.0007 7.28695 14.3038C7.05968 14.6021 6.73534 14.8696 6.31394 15.1063C5.89254 15.3383 5.33146 15.4543 4.6307 15.4543ZM4.85798 13.9486C5.53033 13.9486 6.09851 13.7735 6.56252 13.4231C7.02654 13.068 7.37928 12.5779 7.62076 11.9529C7.86224 11.3232 7.98298 10.5964 7.98298 9.77251C7.98298 8.95811 7.86461 8.24552 7.62786 7.63472C7.39112 7.01919 7.04074 6.54097 6.57673 6.20006C6.11271 5.85442 5.5398 5.6816 4.85798 5.6816C4.14775 5.6816 3.55589 5.86389 3.08241 6.22847C2.61366 6.58832 2.26091 7.07838 2.02417 7.69864C1.79216 8.31417 1.67616 9.00546 1.67616 9.77251C1.67616 10.549 1.79453 11.2545 2.03127 11.889C2.27275 12.5187 2.62786 13.0206 3.09661 13.3947C3.5701 13.764 4.15722 13.9486 4.85798 13.9486ZM17.0526 15.4543C16.1435 15.4543 15.3409 15.2247 14.6449 14.7654C13.9489 14.3014 13.4044 13.648 13.0114 12.8052C12.6184 11.9576 12.4219 10.9562 12.4219 9.80091C12.4219 8.65508 12.6184 7.66076 13.0114 6.81796C13.4044 5.97516 13.9513 5.32411 14.652 4.86483C15.3528 4.40555 16.1624 4.17591 17.081 4.17591C17.7912 4.17591 18.3523 4.29429 18.7642 4.53103C19.1809 4.76304 19.4981 5.02819 19.7159 5.32648C19.9385 5.62004 20.1113 5.86152 20.2344 6.05091H20.3764V0.681596H22.0526V15.2271H20.4333V13.5509H20.2344C20.1113 13.7498 19.9361 14.0007 19.7088 14.3038C19.4816 14.6021 19.1572 14.8696 18.7358 15.1063C18.3144 15.3383 17.7533 15.4543 17.0526 15.4543ZM17.2799 13.9486C17.9522 13.9486 18.5204 13.7735 18.9844 13.4231C19.4484 13.068 19.8012 12.5779 20.0426 11.9529C20.2841 11.3232 20.4049 10.5964 20.4049 9.77251C20.4049 8.95811 20.2865 8.24552 20.0497 7.63472C19.813 7.01919 19.4626 6.54097 18.9986 6.20006C18.5346 5.85442 17.9617 5.6816 17.2799 5.6816C16.5696 5.6816 15.9778 5.86389 15.5043 6.22847C15.0355 6.58832 14.6828 7.07838 14.446 7.69864C14.214 8.31417 14.098 9.00546 14.098 9.77251C14.098 10.549 14.2164 11.2545 14.4531 11.889C14.6946 12.5187 15.0497 13.0206 15.5185 13.3947C15.992 13.764 16.5791 13.9486 17.2799 13.9486ZM30.4972 -0.000222921L25.8097 17.4146H24.2756L28.9631 -0.000222921H30.4972ZM32.484 15.2271V4.31796H34.1034V6.02251H34.2454C34.4727 5.44012 34.8396 4.98794 35.3463 4.66597C35.8529 4.33927 36.4613 4.17591 37.1715 4.17591C37.8912 4.17591 38.4902 4.33927 38.9684 4.66597C39.4514 4.98794 39.8278 5.44012 40.0977 6.02251H40.2113C40.4907 5.45906 40.9097 5.01161 41.4684 4.68018C42.0271 4.344 42.6971 4.17591 43.4784 4.17591C44.4537 4.17591 45.2516 4.48131 45.8718 5.09211C46.4921 5.69817 46.8022 6.64277 46.8022 7.92591V15.2271H45.1261V7.92591C45.1261 7.12099 44.9059 6.54571 44.4656 6.20006C44.0252 5.85442 43.5068 5.6816 42.9102 5.6816C42.1431 5.6816 41.5489 5.9136 41.1275 6.37762C40.7061 6.8369 40.4954 7.41929 40.4954 8.12478V15.2271H38.7909V7.75546C38.7909 7.13519 38.5896 6.63567 38.1872 6.25688C37.7847 5.87336 37.2662 5.6816 36.6318 5.6816C36.1962 5.6816 35.789 5.7976 35.4102 6.02961C35.0361 6.26161 34.7331 6.58358 34.5011 6.99552C34.2738 7.40271 34.1602 7.87383 34.1602 8.40887V15.2271H32.484ZM49.8669 15.2271V4.31796H51.4862V6.02251H51.6282C51.8555 5.44012 52.2224 4.98794 52.7291 4.66597C53.2357 4.33927 53.8441 4.17591 54.5544 4.17591C55.2741 4.17591 55.873 4.33927 56.3512 4.66597C56.8342 4.98794 57.2106 5.44012 57.4805 6.02251H57.5941C57.8735 5.45906 58.2925 5.01161 58.8512 4.68018C59.4099 4.344 60.0799 4.17591 60.8612 4.17591C61.8366 4.17591 62.6344 4.48131 63.2546 5.09211C63.8749 5.69817 64.185 6.64277 64.185 7.92591V15.2271H62.5089V7.92591C62.5089 7.12099 62.2887 6.54571 61.8484 6.20006C61.408 5.85442 60.8896 5.6816 60.293 5.6816C59.5259 5.6816 58.9317 5.9136 58.5103 6.37762C58.0889 6.8369 57.8782 7.41929 57.8782 8.12478V15.2271H56.1737V7.75546C56.1737 7.13519 55.9724 6.63567 55.57 6.25688C55.1675 5.87336 54.6491 5.6816 54.0146 5.6816C53.579 5.6816 53.1718 5.7976 52.793 6.02961C52.4189 6.26161 52.1159 6.58358 51.8839 6.99552C51.6566 7.40271 51.543 7.87383 51.543 8.40887V15.2271H49.8669ZM72.3917 -0.000222921L67.7042 17.4146H66.1701L70.8576 -0.000222921H72.3917ZM75.4581 19.318C75.174 19.318 74.9207 19.2943 74.6982 19.2469C74.4756 19.2043 74.3218 19.1617 74.2365 19.1191L74.6627 17.6418C75.0699 17.746 75.4297 17.7839 75.7422 17.7555C76.0547 17.7271 76.3317 17.5874 76.5732 17.3364C76.8194 17.0902 77.0443 16.6901 77.2479 16.1361L77.5604 15.2839L73.5263 4.31796H75.3445L78.3558 13.0111H78.4695L81.4808 4.31796H83.299L78.6683 16.818C78.46 17.3814 78.202 17.8478 77.8942 18.2171C77.5864 18.5912 77.229 18.8681 76.8218 19.0481C76.4193 19.228 75.9647 19.318 75.4581 19.318ZM86.5909 19.318C86.3068 19.318 86.0535 19.2943 85.831 19.2469C85.6085 19.2043 85.4546 19.1617 85.3693 19.1191L85.7955 17.6418C86.2027 17.746 86.5625 17.7839 86.875 17.7555C87.1875 17.7271 87.4645 17.5874 87.706 17.3364C87.9522 17.0902 88.1771 16.6901 88.3807 16.1361L88.6932 15.2839L84.6591 4.31796H86.4773L89.4887 13.0111H89.6023L92.6137 4.31796H94.4318L89.8012 16.818C89.5928 17.3814 89.3348 17.8478 89.027 18.2171C88.7192 18.5912 88.3618 18.8681 87.9546 19.0481C87.5521 19.228 87.0976 19.318 86.5909 19.318ZM97.7237 19.318C97.4397 19.318 97.1863 19.2943 96.9638 19.2469C96.7413 19.2043 96.5874 19.1617 96.5022 19.1191L96.9283 17.6418C97.3355 17.746 97.6953 17.7839 98.0078 17.7555C98.3203 17.7271 98.5973 17.5874 98.8388 17.3364C99.085 17.0902 99.3099 16.6901 99.5135 16.1361L99.826 15.2839L95.7919 4.31796H97.6101L100.621 13.0111H100.735L103.746 4.31796H105.565L100.934 16.818C100.726 17.3814 100.468 17.8478 100.16 18.2171C99.8521 18.5912 99.4946 18.8681 99.0874 19.0481C98.6849 19.228 98.2304 19.318 97.7237 19.318ZM108.857 19.318C108.572 19.318 108.319 19.2943 108.097 19.2469C107.874 19.2043 107.72 19.1617 107.635 19.1191L108.061 17.6418C108.468 17.746 108.828 17.7839 109.141 17.7555C109.453 17.7271 109.73 17.5874 109.972 17.3364C110.218 17.0902 110.443 16.6901 110.646 16.1361L110.959 15.2839L106.925 4.31796H108.743L111.754 13.0111H111.868L114.879 4.31796H116.697L112.067 16.818C111.858 17.3814 111.6 17.8478 111.293 18.2171C110.985 18.5912 110.627 18.8681 110.22 19.0481C109.818 19.228 109.363 19.318 108.857 19.318Z"
                                                fill="#D1D1D1" />
                                        </svg>
                                    </div>
                                    <input id="add_task_due_date"
                                        class="w-100 add-task-form-default-inputs add-task-form-input-placeholder-default"
                                        type="date" placeholder="dd/mm/yyyy" onclick="openCalender('add_task_due_date')"
                                        onfocus="highlightInputFields('add_task_due_date')">
                                    <div class="h-16">
                                        <p id="required_msg_due_date" class="add-tast-form-required-msg d_none">This
                                            field is required</p>
                                    </div>
                                </div>
                                <svg class="add-task-due-date-label-calender-svg" xmlns="http://www.w3.org/2000/svg" width="24"
                                    height="24" viewBox="0 0 24 24" fill="none">
                                    <mask id="mask0_387837_2602" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                                        width="24" height="24">
                                        <rect width="24" height="24" fill="#D9D9D9" />
                                    </mask>
                                    <g mask="url(#mask0_387837_2602)">
                                        <path
                                            d="M14.5 18C13.8 18 13.2083 17.7583 12.725 17.275C12.2417 16.7917 12 16.2 12 15.5C12 14.8 12.2417 14.2083 12.725 13.725C13.2083 13.2417 13.8 13 14.5 13C15.2 13 15.7917 13.2417 16.275 13.725C16.7583 14.2083 17 14.8 17 15.5C17 16.2 16.7583 16.7917 16.275 17.275C15.7917 17.7583 15.2 18 14.5 18ZM5 22C4.45 22 3.97917 21.8042 3.5875 21.4125C3.19583 21.0208 3 20.55 3 20V6C3 5.45 3.19583 4.97917 3.5875 4.5875C3.97917 4.19583 4.45 4 5 4H6V3C6 2.71667 6.09583 2.47917 6.2875 2.2875C6.47917 2.09583 6.71667 2 7 2C7.28333 2 7.52083 2.09583 7.7125 2.2875C7.90417 2.47917 8 2.71667 8 3V4H16V3C16 2.71667 16.0958 2.47917 16.2875 2.2875C16.4792 2.09583 16.7167 2 17 2C17.2833 2 17.5208 2.09583 17.7125 2.2875C17.9042 2.47917 18 2.71667 18 3V4H19C19.55 4 20.0208 4.19583 20.4125 4.5875C20.8042 4.97917 21 5.45 21 6V20C21 20.55 20.8042 21.0208 20.4125 21.4125C20.0208 21.8042 19.55 22 19 22H5ZM5 20H19V10H5V20ZM5 8H19V6H5V8Z"
                                            fill="#2A3647" />
                                    </g>
                                </svg>
                            </label>
                        </div>
                    </section>
                    <div class="add-task-form-seperator">
                    </div>
                    <section class="add-task-form-right">
                        <div class="add-task-priority-btns-container">
                            <p>Priority</p>
                            <div class="add-task-priority-btns">
                                <button id="add_task_priority_urgent" class="add-task-priority-btns-hover-class"
                                    onclick="activatePriority('urgent')">
                                    <p>Urgent</p>
                                    <svg id="add_task_priority_urgent_svg" xmlns="http://www.w3.org/2000/svg" width="20"
                                        height="15" viewBox="0 0 20 15" fill="none">
                                        <g clip-path="url(#clip0_387837_1593)">
                                            <path
                                                d="M18.9043 14.5096C18.6696 14.51 18.4411 14.4351 18.2522 14.2961L10.0001 8.21288L1.74809 14.2961C1.63224 14.3816 1.50066 14.4435 1.36086 14.4783C1.22106 14.513 1.07577 14.5199 0.933305 14.4986C0.790837 14.4772 0.653973 14.428 0.530528 14.3538C0.407083 14.2796 0.299474 14.1818 0.213845 14.0661C0.128216 13.9503 0.0662437 13.8188 0.0314671 13.6791C-0.00330956 13.5394 -0.0102098 13.3943 0.0111604 13.2519C0.0543195 12.9644 0.21001 12.7058 0.443982 12.533L9.34809 5.96249C9.53679 5.8229 9.76536 5.74756 10.0001 5.74756C10.2349 5.74756 10.4635 5.8229 10.6522 5.96249L19.5563 12.533C19.7422 12.6699 19.8801 12.862 19.9503 13.0819C20.0204 13.3018 20.0193 13.5382 19.9469 13.7573C19.8746 13.9765 19.7349 14.1673 19.5476 14.3024C19.3604 14.4375 19.1352 14.51 18.9043 14.5096Z"
                                                fill="#FF3D00" />
                                            <path
                                                d="M18.9043 8.76057C18.6696 8.76097 18.4411 8.68612 18.2522 8.54702L10.0002 2.46386L1.7481 8.54702C1.51412 8.71983 1.22104 8.79269 0.93331 8.74956C0.645583 8.70643 0.386785 8.55086 0.213849 8.31706C0.0409137 8.08326 -0.0319941 7.79039 0.011165 7.50288C0.054324 7.21536 0.210015 6.95676 0.443986 6.78395L9.3481 0.213471C9.5368 0.0738799 9.76537 -0.00146484 10.0002 -0.00146484C10.2349 -0.00146484 10.4635 0.0738799 10.6522 0.213471L19.5563 6.78395C19.7422 6.92087 19.8801 7.11298 19.9503 7.33286C20.0204 7.55274 20.0193 7.78914 19.947 8.00832C19.8746 8.22751 19.7349 8.41826 19.5476 8.55335C19.3604 8.68844 19.1352 8.76096 18.9043 8.76057Z"
                                                fill="#FF3D00" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_387837_1593">
                                                <rect width="20" height="14.5098" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                                <button id="add_task_priority_medium" class="add-task-priority-btn-medium-active"
                                    onclick="activatePriority('medium')">
                                    <p>Medium</p>
                                    <svg id="add_task_priority_medium_svg" class="add-task-priority-active-svg"
                                        xmlns="http://www.w3.org/2000/svg" width="20" height="8" viewBox="0 0 20 8" fill="none">
                                        <g clip-path="url(#clip0_156_950)">
                                            <path
                                                d="M18.9041 7.45086H1.09589C0.805242 7.45086 0.526498 7.33456 0.320979 7.12755C0.11546 6.92054 0 6.63977 0 6.34701C0 6.05425 0.11546 5.77349 0.320979 5.56647C0.526498 5.35946 0.805242 5.24316 1.09589 5.24316H18.9041C19.1948 5.24316 19.4735 5.35946 19.679 5.56647C19.8845 5.77349 20 6.05425 20 6.34701C20 6.63977 19.8845 6.92054 19.679 7.12755C19.4735 7.33456 19.1948 7.45086 18.9041 7.45086Z"
                                                fill="#FFA800" />
                                            <path
                                                d="M18.9041 2.2077H1.09589C0.805242 2.2077 0.526498 2.0914 0.320979 1.88439C0.11546 1.67738 0 1.39661 0 1.10385C0 0.81109 0.11546 0.530322 0.320979 0.32331C0.526498 0.116298 0.805242 0 1.09589 0L18.9041 0C19.1948 0 19.4735 0.116298 19.679 0.32331C19.8845 0.530322 20 0.81109 20 1.10385C20 1.39661 19.8845 1.67738 19.679 1.88439C19.4735 2.0914 19.1948 2.2077 18.9041 2.2077Z"
                                                fill="#FFA800" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_156_950">
                                                <rect width="20" height="7.45098" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                                <button id="add_task_priority_low" class="add-task-priority-btns-hover-class"
                                    onclick="activatePriority('low')">
                                    <p>Low</p>
                                    <svg id="add_task_priority_low_svg" xmlns="http://www.w3.org/2000/svg" width="20"
                                        height="15" viewBox="0 0 20 15" fill="none">
                                        <path
                                            d="M10 8.76077C9.7654 8.76118 9.53687 8.68634 9.34802 8.54726L0.444913 1.97752C0.329075 1.89197 0.231235 1.78445 0.15698 1.66111C0.0827245 1.53777 0.033508 1.40102 0.0121402 1.25868C-0.031014 0.971193 0.0418855 0.678356 0.214802 0.444584C0.387718 0.210811 0.646486 0.0552534 0.934181 0.0121312C1.22188 -0.0309911 1.51493 0.0418545 1.74888 0.214643L10 6.29712L18.2511 0.214643C18.367 0.129087 18.4985 0.0671675 18.6383 0.0324205C18.7781 -0.00232646 18.9234 -0.00922079 19.0658 0.0121312C19.2083 0.0334832 19.3451 0.0826633 19.4685 0.156864C19.592 0.231064 19.6996 0.328831 19.7852 0.444584C19.8708 0.560336 19.9328 0.691806 19.9676 0.831488C20.0023 0.97117 20.0092 1.11633 19.9879 1.25868C19.9665 1.40102 19.9173 1.53777 19.843 1.66111C19.7688 1.78445 19.6709 1.89197 19.5551 1.97752L10.652 8.54726C10.4631 8.68634 10.2346 8.76118 10 8.76077Z"
                                            fill="#7AE229" />
                                        <path
                                            d="M10 14.5093C9.7654 14.5097 9.53687 14.4349 9.34802 14.2958L0.444913 7.72606C0.210967 7.55327 0.0552944 7.29469 0.0121402 7.00721C-0.031014 6.71973 0.0418855 6.42689 0.214802 6.19312C0.387718 5.95935 0.646486 5.80379 0.934181 5.76067C1.22188 5.71754 1.51493 5.79039 1.74888 5.96318L10 12.0457L18.2511 5.96318C18.4851 5.79039 18.7781 5.71754 19.0658 5.76067C19.3535 5.80379 19.6123 5.95935 19.7852 6.19312C19.9581 6.42689 20.031 6.71973 19.9879 7.00721C19.9447 7.29469 19.789 7.55327 19.5551 7.72606L10.652 14.2958C10.4631 14.4349 10.2346 14.5097 10 14.5093Z"
                                            fill="#7AE229" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div id="add_task_form_assigned_to_section" class="add-task-form-assigned-to-section h-80"
                            onclick="event.stopPropagation()">
                            <label for="add_task_assigned_to" class="add-task-assigned-to-category-label"
                                onclick="toggleAssignedToContactList()" onkeyup="filterInputValue()">
                                <p>Assigned to</p>
                                <input id="add_task_assigned_to"
                                    class="w-100 add-task-form-default-inputs add-task-form-input-placeholder-black" type="text"
                                    onfocus="highlightInputFields('add_task_assigned_to')"
                                    placeholder="Select contacts to assign">
                                <div id="add_task_form_assigned_to_arrow_svg" class="add-task-form-assigned-to-arrow-down-svg"
                                    onclick="event.stopPropagation()">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none">
                                        <mask id="mask0_387837_1520" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                            y="0" width="24" height="24">
                                            <rect width="24" height="24" fill="#D9D9D9" />
                                        </mask>
                                        <g mask="url(#mask0_387837_1520)">
                                            <path
                                                d="M11.3 14.3L8.69998 11.7C8.38331 11.3833 8.31248 11.0208 8.48748 10.6125C8.66248 10.2042 8.97498 10 9.42498 10H14.575C15.025 10 15.3375 10.2042 15.5125 10.6125C15.6875 11.0208 15.6166 11.3833 15.3 11.7L12.7 14.3C12.6 14.4 12.4916 14.475 12.375 14.525C12.2583 14.575 12.1333 14.6 12 14.6C11.8666 14.6 11.7416 14.575 11.625 14.525C11.5083 14.475 11.4 14.4 11.3 14.3Z"
                                                fill="#2A3647" />
                                        </g>
                                    </svg>
                                </div>
                            </label>
                            <div class="add-task-form-assigned-to-dropdown">
                                <ul id="add_task_form_assigned_to_dropdown_contacts" onclick="event.stopPropagation()"
                                    class="add-task-form-assigned-to-dropdown-contacts d_none">
                                </ul>
                            </div>
                            <div id="current_assigned_to_contacts" class="current-assigned-to-contacts-container d_none">
                            </div>
                        </div>
                        <div class="add-task-form-assigned-to-section h-80" onclick="event.stopPropagation()">
                            <label for="add_task_category" class="add-task-assigned-to-category-label"
                                onclick="toggleCategoryList()">
                                <div class="add-task-required-label-head">
                                    <p>Category</p>
                                    <p class="add-task-form-required">*</p>
                                </div>
                                <input id="add_task_category"
                                    class="w-100 add-task-form-default-inputs add-task-form-input-placeholder-black" type="text"
                                    placeholder="Select task category" onfocus="highlightInputFields('add_task_category')" readonly>
                                <div id="add_task_form_category_arrow_svg" class="add-task-form-assigned-to-arrow-down-svg"
                                    onclick="event.stopPropagation()">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none">
                                        <mask id="mask0_387837_1520" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                            y="0" width="24" height="24">
                                            <rect width="24" height="24" fill="#D9D9D9" />
                                        </mask>
                                        <g mask="url(#mask0_387837_1520)">
                                            <path
                                                d="M11.3 14.3L8.69998 11.7C8.38331 11.3833 8.31248 11.0208 8.48748 10.6125C8.66248 10.2042 8.97498 10 9.42498 10H14.575C15.025 10 15.3375 10.2042 15.5125 10.6125C15.6875 11.0208 15.6166 11.3833 15.3 11.7L12.7 14.3C12.6 14.4 12.4916 14.475 12.375 14.525C12.2583 14.575 12.1333 14.6 12 14.6C11.8666 14.6 11.7416 14.575 11.625 14.525C11.5083 14.475 11.4 14.4 11.3 14.3Z"
                                                fill="#2A3647" />
                                        </g>
                                    </svg>
                                </div>
                            </label>
                            <div class="required-msg-category h-16">
                                <p id="required_msg_category" class="add-tast-form-required-msg d_none">This field
                                    is required</p>
                            </div>
                            <div class="add-task-form-category-dropdown">
                                <ul id="add_task_form_category_dropdown_category" onclick="event.stopPropagation()"
                                    class="add-task-form-category-dropdown-category d_none">
                                    <li onclick="chooseCategory('Technical Task')"
                                        class="add-task-form-assigned-to-dropdown-contacts-default-hover-class">
                                        <p>Technical Task</p>
                                    </li>
                                    <li onclick="chooseCategory('User Story')"
                                        class="add-task-form-assigned-to-dropdown-contacts-default-hover-class">
                                        <p>User Story</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="h-80" onclick="event.stopPropagation()">
                            <label for="add_task_subtasks" class="add-task-assigned-to-category-label">
                                <p>Subtasks</p>
                                <input id="add_task_subtasks"
                                    class="w-100 add-task-form-default-inputs add-task-form-input-placeholder-default"
                                    type="text" placeholder="Add new subtask"
                                    onfocus="highlightInputFields('add_task_subtasks')">
                                <div id="add_task_form_subtasks_btns" class="add-task-form-subtasks-btns d_none">
                                    <button onclick="resetAddTaskSubtasksInputField()">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none">
                                            <mask id="mask0_75601_14760" style="mask-type:alpha" maskUnits="userSpaceOnUse"
                                                x="0" y="0" width="24" height="24">
                                                <rect width="24" height="24" fill="#D9D9D9" />
                                            </mask>
                                            <g mask="url(#mask0_75601_14760)">
                                                <path
                                                    d="M11.9998 13.4L7.0998 18.3C6.91647 18.4834 6.68314 18.575 6.3998 18.575C6.11647 18.575 5.88314 18.4834 5.6998 18.3C5.51647 18.1167 5.4248 17.8834 5.4248 17.6C5.4248 17.3167 5.51647 17.0834 5.6998 16.9L10.5998 12L5.6998 7.10005C5.51647 6.91672 5.4248 6.68338 5.4248 6.40005C5.4248 6.11672 5.51647 5.88338 5.6998 5.70005C5.88314 5.51672 6.11647 5.42505 6.3998 5.42505C6.68314 5.42505 6.91647 5.51672 7.0998 5.70005L11.9998 10.6L16.8998 5.70005C17.0831 5.51672 17.3165 5.42505 17.5998 5.42505C17.8831 5.42505 18.1165 5.51672 18.2998 5.70005C18.4831 5.88338 18.5748 6.11672 18.5748 6.40005C18.5748 6.68338 18.4831 6.91672 18.2998 7.10005L13.3998 12L18.2998 16.9C18.4831 17.0834 18.5748 17.3167 18.5748 17.6C18.5748 17.8834 18.4831 18.1167 18.2998 18.3C18.1165 18.4834 17.8831 18.575 17.5998 18.575C17.3165 18.575 17.0831 18.4834 16.8998 18.3L11.9998 13.4Z"
                                                    fill="#2A3647" />
                                            </g>
                                        </svg>
                                    </button>
                                    <div class="add-task-subtasks-input-seperator"></div>
                                    <button onclick="setSubtask()">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none">
                                            <mask id="mask0_75601_14762" style="mask-type:alpha" maskUnits="userSpaceOnUse"
                                                x="0" y="0" width="24" height="24">
                                                <rect width="24" height="24" fill="#D9D9D9" />
                                            </mask>
                                            <g mask="url(#mask0_75601_14762)">
                                                <path
                                                    d="M9.55021 15.15L18.0252 6.675C18.2252 6.475 18.4627 6.375 18.7377 6.375C19.0127 6.375 19.2502 6.475 19.4502 6.675C19.6502 6.875 19.7502 7.1125 19.7502 7.3875C19.7502 7.6625 19.6502 7.9 19.4502 8.1L10.2502 17.3C10.0502 17.5 9.81687 17.6 9.55021 17.6C9.28354 17.6 9.05021 17.5 8.85021 17.3L4.55021 13C4.35021 12.8 4.25437 12.5625 4.26271 12.2875C4.27104 12.0125 4.37521 11.775 4.57521 11.575C4.77521 11.375 5.01271 11.275 5.28771 11.275C5.56271 11.275 5.80021 11.375 6.00021 11.575L9.55021 15.15Z"
                                                    fill="#2A3647" />
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                            </label>
                            <div class="add-task-subtaks-dropdown">
                                <ul id="add_task_form_subtasks_dropdown_subtasks"
                                    class="add-task-form-subtasks-dropdown-subtasks ">

                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
                <section class="add-task-footer-and-btns">
                    <div class="add-task-form-info-container">
                        <p class="add-task-form-required">*</p>
                        <p>This fiels is required</p>
                    </div>
                    <div class="add-task-form-btns">
                        <button class="add-task-form-clear-btn" onclick="clearForm()">
                            <p>Clear</p>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M12.0011 11.9998L17.2441 17.2428M6.75806 17.2428L12.0011 11.9998L6.75806 17.2428ZM17.2441 6.75684L12.0001 11.9998L17.2441 6.75684ZM12.0001 11.9998L6.75806 6.75684L12.0001 11.9998Z"
                                    stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                        <button id="add_task_form_create_btn" class="add-task-form-create-btn" onclick="createNewTask('${progress}', 'fromBoard')">
                            <p>Create Task</p>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <mask id="mask0_387746_82" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                                    width="24" height="24">
                                    <rect width="24" height="24" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_387746_82)">
                                    <path
                                        d="M9.55069 15.15L18.0257 6.675C18.2257 6.475 18.4632 6.375 18.7382 6.375C19.0132 6.375 19.2507 6.475 19.4507 6.675C19.6507 6.875 19.7507 7.1125 19.7507 7.3875C19.7507 7.6625 19.6507 7.9 19.4507 8.1L10.2507 17.3C10.0507 17.5 9.81736 17.6 9.55069 17.6C9.28403 17.6 9.05069 17.5 8.85069 17.3L4.5507 13C4.3507 12.8 4.25486 12.5625 4.2632 12.2875C4.27153 12.0125 4.3757 11.775 4.5757 11.575C4.7757 11.375 5.0132 11.275 5.2882 11.275C5.5632 11.275 5.80069 11.375 6.00069 11.575L9.55069 15.15Z"
                                        fill="white" />
                                </g>
                            </svg>
                        </button>
                    </div>
                </section>
            </form>
        </div>
    `
}