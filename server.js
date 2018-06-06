// let http = require('http');
// let url = require('url');

// let fs = require('fs');
// const EventEmitter = require('events');

let webPort = 8080;

let socket = require('socket.io');
let express = require('express');

console.log('My server is running');

// socket.listen(`http://localhost:${webPort}`);
let app = express();
app.use(express.static('public'));

let server = app.listen(webPort);
let io = socket(server);

io.on('connnection', (socket) => {
  console.log("socket : ");
  console.log(socket);
});
