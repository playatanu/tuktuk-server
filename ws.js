// Importing the required modules
const WebSocketServer = require('ws');
const server = require('./server');
// Creating a new websocket server
const wss = new WebSocketServer.Server({ server: server });

wss.on('connection', (ws, req) => {
  ws.on('message', (mes) => {
    const message = JSON.parse(mes);
    ws.id = message.email;
    console.log(`${ws.id} join`);
  });
  ws.on('close', () => {
    console.log(`${ws.id} bey`);
  });
});

const clients = wss.clients;

module.exports = clients;
