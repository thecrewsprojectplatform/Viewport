import { combineReducers } from "redux";
import { reducer as VideoRoomReducer } from "./video-room/video-room";
import { reducer as NotificationReducer } from "./notifications/notifications";

export const reducer = combineReducers({
    notifications: NotificationReducer,
    videoRoom: VideoRoomReducer,
});
