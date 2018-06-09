// let http = require('http');
// let url = require('url');

// let fs = require('fs');
// const EventEmitter = require('events');

let allClients = [];

let webPort = 3000;
let express = require('express');

let app = express();


// app.set('view engine', 'ejs');

// app.get('/', function(req, res) {
//   res.render('index', {
//     posts: data.posts
//   });
// });


// socket.listen(`http://localhost:${webPort}`);
app.use(express.static('public'));

let server = app.listen(process.env.PORT || webport);

console.log('My server is running');

let socket = require('socket.io');

let io = socket(server);

io.on('connection', (socket) => {
  console.log("--- // Nouvelle connection");
  console.log("Connection ID : " + socket.id);

  allClients.push(socket);
  // console.log("New connected users list : ");
  // console.log(allClients);

  socket.on('mouse', function mouseData(data) {
    //socket.emit('mouse', data);
     socket.broadcast.emit('mouse', data);
  });

  socket.on('refresh', function refresh(data) {
    //socket.emit('mouse', data);
     socket.broadcast.emit('refresh');
  });

  socket.on('disconnect', function () {
    console.log(socket.id + ' // Got disconnect!');
    var i = allClients.indexOf(socket);

    allClients.splice(i, 1);
    // console.log("New connected users list : ");
    // console.log(allClients);
  });

});

function refresh_userlist () {
  
}
