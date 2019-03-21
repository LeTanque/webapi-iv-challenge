const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./data/router.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.all('/', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Origin", CLIENT_ORIGIN);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    res.header("Access-Control-Allow-Credentials", true); 
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }
    next();
})

server.get('/', (req, res) => {
    res.send(`
        <h2>Lambda Hubs API</h>
        <p>Welcome to the Lambda Hubs API</p>
    `);
});



server.use('/api', router);

module.exports = server;


