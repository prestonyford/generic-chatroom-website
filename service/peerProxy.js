const DB = require('./database.js');
const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function peerProxy(httpServer) {

    // Create websocket objects
    const chat_wss = new WebSocketServer({ noServer: true });
    const user_count_wss = new WebSocketServer({ noServer: true });

    // Handle the protocol upgrade from HTTP to WebSocket; The WebSocket server chosen is based on the path in the URL
    httpServer.on('upgrade', (request, socket, head) => {
        const url = new URL(request.url, `http://${request.headers.host}`); // protocol doesn't matter, i'm just using this to parse the parameters
        const path = url.pathname;
        
        if (path === '/chat') {
            chat_wss.handleUpgrade(request, socket, head, function done(ws) {
                chat_wss.emit('connection', ws, request);
            });
        }
        else if (path === '/count') {
            user_count_wss.handleUpgrade(request, socket, head, function done(ws) {
                user_count_wss.emit('connection', ws, request);
            });
        }
    });

    /* CHATROOM SERVER */

    // Keep track of all the chat connections so we can forward messages
    let room_connections = {
        A: [],
        B: [],
        C: [],
        D: []
    };
    let room_selection_connections = []

    function send_room_connections_count() {
        for (const c of room_selection_connections) {
            c.ws.send(Buffer.from(JSON.stringify({
                room_A_count: room_connections['A'].length,
                room_B_count: room_connections['B'].length,
                room_C_count: room_connections['C'].length,
                room_D_count: room_connections['D'].length
            })));
        }
    }

    chat_wss.on('connection', (ws, req) => {
        const url = new URL(req.url, `http://${req.headers.host}`); // protocol doesn't matter, i'm just using this to parse the parameters
        const room = url.searchParams.get('room');
        const user = url.searchParams.get('user');
        const connection = { id: uuid.v4(), alive: true, ws: ws, room: room, user: user };
        room_connections[room].push(connection);
        console.log(`${user} joined room ${room}`);

        send_room_connections_count();
        
        // Forward messages to everyone except the sender
        ws.on('message', function message(data) {
            // Add this to database
            DB.addMessage(connection.room, JSON.parse(data.toString('utf-8')));
            room_connections[room].forEach((c) => {
                if (c.id !== connection.id) {
                    c.ws.send(data);
                }
            });
        });

        // Remove the closed connection so we don't try to forward anymore
        ws.on('close', () => {
            room_connections[room].findIndex((o, i) => {
                if (o.id === connection.id) {
                    room_connections[room].splice(i, 1);
                    return true;
                }
            });
            
            const message = {
                type: 'system',
                author: connection.user,
                content: `${connection.user} has left the room`
            };
            console.log(`${connection.user} left room ${connection.room}`);

            // Add this to database
            DB.addMessage(connection.room, message);

            // Tell everyone that they left
            room_connections[room].forEach((c) => {
                // Needs to be sent as raw binary data
                c.ws.send(Buffer.from(JSON.stringify(message)));
            });

            send_room_connections_count();
        });

        // Respond to pong messages by marking the connection alive
        ws.on('pong', () => {
            connection.alive = true;
        });
    });

    // Keep active chat connections alive
    setInterval(() => {
        for (const [_room, connections] of Object.entries(room_connections)) {
            connections.forEach((c) => {
                // Kill any connection that didn't respond to the ping last time
                if (!c.alive) {
                    c.ws.terminate();
                } else {
                    c.alive = false;
                    c.ws.ping();
                }
            });
        }
    }, 10000);


    /* USER COUNT SERVER */

    user_count_wss.on("connection", (ws, req) => {
        const url = new URL(req.url, `http://${req.headers.host}`); // protocol doesn't matter, i'm just using this to parse the parameters
        const connection = { id: uuid.v4(), alive: true, ws: ws };
        room_selection_connections.push(connection);
        send_room_connections_count();

        ws.on('close', () => {
            room_selection_connections.findIndex((o, i) => {
                if (o.id === connection.id) {
                    room_selection_connections.splice(i, 1);
                    return true;
                }
            });
        });

        // Respond to pong messages by marking the connection alive
        ws.on('pong', () => {
            connection.alive = true;
        });
    })

    // Keep active user_count connections alive
    setInterval(() => {
        room_selection_connections.forEach((c) => {
            // Kill any connection that didn't respond to the ping last time
            if (!c.alive) {
                c.ws.terminate();
            } else {
                c.alive = false;
                c.ws.ping();
            }
        });
    }, 10000);
}

module.exports = { peerProxy };
