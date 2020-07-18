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

interface SendVolumeAction {
    type: ActionType.SendVolume;
    api: VideoRoomApi;
    currentRoom: Room;
    videoVolume: number;
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
    SendVolumeAction: SendVolumeAction
    ControlVideoVolumeAction: ControlVideoVolumeAction
}

type Action =   SendUrlToServerAction |
                LoadVideoAction |
                SendControlAction |
                ControlVideoAction |
                SendVolumeAction |
                ControlVideoVolumeAction |
                SetSeekingAction;


export const reducer = ( 
    state: VideoPlayerState = initialState,
    action: Action
): VideoPlayerState => {
    switch (action.type) {
        case ActionType.SendUrlToServer:
            socket.emit('sendUrlToServer', {
                url: action.url,
                currentRoomId: action.currentRoom.id,
                clientId: action.userId,
                clientName: action.userName
            });
            return produce(state, draftState => {
                updateVideoState(
                    action.api,
                    action.currentRoom.id,
                    action.currentRoom.name,
                    "",
                    action.url,
                    "PAUSED",
                    0,
                    0
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
        case ActionType.SendVolume:
            return produce(state, draftState => {
                updateVolume(
                    action.api,
                    action.currentRoom.id,
                    action.videoVolume
                )
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

export const controlVideoVolume = (videoVolume: number): any => {
    return (dispatch): any => {
        dispatch({
            type: ActionType.ControlVideoVolume,
            videoVolume: videoVolume
        })
    }
} 

const getAndSendVolume = (api: VideoRoomApi, roomId: number) => {
    api.getVideoVolume(roomId).then(videoVolume => {
        socket.emit('sendVideoVolumeToServer', {
            currentRoomId: roomId,
            videoVolume: videoVolume
        })
    })
}

const updateVolume = (api: VideoRoomApi, roomId: number, videoVolume: number) => {
    api.updateVideoVolume(roomId, videoVolume).then(() => {
        getAndSendVolume(api, roomId)
    })
}