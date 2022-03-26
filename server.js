const express = require('express');

const app = express();
const server = require('http').createServer(app);

module.exports = server;

const connectdb = require('./db');
connectdb();

var cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

app.use('/rider', require('./routes/riderRoutes'));
app.use('/driver', require('./routes/driverRoutes'));
app.use('/user', require('./routes/userRoutes'));

server.listen(5000, () => console.log('server running at 5000'));
