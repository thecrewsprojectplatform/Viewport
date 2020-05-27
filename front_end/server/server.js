// require express first
var express = require("express");
//require socket.IO
var socket = require('socket.io')

//setting up the express app by invoking the express function
var app = express();

//now create a server
//When the server starts listening on port 4000 then fire a callbak function
// The callback function will console.log a string 
var server = app.listen(5001, function(){
  console.log("Listening to requests on port 5001");

});
// serve a static file to the browser 
app.use(express.static("public"));

//Socket setup
//passing var server to the socket function and assigning it to var io
//essentially now socket.IO will work on this server just created
var io = socket(server);

//Then use the io.on method which looks for a connection
//upon a connection execute a callback function which will console.log something
io.on('connection', socket => {
  console.log('made socket connection');

  //figure out what room they are joining
  socket.on('joinRoom', room => {
    console.log('joining on room name:', room)
    socket.join(room);
  })

  socket.on('leaveRoom', room => {
    console.log('leaving the room:', room)
    socket.leave(room);
  })

  // this waits for the user to type in the message from the client side
  socket.on('chatMessage', data => {
      console.log('sent message to server')
      // once message is received, this occurs
      // message is emitted to all of the clients on the server.
      io.to(data.currentRoomId).emit('messageResponse', data);
      console.log('message emitted to clients')
  })

  socket.on('addUserToServerUserList', data => {
    console.log(data.clientList, 'has joined the room:', data.currentRoomId)
    io.to(data.currentRoomId).emit('addUserToAllClientUserList', data);
  })

  socket.on('removeUserToServerUserList', data => {
    console.log(data.clientList, 'remains in the room:', data.currentRoomId)
    io.to(data.currentRoomId).emit('removeUserToAllClientUserList', data);
  })

});