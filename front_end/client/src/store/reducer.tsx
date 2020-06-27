import { combineReducers } from 'redux'
import { reducer as VideoRoomReducer } from "./video-room/video-room";
import { reducer as VideoPlayerReducer } from "./video-room/video-player";

export const reducer = combineReducers({
    room: VideoRoomReducer,
    player: VideoPlayerReducer
});
