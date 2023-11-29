const username = localStorage.getItem("username");

const LeaveRoomEvent = 'userLeft';
const JoinRoomEvent = 'userJoined';

const self = this; // I keep making this mistake

window.onload = async () => {
    const chatroom = new Chatroom('A');
    await chatroom.loadHistory();

    // Subscribe to events
    const send_btn = document.getElementById("send-message-button");
    send_btn.addEventListener("click", () => {
        chatroom.send_message({
            type: "message",
            author: username,
            content: chatroom.read_message_textbox()
        })
    });

    const message_text_box = document.getElementById("message-text-box");
    message_text_box.addEventListener("keydown", (e) => {
        if (e.key === 'Enter'){
            chatroom.send_message({
                type: "message",
                author: username,
                content: chatroom.read_message_textbox()
            })
        }
    })

    const search_btn = document.getElementById("gif-search-button");
    search_btn.addEventListener("click", () => {
        chatroom.search_gif(chatroom.read_gif_search_textbox());
    })

    const search_text_box = document.getElementById("gif-search-text-box");
    search_text_box.addEventListener("keydown", (e) => {
        if (e.key === 'Enter'){
            chatroom.search_gif(chatroom.read_gif_search_textbox());
        }
    })

    subscribe_left_window_resize()

    const messages_container = document.getElementById('messages-container');
    messages_container.scrollTop = 0.5
    
}

function subscribe_left_window_resize() {
    // const left_window = document.getElementById('chatroom-left-window');
    // const chatroom_bottom_window = document.getElementById('chatroom-bottom-window');
    // ro = new ResizeObserver((entries) => {
    //     for (const entry of entries) {
            
    //         const width = entry.contentRect.width;
    //         chatroom_bottom_window.style.gridTemplateColumns = `${width}px 1fr`;
    //         console.log(width);
    //     }
    // });
    // ro.observe(left_window);
}

class Chatroom {
    room;
    socket;

    constructor(room) {
        this.room = room;
        this.socket = this.configureWebSocket();
    }

    async loadHistory() {
        try {
            const response = await fetch(`/api/history?room=${this.room}`);
    
            if (!response.ok) {
                window.location.href = "index.html";
            }
    
            const data = await response.json();
    
            for (let i = data.history.length - 1; i >= 0; --i) {
                this.push_message(data.history[i]);
            }
        }
        catch(error) {
            console.error(error);
        }
    }

    create_system_message_element(content) {
        const new_message = document.createElement("div");
        new_message.classList.add("message-system");
    
        const content_span = document.createElement("span");
        content_span.innerText = content;
        new_message.appendChild(content_span)
    
        return new_message;
    }
    
    create_other_message_element(author, content) {
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
    
    create_self_message_element(content) {
        const new_message = document.createElement("div");
        new_message.classList.add("message");
        new_message.classList.add("message-self");
        new_message.innerText = content;
        return new_message;
    }
    
    create_image_message_element(author, image_url) {
        const new_message = document.createElement("div");
        new_message.classList.add("message");
        new_message.classList.add("message-image");
    
        if (author === username) {
            new_message.classList.add("message-self");
        }
        else {
            const author_span = document.createElement("span");
            author_span.classList.add("message-author");
            author_span.style.marginBottom = '4px';
            author_span.innerText = author;
            new_message.appendChild(author_span);
            new_message.classList.add("message-other");
        }
        
        const image_element = document.createElement("img");
        image_element.src = image_url;
        new_message.appendChild(image_element);
    
        return new_message;
    }
    
    push_message(message) {
        const messages_container = document.getElementById('messages-container');
        // const move = container.scrollTop === container.scrollHeight;
        let scroll = false;
        if (messages_container.scrollTop >= -10) {
            scroll = true;
        }

        const { type: type, author: author, content: content } = message;

        if (type === "system"){
            messages_container.prepend(this.create_system_message_element(content));
        }
        else if (type === "image") {
            messages_container.prepend(this.create_image_message_element(author, content));
        }
        else {
            if (author === username) {
                messages_container.prepend(this.create_self_message_element(content));
            }
            else {
                messages_container.prepend(this.create_other_message_element(author, content));
            }
        }
    
        // Chrome bad
        if (scroll === true) {
            console.log("scrolling");
            messages_container.scrollTop = 0.5;  
        }
    }
    
    read_message_textbox() {
        const text_box = document.getElementById("message-text-box");
        const content = text_box.value;
        if (content === "") return;
        text_box.value = "";
        return content;
    }
    
    // GIF
    async search_gif(search_term) {
        try {
            const response = await fetch(`/api/gif?search_term=${search_term}`);
            const results = await response.json();
            this.display_search_results(results.results)
        }
        catch(error) {
            console.error(error);
        }
    }
    
    read_gif_search_textbox() {
        const text_box = document.getElementById("gif-search-text-box");
        const content = text_box.value;
        if (content === "") return;
        text_box.value = "";
        return content;
    }
    
    create_gif_element(gif_object) {
        const tiny_gif = gif_object.media_formats.tinygif; // Smaller image for previews
        const gif = gif_object.media_formats.gif; // Actual image for sending
        console.log(gif_object);
    
        const element = document.createElement("div");
        // element.classList.add("");
        const image_element = document.createElement("img")
        image_element.src = tiny_gif.url;
        element.appendChild(image_element);
    
        // Click event listener
        element.addEventListener("click", () => {
            this.send_message({
                type: "image",
                author: username,
                content: gif.url
            });
        });
        element.style.cursor = 'pointer';
    
        return element;
    }
    
    display_search_results(results) {
        // console.log(results);
        const results_window = document.getElementById('gif-search-results');
        results_window.innerHTML = "";
        for (const result of results) {
            results_window.appendChild(this.create_gif_element(result))
        }
    }
    
    async send_message(message) {
        try {
            this.broadcastEvent(message);
            this.push_message(message);
        } 
        catch(error) {
            console.error(error);
        }
    }

    configureWebSocket() {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        socket.onopen = (event) => {
            this.send_message({
                type: 'system',
                author: username,
                content: `${username} has joined the room`
            });
        };
        socket.onclose = (event) => {
            alert("You have disconnected");
        };
        socket.onmessage = async (event) => {
            const message = JSON.parse(await event.data.text());
            this.push_message(message);
        };

        return socket;
    }

    broadcastEvent(message) {
        const event = message;
        this.socket.send(JSON.stringify(event));
    }
}