import { ActionType } from "./actionType";
import { produce } from "immer";
import { VideoRoomApi } from "../../api/video-room-api";
import { User } from "../../api/video-room-types";

export enum Status {
    NotStarted="NOT_STARTED",
    Running="RUNNING",
    Succeeded="SUCCEEDED",
    Failed="FAILED",
}

export interface VideoRoomState {
    roomId: number;
    roomName: string;
    users: User[];
    fetchStatus: Status;
    updateStatus: Status;
}

interface SetVidoRoomAction {
    type: ActionType.SetVideoRoom;
    name: string;
    id: number;
}

interface SetVidoRoomUsersAction {
    type: ActionType.SetVideoRoomUsers;
    users: User[];
}

interface CreateUserAndAddToRoomAction {
    type: ActionType.CreateUserAndAddToRoom;
}

interface CreateUserAndAddToRoomSuccessAction {
    type: ActionType.CreateUserAndAddToRoomSuccess;
}

interface CreateUserAndAddToRoomFailAction {
    type: ActionType.CreateUserAndAddToRoomFail;
}

interface RemoveUserFromRoomAction {
    type: ActionType.RemoveUserFromRoom;
}

interface RemoveUserFromRoomSuccessAction {
    type: ActionType.RemoveUserFromRoomSuccess;
}

interface RemoveUserFromRoomFailAction {
    type: ActionType.RemoveUserFromRoomFail;
}

type Action =   SetVidoRoomAction |
                SetVidoRoomUsersAction |
                CreateUserAndAddToRoomAction |
                CreateUserAndAddToRoomSuccessAction |
                CreateUserAndAddToRoomFailAction |
                RemoveUserFromRoomAction |
                RemoveUserFromRoomSuccessAction |
                RemoveUserFromRoomFailAction;

export const reducer = (
    state: VideoRoomState = {
        roomId: null,
        roomName: null,
        users: [],
        fetchStatus: Status.NotStarted,
        updateStatus: Status.NotStarted,
    }, action: Action
): VideoRoomState => {
    switch (action.type) {
        case ActionType.SetVideoRoom:
            return produce(state, draftState => {
                draftState.roomId = action.id;
                draftState.roomName = action.name;
            });
        case ActionType.SetVideoRoomUsers:
            return produce(state, draftState => {
                draftState.users = action.users;
            })
        case ActionType.CreateUserAndAddToRoom:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Running;
            })
        case ActionType.CreateUserAndAddToRoomSuccess:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Succeeded;
            })
        case ActionType.CreateUserAndAddToRoomFail:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Failed;
            })
        case ActionType.RemoveUserFromRoom:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Running;
            })
        case ActionType.RemoveUserFromRoomSuccess:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Succeeded;
            })
        case ActionType.RemoveUserFromRoomFail:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Failed;
            })
        default:
            return state;
    }
}

export const createRoomAction = (api: VideoRoomApi, roomName: string): any => {
    return (dispatch): any => {
        api.createRoom(roomName).then(room => {
            dispatch({
                type: ActionType.SetVideoRoom,
                id: room.id,
                name: room.name,
            } as SetVidoRoomAction);
        }).catch(err => {
            console.log("Failed to create room");
        });
    };
};

export const getRoomUsers = (api: VideoRoomApi, roomId: number): any => {
    return (dispatch): any => {
        api.getUsersInRoom(roomId).then(users => {
            dispatch({
                type: ActionType.SetVideoRoomUsers,
                users: users,
            } as SetVidoRoomUsersAction);
        }).catch(err => {
            console.log("Failed to get users in room");
        });
    };
};

export const createUserAndAddToRoom = (api: VideoRoomApi, roomId: number, userName: string): any => {
    return (dispatch): any => {
        dispatch({
            type: ActionType.CreateUserAndAddToRoom,
        } as CreateUserAndAddToRoomAction);
        api.createUser(userName).then(user => {
            api.addUserToRoom(roomId, user.id).then(response => {
                dispatch({
                    type: ActionType.CreateUserAndAddToRoomSuccess,
                } as CreateUserAndAddToRoomSuccessAction);
            })
        }).catch(err => {
            dispatch({
                type: ActionType.CreateUserAndAddToRoomFail
            } as CreateUserAndAddToRoomFailAction);
        });
    };
}

export const removeUserFromRoom = (api: VideoRoomApi, roomId: number, userId: number): any => {
    return (dispatch): any => {
        dispatch({
            type: ActionType.RemoveUserFromRoom,
        } as RemoveUserFromRoomAction);
        api.removeUserFromRoom(roomId, userId).then(response => {
            console.log("removed user successfully")
            dispatch({
                type: ActionType.RemoveUserFromRoomSuccess,
            } as RemoveUserFromRoomSuccessAction);
        }).catch(err => {
            dispatch({
                type: ActionType.RemoveUserFromRoomFail
            } as RemoveUserFromRoomFailAction);
        });
    };
};