const express = require('express');

const app = express();
const server = require('http').createServer(app);

const WebSocket = require('ws');
const wss = new WebSocket.Server({ server: server });

const connectdb = require('./db');
connectdb();

var cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

app.use('/rider', require('./routes/riderRoutes'));
app.use('/driver', require('./routes/driverRoutes'));

server.listen(5000, () => console.log('server running at 5000'));

wss.on('connection', (ws, req) => {
  ws.id = req.headers['email'];
});

const clients = wss.clients;

module.exports = clients;
