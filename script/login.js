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

function renderLogIn() {
    document.getElementById('main').innerHTML = '';
    document.getElementById('main').innerHTML += logInTemplate();
    if (logoAnimated) {
        renderJoinLogo();
    }
    addPasswordInputListener();
}

function renderSignUp() {
    document.getElementById('main').innerHTML = '';
    document.getElementById('main').innerHTML += signUpTemplate();
    renderJoinLogo();
    addPasswordInputListener();
    addRepeatPasswordListener();
}

// renders main Join Logo top left corner
function renderJoinLogo() {
    document.getElementById('main_header').innerHTML += joinLogoTemplate();
}

// changes checkbox from empty to checked
function changeCheckbox() {
    let privacyPolicyCheckbox = document.getElementById('pp_checkbox_id');
    privacyPolicyCheckbox.outerHTML = checkboxTemplate();
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
        toggleButton.innerHTML = showPasswordTemplate();
    } else {
        repeatInput.type = 'password';
        toggleButton.innerHTML = hidePasswordTemplate();
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
                passwordRepeatButton.innerHTML = hidePasswordTemplate();
                repeatInput.type = 'password';
            } else {
                passwordRepeatButton.innerHTML = showPasswordLock();
            }
        });
    }
}

