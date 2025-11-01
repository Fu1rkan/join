let logoAnimated = false;

function init() {
    if (!logoAnimated) {
        setTimeout(() => {
            renderJoinLogo();
            logoAnimated = true;
        }, 980);
    } else {
        renderJoinLogo();
    }
}

// render LogIn incl. password show and hide functions
function renderLogIn() {
    document.getElementById('main').innerHTML = '';
    document.getElementById('main').innerHTML += logInTemplate();
    if (logoAnimated) {
        renderJoinLogo();
    }
    addPasswordInputListener();
}

// render SignUp incl. password show and hide functions
function renderSignUp() {
    document.getElementById('main').innerHTML = '';
    document.getElementById('main').innerHTML += signUpTemplate();
    renderJoinLogo();
    addPasswordInputListener();
    addRepeatPasswordListener();
}

// renders main Join Logo top left corner after animation
function renderJoinLogo() {
    document.getElementById('main_header').innerHTML += joinLogoTemplate();
}

// changes checkbox accepted
function acceptCheckbox() {
    let privacyPolicyCheckbox = document.getElementById('pp_checkbox_id');
    privacyPolicyCheckbox.innerHTML = acceptCheckboxTemplate();
    privacyPolicyCheckbox.classList.remove('red_border');
}

// changes checkbox refuse
function refuseCheckbox() {
    let privacyPolicyCheckbox = document.getElementById('pp_checkbox_id');
    privacyPolicyCheckbox.innerHTML = refuseCheckboxTemplate();
}

// toggles password visibility
function togglePasswordVisibility() {
    let passwordInput = document.getElementById('password');
    let toggleButton = document.getElementById('toggle_password_visibility_button');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.innerHTML = showPasswordTemplate();
    } else {
        passwordInput.type = 'password';
        toggleButton.innerHTML = hidePasswordTemplate();
    }
}

// toggles password visibility for repeat password input / sign up page
function toggleRepeatPasswordVisibility() {
    let repeatInput = document.getElementById('password_repeat');
    let toggleButton = document.getElementById('toggle_password_repeat_button');
    if (repeatInput.type === 'password') {
        repeatInput.type = 'text';
        toggleButton.innerHTML = showPasswordRepeatTemplate();
    } else {
        repeatInput.type = 'password';
        toggleButton.innerHTML = hidePasswordRepeatTemplate();
    }
}

// toggles lock and eye icon (eye icon for visibility)
function addPasswordInputListener() {
    let passwordInput = document.getElementById('password');
    let toggleButton = document.getElementById('toggle_password_visibility_button');
    if (passwordInput && toggleButton) {
        passwordInput.addEventListener('input', function () {
            if (passwordInput.value.length > 0) {
                toggleButton.innerHTML = hidePasswordTemplate();
                passwordInput.type = 'password';
            } else {
                toggleButton.innerHTML = showPasswordLock();
            }
        });
    }
}

// toggles lock and eye icon (eye icon for visibility) on repeat password input / sign up page
function addRepeatPasswordListener() {
    let repeatInput = document.getElementById('password_repeat');
    let passwordRepeatButton = document.getElementById('toggle_password_repeat_button');
    if (repeatInput && passwordRepeatButton) {
        repeatInput.addEventListener('input', function () {
            if (repeatInput.value.length > 0) {
                document.getElementById('toggle_password_visibility_button').disabled = false;
                passwordRepeatButton.innerHTML = hidePasswordRepeatTemplate();
                repeatInput.type = 'password';
            } else {
                document.getElementById('toggle_password_visibility_button').disabled = true;
                passwordRepeatButton.innerHTML = showPasswordLock();
            }
        });
    }
}

function checkPrivacyPolicyCheckbox() {
    let privacyPolicyCheckbox = document.getElementById('pp_checkbox_label');
    if (privacyPolicyCheckbox.getAttribute('aria-checked') === 'true') {
        privacyPolicyCheckbox.classList.remove('red_border');
        openSignUpOverlay();
    } else {
        privacyPolicyCheckbox.classList.add('red_border');
    }
}

// open and close Sign Up Successfull Overlay
function openSignUpOverlay() {
    document.getElementById('signup-overlay-id').innerHTML = signUpSuccessfull();
    closeSignUpOverlay();
    
}

function closeSignUpOverlay() {
    setTimeout(() => {
        document.getElementById('signup-overlay-id').classList.add('d_none');
        renderLogIn();
    }, 1000);
}

// Login with user data
function openSummary() {
        window.location.href = './summary.html?showOverlay=true&loginType=user';
}

// Guest login without user data  
function openGuestSummary() {
    window.location.href = './summary.html?showOverlay=true&loginType=guest';
}

// Helper function to handle field validation
function handleFieldValidation(inputId, formId, requiredId, fieldName) {
    let input = document.getElementById(inputId);
    let form = document.getElementById(formId);
    let isEmpty = input.value.length < 1;
    
    if (isEmpty) {
        document.getElementById(requiredId).innerHTML = `<p id="${fieldName}_required_field" class="required-field-text">This field is required.</p>`;
        form.classList.add('required-outline');
    } else {
        document.getElementById(requiredId).innerHTML = '';
        form.classList.remove('required-outline');
    }
    return isEmpty;
}

// login input field requirements check
function checkLoginInputFields() {
    let isEmailEmpty = handleFieldValidation('email', 'input_email', 'required_email', 'email');
    let isPasswordEmpty = handleFieldValidation('password', 'password_input_id', 'required_password', 'password');
    
    if (!isEmailEmpty && !isPasswordEmpty) {
        openSummary();
    }
}

// signup input field requirements check
function checkSignUpInputFields() {
    let isUsernameEmpty = handleFieldValidation('username', 'username_input_id', 'required_username', 'username');
    let isEmailEmpty = handleFieldValidation('email', 'email_input_id', 'required_email', 'email');
    let isPasswordEmpty = handleFieldValidation('password', 'password_input_id', 'required_password', 'password');
    let isRepeatPasswordEmpty = handleFieldValidation('password_repeat', 'password_repeat_input_id', 'required_password_repeat', 'password_repeat');
    
    if (!isUsernameEmpty && !isEmailEmpty && !isPasswordEmpty && !isRepeatPasswordEmpty) {
        checkPrivacyPolicyCheckbox();
    }
}