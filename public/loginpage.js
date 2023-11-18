window.onload = function() {

    // Login
    const username_login_input = document.getElementById("username-login-field");
    const password_login_input = document.getElementById("password-login-field");
    const submit_btn_login = document.getElementById("submit-btn-login");

    const enter_key_pressed_on_login = (e) => {
        if (e.key === 'Enter'){
            attempt_login(username_login_input.value, password_login_input.value);
        }
    }

    username_login_input.addEventListener("keydown", enter_key_pressed_on_login);
    password_login_input.addEventListener("keydown", enter_key_pressed_on_login);
    submit_btn_login.addEventListener("click", () => { attempt_login(username_login_input.value, password_login_input.value)});

    // Create
    const username_create_input = document.getElementById("username-logcreatein-field");
    const password_create_input = document.getElementById("password-create-field");
    const submit_btn_create = document.getElementById("submit-btn-create");

    const enter_key_pressed_on_create = (e) => {
        if (e.key === 'Enter'){
            create_account()
        }
    }

    username_create_input.addEventListener("keydown", enter_key_pressed_on_create);
    password_create_input.addEventListener("keydown", enter_key_pressed_on_create);
    submit_btn_create.addEventListener("click", create_account);
}

function attempt_login(username, password) {
    if (username === "") {
        alert("Please enter valid login credentials (just put a non-empty username)")
        return;
    }

    localStorage.setItem("username", username)

    window.location.href = "rooms.html";
}

function create_account() {
    const username = document.getElementById("username-create-field").value;
    const password = document.getElementById("password-create-field").value;

    if (username === "" || password === "") {
        alert("Please enter a valid username and password")
        return;
    }

    // Call endpoint

    // If success, call attempt_login()
}