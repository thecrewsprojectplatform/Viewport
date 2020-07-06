import { useContext } from 'react'
import { ActionType } from './actionType'
import produce from 'immer'
import { VideoRoomApi } from "../../api/video-room-api";
import { Room, Player } from "../../api/video-room-types";
import { socket } from "../../App"
import { ApiContext } from '../../components/index';


const VIDEO_SYNC_MAX_DIFFERENCE = 3  // in seconds
const api = useContext<VideoRoomApi>(ApiContext)

export interface VideoPlayerState {
    player: Player
    seeking: boolean
}

const initialState: VideoPlayerState = {
    player: {
        videoUrl: "",
        videoState: "PAUSED",
        videoTime: 0,
        videoLength: 0
    },
    seeking: false
};

interface SendUrlToServerAction {
    type: ActionType.SendUrlToServer;
    url: string;
    roomId: number;
    userId: number;
    userName: String;
}

interface LoadVideoAction {
    type: ActionType.LoadVideo;
    url: string;
}

interface SendPlayPauseAction {
    type: ActionType.SendPlayPause;
    currentRoom: Room;
    videoState: string;
}

interface SendControlAction {
    type: ActionType.SendControl;
    currentRoom: Room;
    videoTime : number;
}

interface ControlVideoAction {
    type: ActionType.ControlVideo;
    roomApi: any;
}

interface SetSeekingAction {
    type: ActionType.SetSeeking;
    seeking: boolean
}

export interface Actions {
    SendUrlToServerAction: SendUrlToServerAction
    LoadVideoAction: LoadVideoAction
    SendPlayPauseAction: SendPlayPauseAction
    SendControlAction: SendControlAction
    ControlVideoAction: ControlVideoAction
}

type Action =   SendUrlToServerAction |
                LoadVideoAction |
                SendPlayPauseAction |
                SendControlAction |
                ControlVideoAction |
                SetSeekingAction;


export const reducer = ( 
    state: VideoPlayerState = initialState,
    action: Action
): VideoPlayerState => {
    switch (action.type) {
        case ActionType.SendUrlToServer:
            socket.emit('sendUrlToServer', {
                url: action.url,
                currentRoomId: action.roomId,
                clientId: action.userId,
                clientName: action.userName
            });
            return produce(state, draftState => {
                draftState.player.videoUrl = action.url;
            });
        case ActionType.LoadVideo:
            return produce(state, draftState => {
                draftState.player.videoUrl = action.url;
            });
        case ActionType.SendPlayPause:
            return produce(state, draftState => {
                updateVideoState(
                    action.currentRoom.id,
                    action.currentRoom.name,
                    "",
                    draftState.player.videoUrl,
                    action.videoState,
                    draftState.player.videoTime,
                    draftState.player.videoLength
                )
                draftState.player.videoState = action.videoState;
            });
        case ActionType.SendControl:
            return produce(state, draftState => {
                updateVideoState(
                    action.currentRoom.id,
                    action.currentRoom.name,
                    "",
                    draftState.player.videoUrl,
                    draftState.player.videoState,
                    action.videoTime,
                    draftState.player.videoLength
                )
                draftState.player.videoTime = action.videoTime;
            });
        case ActionType.ControlVideo:
            return produce(state, draftState => {
                const video_length = action.roomApi.video_length
                if (draftState.player.videoState !== action.roomApi.video_state ||
                    Math.abs(draftState.player.videoTime - action.roomApi.video_time) * video_length > VIDEO_SYNC_MAX_DIFFERENCE) {
                        draftState.player.videoTime = action.roomApi.videoState;
                }
            });
        case ActionType.SetSeeking:
            return produce(state, draftState => {
                draftState.seeking = action.seeking;
            });
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
            room: room
        })
    }
}

const getAndSendRoomState = (api: VideoRoomApi, roomId: number) => {
    api.getRoom(roomId).then(room => {
        socket.emit('getRoomStateToServer', {
            currentRoomId: roomId,
            room: room
        })
    })
}

/**
 * This updates whether or not the video is playing
 */
export const updateVideoState = (
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