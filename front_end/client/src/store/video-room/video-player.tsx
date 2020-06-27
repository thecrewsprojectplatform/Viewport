import { ActionType } from './actionType'
import produce from 'immer'
import { VideoRoomApi } from "../../api/video-room-api";
import { Room, Player } from "../../api/video-room-types";
import { socket } from "../../App"


const VIDEO_SYNC_MAX_DIFFERENCE = 3  // in seconds

export interface VideoPlayerState {
    player: Player
}

const initialState: VideoPlayerState = {
    videoUrl: null,
    videoState: "PAUSED",
    videoTime: 0,
    videoLength: 0
};

interface SendUrlToServerAction {
    type: ActionType.SendUrlToServer;
    url: string;
}

interface LoadVideoAction {
    type: ActionType.LoadVideo;
    url: string;
}

interface ControlVideoAction {
    type: ActionType.ControlVideo;
    room: Room;
    video_length: number;
}

export interface Actions {
    SendUrlToServerAction: SendUrlToServerAction
    LoadVideoAction: LoadVideoAction
    ControlVideoAction: ControlVideoAction
}

type Action =   SendUrlToServerAction |
                LoadVideoAction |
                ControlVideoAction;


export const reducer = ( 
    state: VideoPlayerState = initialState,
    action: Action
): VideoPlayerState => {
    switch (action.type) {
        case ActionType.SendUrlToServer:
            socket.emit('sendUrlToServer', {
                url: action.url,
                currentRoomId: action.id,
                clientId: state.user.id,
                clientName: state.user.name
            });
            return produce(state, draftState => {
                draftState.videoUrl = action.url
            });
        case ActionType.LoadVideo:
            return produce(state, draftState => {
                draftState.videoUrl = action.url;
            });
        case ActionType.ControlVideo:
            return produce(state, draftState => {
                const video_length = action.room.video_length
                if (draftState.currentRoom.video_state !== action.room.video_state ||
                    Math.abs(draftState.currentRoom.video_time - action.room.video_time) * video_length > VIDEO_SYNC_MAX_DIFFERENCE) {
                        draftState.currentRoom = action.room;
                } else {
                    //draftState.currentRoom.video_state = action.room.video_state
                }
            });
        default:
            return state
    }
};

export const loadVideo = (url: string): any => {
    return (dispatch): any => {
        dispatch({
            type: ActionType.LoadVideo,
            url: url
        })
    }
}

export const controlVideo = (room: Room): any => {
    return (dispatch): any => {
        dispatch({
            type: ActionType.ControlVideo,
            room: room
        })
    }
}