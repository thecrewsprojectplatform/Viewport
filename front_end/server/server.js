// require express first
var express = require("express");
//require socket.IO
var socket = require('socket.io')

//setting up the express app by invoking the express function
var app = express();

//now create a server
//When the server starts listening on port 4000 then fire a callbak function
// The callback function will console.log a string 
var server = app.listen(5000, function(){
  console.log("Listening to requests on port 5000");

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
    // this waits for the user to type in the message from the client side
    socket.on('chatMessage', data => {

        console.log('sent message to server')
        // once message is received, this occurs
        // message is emitted to all of the clients on the server.
        io.emit('messageResponse', data);
        console.log('message emitted to clients')
    })
});