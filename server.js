// let http = require('http');
// let url = require('url');

// let fs = require('fs');
// const EventEmitter = require('events');

let webPort = 8080;


let express = require('express');
let app = express();

console.log('My server is running');

let socket = require('socket.io');
// socket.listen(`http://localhost:${webPort}`);

let server = app.listen(webPort);
app.use(express.static('public'));

let io = socket(server);

io.on('connnection', (socket) => {
  console.log("socket : ");
  console.log(socket);
});
