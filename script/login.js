let logoAnimated = false;

/**
 * Initializes the login page with logo animation control
 * Sets up logo animation timing and enter key functionality
 */
function logInInit() {
    setupEnterKeyLogin(); // Nur Login Enter-Key bei Init
    addPasswordInputListener();
}

/**
 * Renders the login page template with password visibility controls
 * Clears main content and displays login form with logo if animated
 */
function renderLogIn() {
    document.getElementById('main').innerHTML = '';
    document.getElementById('main').innerHTML += logInTemplate();
    addPasswordInputListener();
    setupEnterKeyLogin(); // Login Enter-Key hinzufügen
}

/**
 * Renders the sign-up page template with password visibility controls
 * Displays registration form with logo and password input listeners
 */
function renderSignUp() {
    document.getElementById('main').innerHTML = '';
    document.getElementById('main').innerHTML += signUpTemplate();
    addPasswordInputListener();
    addRepeatPasswordListener();
    setupEnterKeySignUp(); // SignUp Enter-Key hinzufügen
}


/**
 * Toggles password visibility between hidden and visible states
 * Changes input type and updates the visibility toggle button icon
 */
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

/**
 * Toggles password visibility for the repeat password input on sign-up page
 * Changes input type and updates the visibility toggle button icon
 */
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

/**
 * Adds input event listener to password field for dynamic icon switching
 * Toggles between lock icon (empty field) and eye icon (with content)
 */
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

/**
 * Adds input event listener to repeat password field for dynamic icon switching
 * Toggles between lock icon (empty field) and eye icon (with content) on sign-up page
 */
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

/**
 * Validates login input fields and initiates user authentication
 * Checks email and password fields, calls getUsers if validation passes
 */
function checkLoginInputFields() {
    let isEmailEmpty = handleFieldValidation('email', 'input_email', 'required_email', 'email');
    let isPasswordEmpty = handleFieldValidation('password', 'password_input_id', 'required_password', 'password');
    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('password');

    if (!isEmailEmpty && !isPasswordEmpty) {
        getUsers(emailInput.value, passwordInput.value);
    }
}

/**
 * Validates sign-up input fields and initiates user registration
 * Checks username, email, password, and repeat password fields with validations
 * @returns {boolean} True if all fields are valid and user registration initiated
 */
function checkSignUpInputFields() {
    let isUsernameEmpty = handleFieldValidation('username', 'username_input_id', 'required_username', 'username');
    let isEmailEmpty = handleFieldValidation('email', 'email_input_id', 'required_email', 'email');
    let isPasswordEmpty = handleFieldValidation('password', 'password_input_id', 'required_password', 'password');
    let isRepeatPasswordEmpty = handleFieldValidation('password_repeat', 'password_repeat_input_id', 'required_password_repeat', 'password_repeat');
    checkPrivacyPolicyCheckbox()
    if (!isUsernameEmpty && !isEmailEmpty && !isPasswordEmpty && !isRepeatPasswordEmpty) {
        return processSignUpValidation();
    }
    return false;
}

/**
 * Processes advanced sign-up validation after basic field validation
 * Validates email format, password match, privacy policy and initiates registration
 * @returns {boolean} True if all validations pass and registration is initiated
 */
function processSignUpValidation() {
    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('password');
    let passwordRepeatInput = document.getElementById('password_repeat');
    if (validateEmailAndPassword(emailInput.value, passwordInput.value)) {
        if (validatePasswordMatch(passwordInput.value, passwordRepeatInput.value)) {
            if (checkPrivacyPolicyCheckbox()) {
                openSignUpOverlay();
                return true;
            }
        }
    }
    return false;
}

/**
 * Helper function to handle individual field validation with visual feedback
 * @param {string} inputId - ID of the input field to validate
 * @param {string} formId - ID of the form container for styling
 * @param {string} requiredId - ID of the element to display error messages
 * @param {string} fieldName - Name of the field for error message generation
 * @returns {boolean} True if field is empty, false if field has content
 */
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

/**
 * Validates email format and password length requirements
 * @param {string} email - Email address to validate
 * @param {string} password - Password to validate (minimum 6 characters)
 * @returns {boolean} True if both email and password are valid
 */
function validateEmailAndPassword(email, password) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isEmailValid = emailRegex.test(email);
    let isPasswordValid = password.length >= 6;
    if (!isEmailValid) {
        requireEmail();
    } else {
        removeRequiredEmail();
    }
    if (!isPasswordValid) {
        requirePassword();
    } else {
        removeRequiredPassword();
    }
    return isEmailValid && isPasswordValid;
}

/** * Displays required field message and styles for email input
 */
function requireEmail() {
    document.getElementById('required_email').innerHTML = `<p id="email_invalid_field" class="required-field-text">Please enter a valid email address.</p>`;
    document.getElementById('email_input_id').classList.add('required-outline');
}

/** * Displays required field message and styles for password input
 */
function requirePassword() {
    document.getElementById('required_password').innerHTML = `<p id="password_invalid_field" class="required-field-text">Password must be at least 6 characters long.</p>`;
    document.getElementById('password_input_id').classList.add('required-outline');
}

/** * Removes required field message and styles for email input
 */
function removeRequiredEmail() {
    document.getElementById('required_email').innerHTML = '';
    document.getElementById('email_input_id').classList.remove('required-outline');
}

/** * Removes required field message and styles for password input
 */
function removeRequiredPassword() {
    document.getElementById('required_password').innerHTML = '';
    document.getElementById('password_input_id').classList.remove('required-outline');
}

/**
 * Validates that password and password repeat fields match
 * @param {string} password - Original password input
 * @param {string} passwordRepeat - Password confirmation input
 * @returns {boolean} True if passwords match, false otherwise
 */
function validatePasswordMatch(password, passwordRepeat) {
    let passwordsMatch = password === passwordRepeat;

    if (!passwordsMatch) {
        document.getElementById('required_password_repeat').innerHTML = `<p id="password_match_field" class="required-field-text">Both passwords must be the same.</p>`;
        document.getElementById('password_repeat_input_id').classList.add('required-outline');
    } else {
        document.getElementById('required_password_repeat').innerHTML = '';
        document.getElementById('password_repeat_input_id').classList.remove('required-outline');
    }
    return passwordsMatch;
}

/**
 * Checks if privacy policy checkbox is checked and provides visual feedback
 * @returns {boolean} True if checkbox is checked, false otherwise
 */
function checkPrivacyPolicyCheckbox() {
    let privacyPolicyCheckbox = document.getElementById('pp_checkbox_svg');
    let isChecked = privacyPolicyCheckbox.getAttribute('aria-checked') === 'true';

    if (isChecked) {
        privacyPolicyCheckbox.classList.remove('red_border');
    } else {
        privacyPolicyCheckbox.classList.add('red_border');
    }
    return isChecked;
}

/**
 * Changes checkbox to accepted state with visual confirmation
 * Updates checkbox template and removes error styling
 */
function acceptCheckbox() {
    let privacyPolicyCheckbox = document.getElementById('pp_checkbox_id');
    privacyPolicyCheckbox.innerHTML = acceptCheckboxTemplate();
    privacyPolicyCheckbox.classList.remove('red_border');
}

/**
 * Changes checkbox to refused/unchecked state
 * Updates checkbox template to show unchecked appearance
 */
function refuseCheckbox() {
    let privacyPolicyCheckbox = document.getElementById('pp_checkbox_id');
    privacyPolicyCheckbox.innerHTML = refuseCheckboxTemplate();
}

/**
 * Opens the sign-up success overlay and initiates auto-close sequence
 * Displays success message and triggers overlay closure after user registration
 */
function openSignUpOverlay() {
    document.getElementById('signup-overlay-id').innerHTML = signUpSuccessfull();
    closeSignUpOverlay();
}

/**
 * Redirects to summary page with user login parameters
 * Opens summary page with overlay enabled and user login type
 */
function openSummary() {
    window.location.href = './summary.html?showOverlay=true&loginType=user';
}

/**
 * Redirects to summary page with guest login parameters
 * Opens summary page with overlay enabled and guest login type
 */
function openGuestSummary() {
    initializeGuestSession(); // Guest initialization
    window.location.href = './summary.html?showOverlay=true&loginType=guest';
}

/**
 * Closes sign-up overlay after user registration and redirects to login
 * Adds new user to database, hides overlay after delay, and shows login page
 */
function closeSignUpOverlay() {
    let usernameInput = document.getElementById('username');
    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('password');

    addNewUser(usernameInput.value, emailInput.value, passwordInput.value);

    setTimeout(() => {
        document.getElementById('signup-overlay-id').classList.add('d_none');
        renderLogIn();
    }, 1000);
}

/**
 * Sets up Enter key functionality for login form submission
 * Adds event listener to trigger login validation when Enter is pressed on login page
 */
function setupEnterKeyLogin() {
    document.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            let emailInput = document.getElementById('email');
            let passwordInput = document.getElementById('password');
            
            if (emailInput && passwordInput && !document.getElementById('username')) {
                event.preventDefault();
                checkLoginInputFields();
            }
        }
    });
}

/**
 * Sets up Enter key functionality for sign-up form submission
 * Adds event listener to trigger sign-up validation when Enter is pressed on sign-up page
 */
function setupEnterKeySignUp() {
    document.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            let usernameInput = document.getElementById('username');
            let emailInput = document.getElementById('email');
            let passwordInput = document.getElementById('password');
            let passwordRepeatInput = document.getElementById('password_repeat');
            
            if (usernameInput && emailInput && passwordInput && passwordRepeatInput) {
                event.preventDefault();
                checkSignUpInputFields();
            }
        }});
}