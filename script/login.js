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
}

function renderSignUp() {
    document.getElementById('main').innerHTML = '';
    document.getElementById('main').innerHTML += signUpTemplate();
    renderJoinLogo();
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