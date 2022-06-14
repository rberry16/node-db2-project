const express = require("express")

const server = express()

const router  = require('./cars/cars-router');

server.use(express.json());

server.use('/api/cars', router);

// DO YOUR MAGIC

module.exports = server
