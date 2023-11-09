const express = require('express');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Get history
apiRouter.get('/history', (req, res) => {
    const { room } = req.query;
    res.send(getMessageHistory(room));
});

// Push message
apiRouter.post('/history', (req, res) => {
    pushMessage(req.body.room, req.body.message)

    res.status(200).send(req.body.message)
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

let room_data = {
    roomA: {
        history: [
            {
                author: "Yoda",
                content: "Allow this appointment lightly, the Council does not."
            },
            {
                author: "Yoda",
                content: "Disturbing is this move by Chancellor Palpatine."
            },
            {
                author: "Mace Windu",
                content: "You are on this Council, but we do not grant you the rank of Master."
            },
            {
                author: "Anakin",
                content: "What?! How can you do this?"
            },
            {
                author: "Anakin",
                content: "This is outrageous, it's unfair"
            },
            {
                author: "Anakin",
                content: "How can you be on the Council and not be a Master?"
            },
            {
                author: "Mace Windu",
                content: "Take a seat, young Skywalker."
            },
            {
                author: "Anakin",
                content: "Forgive me, Master."
            },
            {
                author: "",
                content: "Ki-Adi-Mundi joined the room"
            },
            {
                author: "Ki-Adi-Mundi",
                content: "We have surveyed all systems in the Republic, and have found no sign of General Grievous."
            },
            {
                author: "Yoda",
                content: "Hiding in the Outer Rim, Grievous is. The outlying systems, you must sweep."
            },
            {
                author: "Obi-wan",
                content: "It may take some time... we do not have many ships to spare."
            },
            {
                author: "Macce Windu",
                content: "We cannot take ships from the front line."
            },
            {
                author: "Obi-wan",
                content: "And yet, it would be fatal for us to allow the droid armies to regroup."
            },
            {
                author: "Yoda",
                content: "Master Kenobi, our spies contact, you must, and then wait."
            },
            {
                author: "Ki-Adi-Mundi",
                content: "What about the droid attack on the Wookiees?"
            },
        ]
    },
    roomB: {
        history: [
            {
                author: "Author",
                content: "Welcome to Room B."
            },
        ]
    },
    roomC: {
        history: [
            {
                author: "Author",
                content: "Welcome to Room C."
            },
        ]
    },
    roomD: {
        history: [
            {
                author: "Author",
                content: "Welcome to Room D."
            },
        ]
    }
};

function getMessageHistory(room) {
    if (room === 'A'){
        return room_data.roomA;
    }
    else if (room === 'B'){
        return room_data.roomB;
    }
    else if (room === 'C'){
        return room_data.roomC;
    }
    else if (room === 'D'){
        return room_data.roomD;
    }
    else {

    }
}

function pushMessage(room, message) {
    if (room === 'A'){
        room_data.roomA.history.push(message);
    }
    else if (room === 'B'){
        room_data.roomB.history.push(message);
    }
    else if (room === 'C'){
        room_data.roomC.history.push(message);
    }
    else if (room === 'D'){
        room_data.roomD.history.push(message);
    }
    else {

    }
}