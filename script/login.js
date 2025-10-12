let logoAnimated = false;

function init(){
    renderLogIn();
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

// changes checkbox from empty to checked
function changeCheckbox() {
    let privacyPolicyCheckbox = document.getElementById('pp_checkbox_id');
    privacyPolicyCheckbox.innerHTML = checkboxTemplate();
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

// open and close Sign Up Successfull Overlay
function openSignUpOverlay() {
    document.getElementById('signup-overlay-id').innerHTML = signUpSuccessfull();
    closeSignUpOverlay();
}

function closeSignUpOverlay() {
    setTimeout(() => {
        document.getElementById('signup-overlay-id').classList.add('d_none');
    }, 2000);
}