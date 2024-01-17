'use strict';

const WebSocket = require('ws');
const http = require('node:http');
const fs = require('node:fs');

const PORT = 8000;

const server = http
  .createServer(async (req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html; charset=UTF-8' });
    const file = await fs.promises.readFile('./static/index.html');
    res.end(file);
  })
  .listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
  });

const ws = new WebSocket.Server({ server });

ws.on('connection', (connect, req) => {
  console.log('Connect!');
  connect.on('message', (data) => {
    for (const client of ws.clients) {
      // if (client !== WebSocket.OPEN) continue;
      client.send(data);
    }
  });
});
