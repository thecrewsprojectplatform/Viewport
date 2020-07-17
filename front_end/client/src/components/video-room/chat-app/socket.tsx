import io from "socket.io-client";

import { VideoRoomApi } from "../../../api/video-room-api";
import { store } from "../../../store";
import { ActionType } from "../../../store/video-room/actionType";
import { controlVideo, controlVideoVolume, loadVideo } from "../../../store/video-room/video-player"
import { Actions, closedBrowserUserList, removeRoom, sendMessageToAllClients, } from "../../../store/video-room/video-room";

const socket = io();

/** 
 * Represents the socket communication that is received on the clientside.
 * All of the socket communications that the clients receive should be on this page
*/

const configureSocket = (dispatch, api: VideoRoomApi) => {
  let msgTime;
  const newUserAlertMessage = '';

  socket.on('connect', () => {
    console.log('connected');
  });

  socket.on('serverMessageToAllClients', data => {
    store.dispatch(sendMessageToAllClients(data.clientMessage, data.clientName, data.msgTime))
  });

  socket.on('sendUrlToAllClients', data => {
    store.dispatch(loadVideo(data.url))
  });

  socket.on('sendControlsToAllClients', data => {
    store.dispatch(controlVideo(data.room))
  })

  socket.on('sendVideoVolumeToAllClients', data => {
    store.dispatch(controlVideoVolume(data.videoVolume))
  })

  socket.on('userJoinedRoom', data => {
    msgTime = 'true'
    store.dispatch(sendMessageToAllClients(newUserAlertMessage, data.userName, msgTime))
  })

  socket.on('userLeftRoom', data => {
    msgTime = 'false'
    store.dispatch(sendMessageToAllClients(newUserAlertMessage, data.userName, msgTime))
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

  socket.on('updateRoomsToAllClientRoomList', data => {
    dispatch({
        type: ActionType.GetRoomsSuccess,
        roomsList: data.roomsList,
    } as Actions["GetRoomsSuccessAction"]);
  })

  return socket;
}

export default configureSocket;