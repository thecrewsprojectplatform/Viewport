import io from "socket.io-client";

import { VideoRoomApi } from "../../../api/video-room-api";
import { store } from "../../../store";
import { ActionType } from "../../../store/video-room/actionType";
import { addToPlaylist, deleteFromPlaylist } from "../../../store/video-room/playlist";
import { controlVideoState, controlVideoTime, loadVideo } from "../../../store/video-room/video-player"
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

  socket.on('sendVideoStateToAllClients', data => {
    store.dispatch(controlVideoState(data.videoState))
  })

  socket.on('sendVideoTimeToAllClients', data => {
    store.dispatch(controlVideoTime(data.videoTime))
  })

  socket.on('sendVideoUrlToAllClients', data => {
    store.dispatch(loadVideo(data.videoUrl))
  });

  socket.on('sendVideoToAllClients', data => {
    if (data.option === "ADD") {
      store.dispatch(addToPlaylist(data.video))
    } else if (data.option === "DELETE") {
      store.dispatch(deleteFromPlaylist(data.video))
    }
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