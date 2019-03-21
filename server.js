const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./data/router.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.all('/', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://suspicious-lamarr-981f87.netlify.com/");
    next()
})

server.get('/', (req, res) => {
    res.send(`
        <h2>Lambda Hubs API</h>
        <p>Welcome to the Lambda Hubs API</p>
    `);
});



server.use('/api', router);

module.exports = server;


