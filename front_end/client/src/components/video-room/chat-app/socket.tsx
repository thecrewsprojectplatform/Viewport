import io from "socket.io-client";
import { sendMessageToAllClients, loadVideo, controlVideo } from "../../../store/video-room/video-room";
import { store } from "../../../store";
import { removeRoom, closedBrowserUserList, Actions } from "../../../store/video-room/video-room";
import { VideoRoomApi } from "../../../api/video-room-api";
import { ActionType } from "../../../store/video-room/actionType";

const socket = io();

const configureSocket = (dispatch, api: VideoRoomApi) => {

  socket.on('connect', () => {
    console.log('connected');
  });

  socket.on('serverMessageToAllClients', data => {
    store.dispatch(sendMessageToAllClients(data.clientMessage, data.clientName, data.msgTime))
  });

  socket.on('sendUrlToAllClients', data => {
    store.dispatch(loadVideo(data.url))
  });

  socket.on('sendRoomStateToAllClients', data => {
    store.dispatch(controlVideo(data.room))
  })

  socket.on('clientDisconnectedUpdateUserList', data => {
    api.removeUserFromRoom(data.currentRoomId, data.currentUserId).then(() => {
        store.dispatch(closedBrowserUserList(api, data.currentRoomId));
    }).finally(() => {
        api.getUsersInRoom(data.currentRoomId).then(users => {
            if (users.length === 0) {
                store.dispatch(removeRoom(api, data.currentRoomId));
            }
        })
    })
    api.removeUser(data.currentUserId)
  });

  socket.on('updateUserToAllClientUserList', data => {
    store.dispatch({
        type: ActionType.SetVideoRoomUsers,
        users: data.clientList,
    } as Actions["SetVidoRoomUsersAction"]);
  })



  return socket;
}

export default configureSocket;