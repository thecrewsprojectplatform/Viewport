import io from "socket.io-client";
import { userListToJoinRoomWhenUserCloseBrowser, sendMessageToAllClients, loadVideo, controlVideo } from "../../../store/video-room/video-room";
import { store } from "../../../store";

const socket = io();

const configureSocket = dispatch => {
  socket.on('connect', () => {
    console.log('connected');
  });

  socket.on('serverMessageToAllClients', data => {
    store.dispatch(sendMessageToAllClients(data.clientMessage, data.clientName))
  });

  socket.on('sendUrlToAllClients', data => {
    store.dispatch(loadVideo(data.url))
  });

  socket.on('sendRoomStateToAllClients', data => {
    store.dispatch(controlVideo(data.room))
  })

  socket.on('updateUserListDisconnectedClients', data => {
    store.dispatch(userListToJoinRoomWhenUserCloseBrowser(data.userListDisconnect))
  })

  return socket;
}

export default configureSocket;