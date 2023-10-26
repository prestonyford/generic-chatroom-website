function create_other_message(author, text) {
    const new_message = document.createElement("div");
    new_message.classList.add("message");
    new_message.classList.add("message-other");

    const author_span = document.createElement("span");
    author_span.classList.add("message-author");
    author_span.innerText = author;
    new_message.appendChild(author_span)
    
    const content_span = document.createElement("span");
    content_span.innerText = text;
    new_message.appendChild(content_span)
    
    return new_message;
}

function receive_message(message) {
    document.getElementById("messages-container").appendChild(message);
}

// Placeholder function
async function respond() {
    min_respond_time = 300;
    max_respond_time = 1400;
    setTimeout(() => {
        const new_message = create_other_message("Ki-Adi-Mundi", "What about the droid attack on the Wookiees?");
        receive_message(new_message);
    }, Math.random() * (max_respond_time - min_respond_time) + min_respond_time)
}

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

    text_box.value = "";
    text_box.focus();

    respond();
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