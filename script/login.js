function init(){
    setTimeout(renderJoinLogo, 990);
}

function renderSignUp() {
    document.body.innerHTML = '';
    document.body.innerHTML += signUpTemplate();
    renderJoinLogo();
}

function renderJoinLogo() {
    document.getElementById('main_header').innerHTML += joinLogoTemplate();
}