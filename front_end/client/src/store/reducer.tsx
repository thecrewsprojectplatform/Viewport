import { combineReducers } from 'redux'
import { reducer as VideoPlayerReducer } from "./video-room/video-player";
import { reducer as VideoRoomReducer } from "./video-room/video-room";

export const reducer = combineReducers({
    room: VideoRoomReducer,
    player: VideoPlayerReducer
});
