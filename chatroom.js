function create_self_message(text) {
    const new_message = document.createElement("div");
    new_message.classList.add("message");
    new_message.classList.add("message-self");
    new_message.innerText = text;
    return new_message;
}

function send_message() {
    const text_box = document.getElementById("message-text-box");

    if (text_box.value === "") return;

    console.log("Sending message...");
    const text_to_send = text_box.value;
    const new_message = create_self_message(text_to_send);
    document.getElementById("messages-container").appendChild(new_message);

    text_box.value = ""
    text_box.focus()
}

window.onload = function() {
    // Subscribe to events
    const send_btn = document.getElementById("send-message-button");
    send_btn.addEventListener("click", send_message);

    const text_box = document.getElementById("message-text-box");
    text_box.addEventListener("keydown", (e) => {
        if (e.key === 'Enter'){
            send_message()
        }
    })
}