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

/* SOCKET CONNECTION */
io.on('connection', socket => {
  console.log('A new client has joined our server!');
  const currentUsers = [];
  const currentRooms = [];

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

  /* GET THE CURRENT USER SOCKET */
  socket.on('getCurrentUser', data => {
    socket.usernameId = data.currentUser.id;
    currentUsers.push(socket.usernameId);
  })

  /* GET THE CURRENT ROOM SOCKET */
  socket.on('getCurrentRoom', data => {
    socket.roomId = data.currentRoomId;
    currentRooms.push(socket.roomId);
  })

  /*  SENDING A MESSAGE  */ 
  socket.on('clientMessageToServer', data => {
      console.log('Client has sent a message to the server')
      // once message is received, this occurs
      // message is emitted to all of the clients on the server.
      io.to(data.currentRoomId).emit('serverMessageToAllClients', data);
      console.log('message emitted to clients')
  })

  socket.on('sendUrlToServer', data => {
      console.log('Client has sent url to the server')
      io.to(data.currentRoomId).emit('sendUrlToAllClients', data);
      console.log('url emitted to clients')
  })

  socket.on('sendControlsToServer', data => {
      console.log('Client has sent controls to the server')
      io.to(data.currentRoomId).emit('sendControlsToAllClients', data);
      console.log('controls emitted to clients')
  })

  socket.on('getRoomStateToServer', data => {
      console.log('client has sent room to the server')
      io.to(data.currentRoomId).emit('sendRoomStateToAllClients', data);
      console.log('room emitted to all clients')
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

  /* UPDATING USERLIST AND API WHEN CLIENT DISCONNECTS */
  socket.on('disconnect', function() {
    console.log('A client has left our server.');
    currentUsers.splice(currentUsers.indexOf(socket.usernameId), 1);
    io.emit('clientDisconnectedUpdateUserList', {
      currentRoomId: socket.roomId,
      currentUserId: socket.usernameId
    })

    socket.close()
  });
  
});