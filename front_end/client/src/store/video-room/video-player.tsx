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
}

const initialState: VideoPlayerState = {
    player: null
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
    videoState: string;
}

interface ControlVideoAction {
    type: ActionType.ControlVideo;
    room: Room;
    video_length: number;
}

export interface Actions {
    SendUrlToServerAction: SendUrlToServerAction
    LoadVideoAction: LoadVideoAction
    SendPlayPauseAction: SendPlayPauseAction
    ControlVideoAction: ControlVideoAction
}

type Action =   SendUrlToServerAction |
                LoadVideoAction |
                SendPlayPauseAction |
                ControlVideoAction;


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
                draftState.player.videoUrl = action.url
            });
        case ActionType.LoadVideo:
            return produce(state, draftState => {
                draftState.player.videoUrl = action.url;
            });
        case ActionType.SendPlayPause:
            updateVideoState(
                draftState.currentRoom.id,
                draftState.currentRoom.name,
                "",
                draftState.player.videoUrl,
                action.videoState,
                draftState.player.videoTime,
                drarftState.player.videoLength
            )
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
export const controlVideo = (room: Room): any => {
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