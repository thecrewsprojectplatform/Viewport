import io from "socket.io-client";
import { sendMessageToAllClients, loadVideo, controlVideo } from "../../../store/video-room/video-room";
import { store } from "../../../store";
import { removeRoom, closedBrowserUserList, Actions } from "../../../store/video-room/video-room";
import { VideoRoomApi } from "../../../api/video-room-api";
import { ActionType } from "../../../store/video-room/actionType";

const socket = io();

/** 
 * Represents the socket communication that is received on the clientside.
 * All of the socket communications that the clients receive should be on this page
*/

const configureSocket = (dispatch, api: VideoRoomApi) => {
  const msgTime = ''

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

  socket.on('userJoinedRoom', data => {
    store.dispatch(sendMessageToAllClients(data.clientMessage, data.clientName, msgTime))
  })

  socket.on('userLeftRoom', data => {
    store.dispatch(sendMessageToAllClients(data.clientMessage, data.clientName, msgTime))
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