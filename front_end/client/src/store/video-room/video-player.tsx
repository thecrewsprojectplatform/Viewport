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

interface ControlVideoStateAction {
    type: ActionType.ControlVideoState;
    videoState: string;
}

interface ControlVideoTimeAction {
    type: ActionType.ControlVideoTime;
    videoTime: number;
}

interface ControlVideoVolumeAction {
    type: ActionType.ControlVideoVolume;
    videoVolume: number;
}

interface LoadVideoAction {
    type: ActionType.LoadVideo;
    url: string;
}

interface SetSeekingAction {
    type: ActionType.SetSeeking;
    seeking: boolean
}

interface SendUrlToServerAction {
    type: ActionType.SendUrlToServer;
    api: VideoRoomApi;
    currentRoom: Room;
    url: string;
    userId: number;
    userName: String;
}
interface SendVideoStateAction {
    type: ActionType.SendVideoState;
    api: VideoRoomApi;
    currentRoom: Room;
    videoState: string;
}

interface SendVideoTimeAction {
    type: ActionType.SendVideoTime;
    api: VideoRoomApi;
    currentRoom: Room;
    videoTime: number;
}

export interface Actions {
    ControlVideoStateAction: ControlVideoStateAction
    ControlVideoTimeAction: ControlVideoTimeAction
    ControlVideoVolumeAction: ControlVideoVolumeAction
    LoadVideoAction: LoadVideoAction
    SetSeekingAction: SetSeekingAction
    SendUrlToServerAction: SendUrlToServerAction
    SendVideoStateAction: SendVideoStateAction
    SendVideoTimeAction: SendVideoTimeAction
}

type Action =   ControlVideoStateAction |
                ControlVideoTimeAction |
                ControlVideoVolumeAction |
                SendUrlToServerAction |
                LoadVideoAction |
                SetSeekingAction |
                SendVideoStateAction |
                SendVideoTimeAction;

export const reducer = ( 
    state: VideoPlayerState = initialState,
    action: Action
): VideoPlayerState => {
    switch (action.type) {
        case ActionType.ControlVideoState:
            return produce(state, draftState => {
                draftState.player.videoState = action.videoState
            })
        case ActionType.ControlVideoTime:
            return produce(state, draftState => {
                draftState.player.videoTime = action.videoTime
            })
        case ActionType.ControlVideoVolume:
            return produce(state, draftState => {
                draftState.player.videoVolume = action.videoVolume
            })
        case ActionType.LoadVideo:
            return produce(state, draftState => {
                draftState.player.videoUrl = action.url;
        });
        case ActionType.SetSeeking:
            return produce(state, draftState => {
                draftState.seeking = action.seeking;
            });
        case ActionType.SendUrlToServer:
            return produce(state, draftState => {
                updateVideoUrlForServer(
                    action.api,
                    action.currentRoom.id,
                    action.url
                )
            });
        case ActionType.SendVideoState:
            return produce(state, draftState => {
                updateVideoStateForServer(
                    action.api,
                    action.currentRoom.id,
                    action.videoState
                )
            });
        case ActionType.SendVideoTime:
            return produce(state, draftState => {
                updateVideoTimeForServer(
                    action.api,
                    action.currentRoom.id,
                    action.videoTime
                )
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

export const controlVideoState = (videoState: string): any => {
    return (dispatch): any => {
        dispatch({
            type: ActionType.ControlVideoState,
            videoState: videoState
        })
    }
}

export const controlVideoTime = (videoTime: number): any => {
    return (dispatch): any => {
        dispatch({
            type: ActionType.ControlVideoTime,
            videoTime: videoTime
        })
    }
}

const getAndSendVideoState = (api: VideoRoomApi, roomId: number) => {
    api.getVideoState(roomId).then(videoState => {
        socket.emit('sendVideoStateToServer', {
            currentRoomId: roomId,
            videoState: videoState
        })
    })
}

const getAndSendVideoTime = (api: VideoRoomApi, roomId: number) => {
    api.getVideoTime(roomId).then(videoTime => {
        socket.emit('sendVideoTimeToServer', {
            currentRoomId: roomId,
            videoTime: videoTime
        })
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

const updateVideoStateForServer = (
        api: VideoRoomApi, 
        roomId: number, 
        videoState: string
    ) => {
        api.updateVideoState(roomId, videoState).then(() => {
            getAndSendVideoState(api, roomId)
        })

}

const updateVideoTimeForServer = (
        api: VideoRoomApi,
        roomId: number,
        videoTime: number    
    ) => {
        api.updateVideoTime(roomId, videoTime).then(() => {
            getAndSendVideoTime(api, roomId)
        })
}

const updateVideoUrlForServer = (api: VideoRoomApi, roomId: number, videoUrl: string) => {
    api.updateVideoUrl(roomId, videoUrl).then(() => {
        getAndSendUrl(api, roomId)
    })
}