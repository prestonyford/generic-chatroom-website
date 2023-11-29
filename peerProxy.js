const DB = require('./database.js');
const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function peerProxy(httpServer) {
    // Create a websocket object
    const wss = new WebSocketServer({ noServer: true });

    // Handle the protocol upgrade from HTTP to WebSocket
    httpServer.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    });

    // Keep track of all the connections so we can forward messages
    let connections = [];

    wss.on('connection', (ws, req) => {
        const url = new URL(req.url, `http://${req.headers.host}`); // protocol doesn't matter, i'm just using this to parse the parameters
        const room = url.searchParams.get('room');
        const user = url.searchParams.get('user');
        const connection = { id: uuid.v4(), alive: true, ws: ws, room: room, user: user };
        connections.push(connection);
        console.log(`${user} joined room ${room}`);
        
        // Forward messages to everyone except the sender
        ws.on('message', function message(data) {
            // Add this to database
            DB.addMessage(connection.room, JSON.parse(data.toString('utf-8')));
            connections.forEach((c) => {
                if (c.id !== connection.id) {
                    c.ws.send(data);
                }
            });
        });

        // Remove the closed connection so we don't try to forward anymore
        ws.on('close', () => {
            connections.findIndex((o, i) => {
                if (o.id === connection.id) {
                    connections.splice(i, 1);
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
            connections.forEach((c) => {
                if (c.room === connection.room) {
                    // Needs to be sent as raw binary data
                    c.ws.send(Buffer.from(JSON.stringify(message)), 'utf-8');
                }
            });
        });

        // Respond to pong messages by marking the connection alive
        ws.on('pong', () => {
            connection.alive = true;
        });
    });

    // Keep active connections alive
    setInterval(() => {
        connections.forEach((c) => {
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
