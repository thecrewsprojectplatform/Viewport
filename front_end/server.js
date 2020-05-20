const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// our localhost port
const port = 5001
const app = express()

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

// Sending message
io.on('connection', socket => {
  console.log('New client connected')

  socket.on('chat message', function(data){
      io.emit('message response', data);
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))

6