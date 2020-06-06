import io from "socket.io-client";
import { sendMessageToAllClients, loadVideo, controlVideo } from "../../../store/video-room/video-room";
import { store } from "../../../store";

const socket = io('http://localhost:5001');

const configureSocket = dispatch => {
  // make sure our socket is connected to the port
  socket.on('connect', () => {
    console.log('connected');
  });

  // listening for the server's client broadcast message
  socket.on('serverMessageToAllClients', data => {
    store.dispatch(sendMessageToAllClients(data.clientMessage, data.clientName))
  });

  socket.on('sendUrlToAllClients', data => {
      store.dispatch(loadVideo(data.url))
  });

  socket.on('sendRoomStateToAllClients', data => {
      store.dispatch(controlVideo(data.room))
  })

  return socket;
}

export default configureSocket;