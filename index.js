const express = require('express');
const app = express();
const config = require('./apiConfig.js')
const DB = require('./database.js');

// API
let api_keys = {};
api_keys['tenor'] = config.TENOR_API_KEY;

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
apiRouter.get('/history', async (req, res) => {
    const { room } = req.query;
    res.send(await getMessageHistory(room));
});

// Push message
apiRouter.post('/history', (req, res) => {
    pushMessage(req.body.room, req.body.message)

    res.status(200).send(req.body.message)
});

// Get tenor search term
apiRouter.get('/gif', async (req, res) => {
    const { search_term } = req.query;
    results = await searchTenor(search_term)
    res.send(results);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

async function getMessageHistory(room) {
    const history = await DB.getMessageHistory(room, 20);
    return { history: history };
}

async function pushMessage(room, message) {
    // Date property is added server-side right here
    message.date = Date.now();
    await DB.addMessage(room, message);
}

async function searchTenor(search_term) {
    try {
        const response = await fetch(`https://tenor.googleapis.com/v2/search?q=${search_term}&key=${api_keys['tenor']}&limit=16`);
        const results = await response.json();
        return results;
    }
    catch {
        console.log("Error searching")
    }
}