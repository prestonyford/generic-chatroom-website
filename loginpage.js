window.onload = function() {
    const username_input = document.getElementById("username-input");
    const password_input = document.getElementById("password-input");
    const submit_btn = document.getElementById("submit-btn")

    const enter_key_pressed = (e) => {
        if (e.key === 'Enter'){
            attempt_login()
        }
    }

    username_input.addEventListener("keydown", enter_key_pressed);
    password_input.addEventListener("keydown", enter_key_pressed);
    submit_btn.addEventListener("click", attempt_login);
}

function attempt_login() {
    const username = document.getElementById("username-input").value;
    const password = document.getElementById("password-input").value;

    console.log("here in attempt_login!")
    if (username === "") {
        alert("Please enter valid login credentials (just put a non-empty username)")
        return;
    }

    localStorage.setItem("username", username)

    window.location.href = "rooms.html";
}