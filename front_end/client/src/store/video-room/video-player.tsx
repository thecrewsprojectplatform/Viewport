import produce from 'immer'

import { VideoRoomApi } from "../../api/video-room-api";
import { Room, Player } from "../../api/video-room-types";
import { socket } from "../../App"
import { ActionType } from './actionType'

export interface VideoPlayerState {
    player: Player
    seeking: boolean
}

const initialState: VideoPlayerState = {
    player: {
        videoUrl: "",
        videoState: "PAUSED",
        videoTime: 0,
        videoLength: 0,
        videoVolume: 0.5
    },
    seeking: false
};

interface SendUrlToServerAction {
    type: ActionType.SendUrlToServer;
    api: VideoRoomApi;
    currentRoom: Room;
    url: string;
    userId: number;
    userName: String;
}

interface LoadVideoAction {
    type: ActionType.LoadVideo;
    url: string;
}

interface SendControlAction {
    type: ActionType.SendControl;
    api: VideoRoomApi;
    currentRoom: Room;
    videoState: string;
    videoTime: number;
}

interface ControlVideoAction {
    type: ActionType.ControlVideo;
    roomApi: any;
}

interface ControlVideoVolumeAction {
    type: ActionType.ControlVideoVolume;
    videoVolume: number;
}

interface SetSeekingAction {
    type: ActionType.SetSeeking;
    seeking: boolean
}

export interface Actions {
    SendUrlToServerAction: SendUrlToServerAction
    LoadVideoAction: LoadVideoAction
    SendControlAction: SendControlAction
    ControlVideoAction: ControlVideoAction
    ControlVideoVolumeAction: ControlVideoVolumeAction
}

type Action =   SendUrlToServerAction |
                LoadVideoAction |
                SendControlAction |
                ControlVideoAction |
                ControlVideoVolumeAction |
                SetSeekingAction;


export const reducer = ( 
    state: VideoPlayerState = initialState,
    action: Action
): VideoPlayerState => {
    switch (action.type) {
        case ActionType.SendUrlToServer:
            return produce(state, draftState => {
                updateVideoUrlForServer(
                    action.api,
                    action.currentRoom.id,
                    action.url
                )
            });
        case ActionType.LoadVideo:
            return produce(state, draftState => {
                draftState.player.videoUrl = action.url;
            });
        case ActionType.SendControl:
            return produce(state, draftState => {
                updateVideoState(
                    action.api,
                    action.currentRoom.id,
                    action.currentRoom.name,
                    "",
                    draftState.player.videoUrl,
                    action.videoState,
                    action.videoTime,
                    draftState.player.videoLength
                )
            });
        case ActionType.ControlVideo:
            return produce(state, draftState => {
                draftState.player.videoTime = action.roomApi.video_time
                draftState.player.videoState = action.roomApi.video_state
            });
        case ActionType.ControlVideoVolume:
            return produce(state, draftState => {
                draftState.player.videoVolume = action.videoVolume
            });
        case ActionType.SetSeeking:
            return produce(state, draftState => {
                draftState.seeking = action.seeking;
            });
        default:
            return state;        
    }
};

/**
 * Updates the video url tied to the video player for client(s)
 * @param url the Url of a  video
 */
export const loadVideo = (url: string): any => {
    return (dispatch): any => {
        dispatch({
            type: ActionType.LoadVideo,
            url: url
        })
    }
}

/**
 * Updates the room state for client(s)
 * @param room the current room state
 */
export const controlVideo = (room: any): any => {
    return (dispatch): any => {
        dispatch({
            type: ActionType.ControlVideo,
            roomApi: room
        })
    }
}

const getAndSendRoomState = (api: VideoRoomApi, roomId: number) => {
    api.getRoom(roomId).then(room => {
        socket.emit('sendControlsToServer', {
            currentRoomId: roomId,
            room: room
        })
    })
}

const updateVideoState = (
        api: VideoRoomApi,
        roomId: number,
        name: string,
        videoId: string,
        videoUrl: string,
        videoState: string,
        videoTime: number,
        videoLength: number
    ) => {
        api.updateRoom(
            roomId,
            name,
            videoId, 
            videoUrl,
            videoState,
            videoTime,
            videoLength
        ).then(() => {
            getAndSendRoomState(api, roomId)
        })
}


const getAndSendUrl = (api: VideoRoomApi, roomId: number) => {
    api.getVideoUrl(roomId).then(videoUrl => {
        socket.emit('sendVideoUrlToServer', {
            currentRoomId: roomId,
            videoUrl: videoUrl
        })
    })
}

const updateVideoUrlForServer = (api: VideoRoomApi, roomId: number, videoUrl: string) => {
    api.updateVideoUrl(roomId, videoUrl).then(() => {
        getAndSendUrl(api, roomId)
    })
}