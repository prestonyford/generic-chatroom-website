async function loadHistory() {
    try {
        const response = await fetch('/api/history?room=A');
        data = await response.json();
        for (const message of data.history) {
            if (message.type === "system") { // System message
                create_message_element(create_system_message(message.content));
            }
            else{ // Other message
                create_message_element(create_other_message(message.author, message.content));
            }
        }
    }
    catch(error) {
        console.error(error);
    }
}

window.onload = async () => {
    await loadHistory()

    // Subscribe to events
    const send_btn = document.getElementById("send-message-button");
    send_btn.addEventListener("click", () => {
        read_message_and_send();
    });

    const message_text_box = document.getElementById("message-text-box");
    message_text_box.addEventListener("keydown", (e) => {
        if (e.key === 'Enter'){
            read_message_and_send();
        }
    })

    const search_btn = document.getElementById("gif-search-button");
    search_btn.addEventListener("click", () => {
        read_term_and_search();
    })

    const search_text_box = document.getElementById("gif-search-text-box");
    search_text_box.addEventListener("keydown", (e) => {
        if (e.key === 'Enter'){
            read_term_and_search();
        }
    })

    // Send join message
    send_message("system", "", `${localStorage.getItem("username")} joined the room`);
}

function create_system_message(content) {
    const new_message = document.createElement("div");
    new_message.classList.add("message-system");

    const content_span = document.createElement("span");
    content_span.innerText = content;
    new_message.appendChild(content_span)

    return new_message;
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

function create_self_message(content) {
    const new_message = document.createElement("div");
    new_message.classList.add("message");
    new_message.classList.add("message-self");
    new_message.innerText = content;
    return new_message;
}

function create_message_element(message) {
    const container = document.getElementById("messages-container");
    const move = container.scrollTop === container.scrollHeight;
    container.appendChild(message);
}

function read_textbox(){
    
}

function read_message_and_send() {
    const text_box = document.getElementById("message-text-box");
    const content = text_box.value;
    if (content === "") return;
    send_message("message", `${localStorage.getItem("username")}`, content)
    text_box.value = "";
}

async function send_message(type, author, content) {
    try {
        const response = await fetch('/api/history', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                room: 'A',
                message: {
                    type: type,
                    author: author,
                    content: content
                }
            }),
        });
  
        const message = await response.json();

        if (message.type === "system"){
            create_message_element(create_system_message(message.content));
        }
        else {
            create_message_element(create_self_message(message.content));
        }
    } 
    catch(error) {
        console.error(error);
    }
}

// GIF

function read_term_and_search() {
    const text_box = document.getElementById("gif-search-text-box");
    const content = text_box.value;
    if (content === "") return;
    search_gif(content);
    text_box.value = "";
}

async function search_gif(search_term) {
    try {
        const response = await fetch(`/api/gif?search_term=${search_term}`);
        const results = await response.json();
        display_search_results(results.results)
    }
    catch(error) {
        console.error(error);
    }
}

function display_search_results(results) {
    console.log(results);
}