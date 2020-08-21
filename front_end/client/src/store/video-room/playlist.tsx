import produce from 'immer'

import { VideoRoomApi } from "../../api/video-room-api";
import { PlaylistItem, Video } from "../../api/video-room-types";
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

interface GetPlaylistAction {
    type: ActionType.GetPlaylist;
    api: VideoRoomApi;
    roomId: number;
}

interface UpdatePlaylistAction {
    type: ActionType.UpdatePlaylist;
    videos: Video[];
}

export interface Actions {
    AddVideoAction: AddVideoAction
    RemoveVideoAction: DeleteVideoAction
    AddToPlaylistAction: AddToPlaylistAction
    DeleteFromPlaylistAction: DeleteFromPlaylistAction
    GetPlaylistAction: GetPlaylistAction
    UpdatePlaylistAction: UpdatePlaylistAction
}

type Action = AddVideoAction |
              DeleteVideoAction |
              AddToPlaylistAction |
              DeleteFromPlaylistAction |
              GetPlaylistAction |
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

        case ActionType.UpdatePlaylist:
            return produce(state, draftState => {
                console.log("playlist updated to " + action.videos)
                draftState.videos = action.videos;
            })
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
        video: Video
) => {
    api.createVideo(video.userId, video.url).then((videoResponse: Video) => {
        api.createPlaylist(roomId, videoResponse.id);
        getAndSendVideo(roomId, videoResponse, "ADD");
    });
}

const removeVideo = (
    api: VideoRoomApi,
    roomId: number,
    video: Video
) => {
    api.removePlaylist(roomId, video.id);
    api.removeVideo(video.id);
    getAndSendVideo(roomId, video, "DELETE");
}

/** 
 * Fetches the list of video id's from the Playlist endpoint and then
 * for each video id, fetch the video url from the Video endpoint
 */
export const getPlaylistFromServer = (
    api: VideoRoomApi,
    roomId: number,
    dispatch
) => {
    api.getPlaylist(roomId).then((videos: PlaylistItem[]) => {
        let playlist: Video[] = [];
        videos.forEach(element => {
            api.getVideo(element.video_id).then((video: Video) => {
                playlist.push(video);
            });
        });        
        dispatch({
            type: ActionType.UpdatePlaylist,
            videos: playlist
        })
    });
}