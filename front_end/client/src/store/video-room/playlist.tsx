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
    video: Video;
}

interface DeleteVideoAction {
    type: ActionType.DeleteVideo;
    api: VideoRoomApi;
    roomId: number;
    video: Video;
}

interface AddToPlaylistAction {
    type: ActionType.AddToPlaylist;
    video: Video;
}

interface DeleteFromPlaylistAction {
    type: ActionType.DeleteFromPlaylist;
    video: Video;
}

export interface Actions {
    AddVideoAction: AddVideoAction
    RemoveVideoAction: DeleteVideoAction
    AddToPlaylistAction: AddToPlaylistAction
    DeleteFromPlaylistAction: DeleteFromPlaylistAction
}

type Action = AddVideoAction |
              DeleteVideoAction |
              AddToPlaylistAction |
              DeleteFromPlaylistAction;

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
                    action.video
                )
            });
        case ActionType.DeleteVideo:
            return produce(state, draftState => {
                removeVideo(
                    action.api,
                    action.roomId,
                    action.video
                )
            });
        case ActionType.AddToPlaylist:
            return produce(state, draftState => {
                draftState.videos.push(action.video);
            });
        case ActionType.DeleteFromPlaylist:
            return produce(state, draftState => {
                draftState.videos.splice(draftState.videos.findIndex(video => video.url === action.video.url), 1);
            });
        default:
            return state;
    }
};

export const addToPlaylist = (video: Video): any => {
    return (dispatch): any => {
        dispatch({
            type: ActionType.AddToPlaylist,
            video: video
        })
    }
}

export const deleteFromPlaylist = (video: Video): any => {
    return (dispatch): any => {
        dispatch({
            type: ActionType.DeleteFromPlaylist,
            video: video
        })
    }
}

const getAndSendVideo = (roomId: number, video: Video, option: string) => {
    socket.emit('sendVideoToServer', {
        currentRoomId:  roomId,
        video: video,
        option: option
    })
}

const addVideo = (
        api: VideoRoomApi,
        roomId: number,
        userId: number,
        video: Video
    ) => {
        api.createPlaylist(roomId, userId, video.url).then(response => {
            getAndSendVideo(roomId, response, "ADD")
        })
}

const removeVideo = (
        api: VideoRoomApi,
        roomId: number,
        video: Video
    ) => {
        api.removePlaylist(roomId, video.url).then(() => {
            getAndSendVideo(roomId, video, "DELETE")
        })
    }