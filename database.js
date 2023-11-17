const { MongoClient } = require('mongodb');
const config = require('./dbConfig.js');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const room_A_collection = db.collection('room_A');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
})().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
});

async function addMessage(room, message) {
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
    addMessage,
    getMessageHistory
};