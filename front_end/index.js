const express = require("express");
const socket = require('socket.io');
const path = require('path');

//setting up the express app by invoking the express function
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

//When the server starts listening on port 5001 then fire a callback function
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`Listening to requests on port ${PORT}`);
});

// Establishing socket communication network
const io = socket(server);

/* SOCKET CONNECTION */
io.on('connection', socket => {
  console.log('A new client has joined our server!');

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
  })

  /* GET THE CURRENT ROOM SOCKET */
  socket.on('getCurrentRoom', data => {
    socket.roomId = data.currentRoomId;
  })

  /*  SENDING A MESSAGE  */
socket.on('clientMessageToServer', data => {
    console.log('Client has sent a message to the server')
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

  /* RECEIVING INFORMATION ON USERLIST OF THE ROOM THAT THE CLIENT DISCONNECTED */
  socket.on('updateUserListDisconnected', data => {
    io.emit('updateUserListDisconnectedClients', data)
  })

  /* UPDATING USERLIST, ROOMLIST AND API WHEN CLIENT DISCONNECTS */
  socket.on('disconnect', function() {
    console.log('A client has left our server.');
    console.log('deleting client ID #', socket.usernameId, 'in room ID #', socket.roomId)

    io.emit('clientDisconnectedUpdateRoomList', {
      currentRoomId: socket.roomId,
    })

    io.emit('clientDisconnectedUpdateUserList', {
      currentRoomId: socket.roomId,
      currentUserId: socket.usernameId,
    })

  });

});
