const express = require("express");
const socket = require('socket.io');
const path = require('path');

//setting up the express app by invoking the express function
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

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
  socket.on('joinRoom', data => {
    console.log('joining on room name:', data.roomId)
    socket.join(data.roomId);
    io.to(data.roomId).emit('userJoinedRoom', {
      userName: socket.userName
    })
  })

  /*  Leaving A ROOM  */
  socket.on('leaveRoom', data => {
    console.log('leaving the room:', data.roomId)
    socket.leave(data.roomId);
    io.to(data.roomId).emit('userLeftRoom', {
      userName: socket.userName
    })
  })

  /* GET THE CURRENT USER SOCKET */
  socket.on('getCurrentUser', data => {
    console.log('A new user has been created', data.currentUser.id)
    socket.usernameId = data.currentUser.id;
    socket.userName = data.currentUser.name
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

  socket.on('sendVideoStateToServer', data => {
    io.to(data.currentRoomId).emit('sendVideoStateToAllClients', data);
  })

  socket.on('sendVideoTimeToServer', data => {
    io.to(data.currentRoomId).emit('sendVideoTimeToAllClients', data);
  })

  socket.on('sendVideoUrlToServer', data => {
    io.to(data.currentRoomId).emit('sendVideoUrlToAllClients', data);
  })

  socket.on('sendVideoToServer', data => {
    io.to(data.currentRoomId).emit('sendVideoToAllClients', data);
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

    io.to(socket.roomId).emit('userLeftRoom', {
      userName: socket.userName
    })

    io.emit('clientDisconnectedUpdateRoomList', {
      currentRoomId: socket.roomId,
    })

    io.emit('clientDisconnectedUpdateUserList', {
      currentRoomId: socket.roomId,
      currentUserId: socket.usernameId,
    })

  });

});
