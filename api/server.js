const express = require('express');
const cors = require('cors');
const helmet =require("helmet");
const errorHandler = require("./errorHandler.js");

const usersRouter = require("../users/users-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json()); 

server.use("/api/users", usersRouter);

server.get('/', (req, res) => {
    res.status(200).json({message: 'api is up'});
});

server.use(errorHandler);

module.exports = server;