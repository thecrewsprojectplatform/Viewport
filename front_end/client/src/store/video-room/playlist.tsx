import produce from 'immer'

import { VideoRoomApi } from "../../api/video-room-api";
import { Room, Video } from "../../api/video-room-types";
import { socket } from "../../App";
import { ActionType } from "./actionType"

export interface PlaylistState {
    videos: Video[]
}

const initialState: PlaylistState = {
    videos: [],
}

interface AddVideoAction {
    type: ActionType.AddVideo;
    api: VideoRoomApi;
    roomId: number;
    userId: number;
    url: string;
}

interface RemoveVideoAction {
    type: ActionType.RemoveVideo;
    api: VideoRoomApi;
    roomId: number;
    url: string;
}

interface UpdatePlaylistAction {
    type: ActionType.UpdatePlaylist;
    video: Video;
}

export interface Actions {
    AddVideoAction: AddVideoAction
    RemoveVideoAction: RemoveVideoAction
    UpdatePlaylistAction: UpdatePlaylistAction
}

type Action = AddVideoAction |
              RemoveVideoAction |
              UpdatePlaylistAction;

export const reducer = (
    state: PlaylistState = initialState,
    action: Action
): PlaylistState => {
    switch(action.type) {
        case ActionType.AddVideo:
            return produce(state, draftState => {
                console.log("inside reducer" + action.roomId)
                addVideo(
                    action.api,
                    action.roomId,
                    action.userId,
                    action.url
                )
            });
        // case ActionType.RemoveVideo:
        //     return produce(state, draftState => {
        //         removeVideo(
        //             action.api,
        //             action.roomId,
        //             action.url
        //         )
        //     });
        case ActionType.UpdatePlaylist:
            return produce(state, draftState => {
                console.log('updating playlist')
                console.log(action.video)
                console.log(draftState.videos)
                draftState.videos.push(action.video);
                console.log(draftState.videos)
            });
        default:
            return state;
    }
};

export const updatePlaylist = (video: Video): any => {
    return (dispatch): any => {
        dispatch({
            type: ActionType.UpdatePlaylist,
            video: video
        })
    }
}

const getAndSendVideo = (roomId: number, video: Video) => {
    console.log('emit to clients')
    socket.emit('sendVideoToServer', {
        currentRoomId:  roomId,
        video: video
    })
}

const addVideo = (
        api: VideoRoomApi,
        roomId: number,
        userId: number,
        videoUrl: string
    ) => {
        api.createPlaylist(roomId, userId, videoUrl).then(response => {
            console.log(response)
            getAndSendVideo(roomId, response)
        })
}

// const removeVideo = (
//         api: VideoRoomApi,
//         roomId: number,
//         videoUrl: string
//     ) => {
//         api.removePlaylist(roomId, videoUrl).then(() => {
//             getAndSendVideo(api, roomId)
//         })
//     }