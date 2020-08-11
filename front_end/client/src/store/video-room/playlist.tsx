import produce from 'immer'

import { VideoRoomApi } from "../../api/video-room-api";
import { Room, Video } from "../../api/video-room-types";
import { socket } from "../../App";
import { ActionType } from "./actionType"

export interface PlaylistState {
    playlist: Video[]
}

const initialState: PlaylistState = {
    playlist: [],
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
    playlist: Video[];
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
                addVideo(
                    action.api,
                    action.roomId,
                    action.userId,
                    action.url
                )
            });
        case ActionType.RemoveVideo:
            return produce(state, draftState => {
                removeVideo(
                    action.api,
                    action.roomId,
                    action.url
                )
            });
        case ActionType.UpdatePlaylist:
            return produce(state, draftState => {
                draftState.playlist = action.playlist;
            });
        default:
            return state;
    }
};

export const updatePlaylist = (playlist: Video[]): any => {
    return (dispatch): any => {
        dispatch({
            type: ActionType.UpdatePlaylist,
            playlist: playlist
        })
    }
}

const getAndSendPlaylist = (api: VideoRoomApi, roomId: number) => {
    api.getPlaylist(roomId).then(playlist => {
        socket.emit('sendPlaylistToServer', {
            currentRoomId: roomId,
            playlist: playlist
        })
    })
}

const addVideo = (
        api: VideoRoomApi,
        roomId: number,
        userId: number,
        videoUrl: string
    ) => {
        api.createPlaylist(roomId, userId, videoUrl).then(() => {
            getAndSendPlaylist(api, roomId)
        })
}

const removeVideo = (
        api: VideoRoomApi,
        roomId: number,
        videoUrl: string
    ) => {
        api.removePlaylist(roomId, videoUrl).then(() => {
            getAndSendPlaylist(api, roomId)
        })
    }