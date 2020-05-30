var express = require("express");
var socket = require('socket.io')

//setting up the express app by invoking the express function
var app = express();

//now create a server
//When the server starts listening on port 5001 then fire a callback function
var server = app.listen(5001, function(){
  console.log("Listening to requests on port 5001");

});
// serve a static file to the browser 
app.use(express.static("public"));

/* SOCKET SETUP
/
Establishing a socket communication network on the server.
/
*/
var io = socket(server);

/* SOCKET CONNECTION
/
Looks for a client connection onto the server
Most socket event communications goes as follows:
1) Client sends message to server
2) Server receives the message
3) Server sends the message to all clients in the specified room (currentRoomID)
/
*/
io.on('connection', socket => {
  console.log('A new client has joined our server!');
  var currentUser = [];

  /*  JOINING A ROOM (For room specific socket communication) */ 
  socket.on('joinRoom', room => {
    console.log('joining on room name:', room)
    socket.join(room);
  })

  /*  Leaving A ROOM  */ 
  socket.on('leaveRoom', room => {
    console.log('leaving the room:', room)
    socket.leave(room);
  })

  /* GET THE CURRENT USER */
  socket.on('getCurrentUser', data => {
    console.log('current user is:', data)
    currentUser = data.currentUser;
  })

  /*  SENDING A MESSAGE  */ 
  socket.on('clientMessageToServer', data => {
      console.log('Client has sent a message to the server')
      // once message is received, this occurs
      // message is emitted to all of the clients on the server.
      io.to(data.currentRoomId).emit('serverMessageToAllClients', data);
      console.log('message emitted to clients')
  })

  /*  UPDATING THE USERLIST OF THE ROOM  */ 
  socket.on('updateUserToServerUserList', data => {
    console.log(data.clientList, 'is in the room:', data.currentRoomId)
    io.to(data.currentRoomId).emit('updateUserToAllClientUserList', data);
  })
  
  /*  UPDATING THE ROOMLIST IN THE JOIN-CREATE-ROOM PAGE  */
  socket.on('updateRoomsToServerRoomList', data => {
    console.log('Current Room list is', data.roomsList)
    io.emit('updateRoomsToAllClientRoomList', data)
  })

  socket.on('disconnect', function(){
    console.log('A client has left our server.');
  });
});