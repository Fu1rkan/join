function init(){
    renderLogIn();
    setTimeout(renderJoinLogo, 990);
}

function renderLogIn() {
    document.body.innerHTML = '';
    document.body.innerHTML += logInTemplate();
}

function renderSignUp() {
    document.body.innerHTML = '';
    document.body.innerHTML += signUpTemplate();
    renderJoinLogo();
}

function renderJoinLogo() {
    document.getElementById('main_header').innerHTML += joinLogoTemplate();
}