window.onload = async function() {

    const response = await fetch('/api/check-login-cookie')
    const username = localStorage.getItem('username');
    if (username && response.ok) {
        document.getElementById("login-window").style.display = "none";
        document.getElementById("logout-window").style.display = 'flex';
        document.getElementById("username-logout-window").innerHTML = username;
    }
    else{
        document.getElementById("login-window").style.display = "flex";
        document.getElementById("logout-window").style.display = 'none';
    }

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
    const username_create_input = document.getElementById("username-create-field");
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

    // Logout
    document.getElementById("logout-button").addEventListener("click", () => {
        logout();
    })
}

async function attempt_login(username, password) {
    const response = await fetch('/api/auth/login', {
        method: 'post',
        body: JSON.stringify({ username: username, password: password }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    if (response.ok) {
        localStorage.setItem("username", username);
        window.location.href = "rooms.html";
    }
    else {
        alert("Incorrect login credentials");
    }
}

function logout() {
    localStorage.removeItem('username');
    fetch(`/api/auth/logout`, {
        method: 'delete',
    }).then(() => (window.location.href = 'index.html'));
}

async function create_account() {
    const username = document.getElementById("username-create-field").value;
    const password = document.getElementById("password-create-field").value;

    if (username === "" || password === "") {
        alert("Please enter a valid username and password")
        return;
    }

    // Call endpoint
    const response = await fetch('/api/auth/create', {
        method: 'post',
        body: JSON.stringify({ username: username, password: password }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    if (response.ok) {
        attempt_login(username, password);
    }
    else {
        alert("An account with this username already exists");
    }
}