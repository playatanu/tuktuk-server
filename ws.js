// Importing the required modules
const WebSocketServer = require('ws');

// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 8000 });

wss.on('connection', (ws, req) => {
  console.log('new user add');
  ws.id = req.headers['email'];
});

const clients = wss.clients;

module.exports = clients;
