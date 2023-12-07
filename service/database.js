const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.js');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');

const userCollection = db.collection('user');
const room_A_collection = db.collection('room_A');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
})().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
});

function getUser(username) {
    return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function createUser(username, password) {
    // Hash the password before we insert it into the database
    const passwordHash = await bcrypt.hash(password, 10);
  
    const user = {
        username: username,
        password: passwordHash,
        token: uuid.v4(),
    };
    await userCollection.insertOne(user);
    return user;
}

async function addMessage(room, message) {
    message.date = Date.now();
    if (room === 'A') {
        const result = await room_A_collection.insertOne(message);
        return result;
    }
}

async function getMessageHistory(room, num_messages) {
    const query = { };
    const options = {
        limit: num_messages,
        sort: { date: -1 }
    };
    if (room === 'A') {
        const cursor = room_A_collection.find(query, options);
        const res = await cursor.toArray();
        return res;
    }
}

module.exports = {
    getUser,
    getUserByToken,
    createUser,
    addMessage,
    getMessageHistory
};