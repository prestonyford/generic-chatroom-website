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
}