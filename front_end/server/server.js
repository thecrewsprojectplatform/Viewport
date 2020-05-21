const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 5000;

// setting port value
app.set('port', port);

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

io.on('connect', (socket) => {
  // Say Hi to all connected clients
  io.emit('broadcast', '[Server]: Welcome stranger!');

  socket.on('chatMessage', (data) => {
    // console.log(`message received from user: ${msg.from}`);
    // console.log(`message received content: ${msg.content}`);
    io.emit('messageResponse', data);
  });

  // Say Bye to all connected clients
  socket.on('disconnect', function () {
    io.emit('broadcast', '[Server]: Bye, bye, stranger!');
  });
});

http.listen(port, () => {
  // console.log('listening on *:5000');
});


/* ONE POSSIBLE WAY WITH .TS
const app = express();
app.set("port", process.env.PORT || 5000);

let http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
let io = require("socket.io")(http);

app.get("/", (req: any, res: any) => {
  res.sendFile(path.resolve("./client/index.html"));
});

// whenever a user connects on port 5000 via
// a websocket, log that a user has connected
io.on("connection", function(socket: any) {
  console.log("a user connected");
  // whenever we receive a 'message' we log it out
  socket.on("message", function(message: any) {
    console.log(message);
    socket.emit("message", message);
  });
});

const server = http.listen(5000, function() {
  console.log("listening on *:5000");
});
*/

/* OLD WAY WITH .JS

const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// our localhost port
const port = 5000
const app = express()

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

// Sending message
io.on('connection', socket => {
  console.log('New client connected')

  socket.on('chat message', (data) => {
      io.emit('message response', data);
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))


*/