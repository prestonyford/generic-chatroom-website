const db = new Database()
db.addEventListener("new_message", (e) => {
    const {author, content} = e.detail;
    create_message_element(create_other_message(author, content));
})

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

function create_other_message(author, content) {
    const new_message = document.createElement("div");
    new_message.classList.add("message");
    new_message.classList.add("message-other");

    const author_span = document.createElement("span");
    author_span.classList.add("message-author");
    author_span.innerText = author;
    new_message.appendChild(author_span)
    
    const content_span = document.createElement("span");
    content_span.innerText = content;
    new_message.appendChild(content_span)
    
    return new_message;
}

function create_self_message(text) {
    const new_message = document.createElement("div");
    new_message.classList.add("message");
    new_message.classList.add("message-self");
    new_message.innerText = text;
    return new_message;
}

function create_message_element(message) {
    document.getElementById("messages-container").appendChild(message);
}

function send_message() {
    const text_box = document.getElementById("message-text-box");
    if (text_box.value === "") return;
    const text_to_send = text_box.value;

    db.push_message(text_to_send);

    create_message_element(create_self_message(text_to_send));

    text_box.value = "";
    text_box.focus();
}