export class ChatroomNotifier {
    room;
    username;
    chat_socket;
    count_socket;
    chat_socket_listeners;
    count_socket_listeners;

    constructor(room, chat_socket_listeners, count_socket_listeners) {
        this.room = room;
        this.username = localStorage.getItem('username');
        this.chat_socket = this.configureChatWebSocket();
        this.count_socket = this.configureUserCountWebSocket();
        this.chat_socket_listeners = chat_socket_listeners;
        this.count_socket_listeners = count_socket_listeners;
    }

    configureChatWebSocket() {
		const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
		const socket = new WebSocket(`${protocol}://${window.location.host}/chat?room=${this.room}&user=${this.username}`);
		socket.onopen = (event) => {
            console.log("opened chat socket");
            localStorage.setItem('chat_socket_open', JSON.stringify(true));
			this.sendChatMessage({
				type: 'system',
				author: this.username,
				content: `${this.username} has joined the room`
			});
		};
		socket.onclose = (event) => {
            localStorage.setItem('chat_socket_open', JSON.stringify(false));
			setTimeout(() => {
                // Only alert if the user is still inside of the chatroom after the timeout
                if (!JSON.parse(localStorage.getItem('chat_socket_open')) && window.location.pathname === '/chatroom'){
                    alert("You have disconnected");
                }
            }, 5000);
		};
		socket.onmessage = async (event) => {
			const message = JSON.parse(await event.data.text());
            for (const listener of this.chat_socket_listeners) {
                listener(message);
            }
		};
		return socket;
	}

    sendChatMessage(message) {
        this.chat_socket.send(JSON.stringify(message));
    }

    configureUserCountWebSocket() {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        const socket = new WebSocket(`${protocol}://${window.location.host}/count`);

        socket.onopen = (event) => {
            console.log("opened count socket");
		};

        socket.onmessage = async (event) => {
            const message = JSON.parse(await event.data.text());
            // document.getElementById('current-user-count').innerText = message.room_A_count;
            for (const listener of this.count_socket_listeners) {
                listener(message);
            }
        };
        return socket;
    }
}