const express = require('express');
const cors = require('cors');

const server = express();
server.use(express.json()); 

server.get('/', (req, res) => {
    res.status(200).json({message: 'api is up'});
})

module.exports = server;