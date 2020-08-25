import { combineReducers } from 'redux'

import { reducer as NotificationReducer } from "./notifications/notifications";
import { reducer as PlaylistReducer } from "./video-room/playlist";
import { reducer as VideoPlayerReducer } from "./video-room/video-player";
import { reducer as VideoRoomReducer } from "./video-room/video-room";

export const reducer = combineReducers({
    notifications: NotificationReducer,
    playlist: PlaylistReducer,
    player: VideoPlayerReducer,
    videoRoom: VideoRoomReducer,
});
