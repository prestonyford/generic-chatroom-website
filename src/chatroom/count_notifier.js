export class CountNotifier {
    count_socket;

    constructor() {
        this.count_socket = this.configureUserCountWebSocket();
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
            window.dispatchEvent(new CustomEvent('count_message_received', {
                detail: {
                    message
                }
            }))
        };
        return socket;
    }
}