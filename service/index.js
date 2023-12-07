const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const config = require('./apiConfig.js')
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');

const authCookieName = 'token';

// API
let api_keys = {};
api_keys['tenor'] = config.TENOR_API_KEY;

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.username)) {
        res.status(409).send({ msg: 'Existing user' });
    }
    else {
        console.log(`Creating user: ${req.body.username}`);
        const user = await DB.createUser(req.body.username, req.body.password);
        setAuthCookie(res, user.token);
        res.send({
            id: user._id,
        });
    }
});

apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            setAuthCookie(res, user.token);
            res.send({ id: user._id });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
});

const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
    authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if (user) {
        next();
    }
    else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
});

// Check Login
secureApiRouter.get('/check-login-cookie', (req, res) => {
    if (req.cookies[authCookieName]) {
        res.status(200).send();
    }
    else {
        res.status(404).send();
    }
  });

// Get history
secureApiRouter.get('/history', async (req, res) => {
    const { room } = req.query;
    res.send(await getMessageHistory(room));
});

// Push message
secureApiRouter.post('/history', (req, res) => {
    DB.addMessage(req.body.room, req.body.message)

    res.status(200).send(req.body.message)
});

// Get tenor search term
secureApiRouter.get('/gif', async (req, res) => {
    const { search_term } = req.query;
    results = await searchTenor(search_term)
    res.send(results);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
  
peerProxy(httpService);

async function getMessageHistory(room) {
    const history = await DB.getMessageHistory(room, 20);
    return { history: history };
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

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}