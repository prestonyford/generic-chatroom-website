window.onload = function() {
    const username = localStorage.getItem("username");
    if (username === null) {
        window.location.href = "index.html";
        return
    }
    const username_span = document.getElementById("username")
    username_span.innerText = username;

    const room_selection = document.getElementById("room-selection-window");
    room_selection.style.display = 'flex';

    configureUserCountWebSocket();
}

function configureUserCountWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const socket = new WebSocket(`${protocol}://${window.location.host}/count`);

    socket.onmessage = async (event) => {
        const message = JSON.parse(await event.data.text());
        document.getElementById('active-users-room-a').innerText = message.room_A_count;
        document.getElementById('active-users-room-c').innerText = message.room_B_count;
        document.getElementById('active-users-room-c').innerText = message.room_C_count;
        document.getElementById('active-users-room-d').innerText = message.room_D_count;
    };

    return socket;
}