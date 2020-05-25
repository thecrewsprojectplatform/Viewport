import { ActionType } from "./actionType";
import { produce } from "immer";
import { VideoRoomApi } from "../../api/video-room-api";
import { User, Room } from "../../api/video-room-types";

export enum Status {
    NotStarted="NOT_STARTED",
    Running="RUNNING",
    Succeeded="SUCCEEDED",
    Failed="FAILED",
}

export interface VideoRoomState {
    roomId: number;
    roomName: string;
    roomList: Room[];
    currentRoom: Room;
    user: User;
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

interface GetRoomsAction {
    type: ActionType.GetRooms;
}

interface GetRoomsSuccessAction {
    type: ActionType.GetRoomsSuccess;
    roomsList: Room[];
}

interface GetRoomsFailAction {
    type: ActionType.GetRoomsFail;
}

interface AddUserToRoomAction {
    type: ActionType.AddUserToRoom;
}

interface AddUserToRoomSuccessAction {
    type: ActionType.AddUserToRoomSuccess;
    room: Room;
    roomId: number;
}

interface AddUserToRoomFailAction {
    type: ActionType.AddUserToRoomFail;
}

interface CreateRoomAndAddUserToRoomAction {
    type: ActionType.CreateRoomAndAddUserToRoom;
}

interface CreateRoomAndAddUserToRoomSuccessAction {
    type: ActionType.CreateRoomAndAddUserToRoomSuccess;
    room: Room;
    roomId: number;
}

interface CreateRoomAndAddUserToRoomFailAction {
    type: ActionType.CreateRoomAndAddUserToRoomFail;
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

interface CreateUserAction {
    type: ActionType.CreateUser;
}

interface CreateUserSuccessAction {
    type: ActionType.CreateUserSuccess;
    user: User;
}

interface CreateUserFailAction {
    type: ActionType.CreateUserFail;
}

interface RemoveUserAction {
    type: ActionType.RemoveUser;
}

interface RemoveUserSuccessAction {
    type: ActionType.RemoveUserSuccess;
    user: User;
}

interface RemoveUserFailAction {
    type: ActionType.RemoveUserFail;
}

interface RemoveRoomAction {
    type: ActionType.RemoveRoom;
}

interface RemoveRoomSuccessAction {
    type: ActionType.RemoveRoomSuccess;
}

interface RemoveRoomFailAction {
    type: ActionType.RemoveRoomFail;
}

interface RemoveUserFromRoomAction {
    type: ActionType.RemoveUserFromRoom;
}

interface RemoveUserFromRoomSuccessAction {
    type: ActionType.RemoveUserFromRoomSuccess;
    currentRoom: Room;
    roomId: number;
    users: User[];
}

interface RemoveUserFromRoomFailAction {
    type: ActionType.RemoveUserFromRoomFail;
}

type Action =   SetVidoRoomAction |
                SetVidoRoomUsersAction |
                GetRoomsAction |
                GetRoomsSuccessAction |
                GetRoomsFailAction |
                AddUserToRoomAction |
                AddUserToRoomSuccessAction |
                AddUserToRoomFailAction |
                CreateRoomAndAddUserToRoomAction |
                CreateRoomAndAddUserToRoomSuccessAction |
                CreateRoomAndAddUserToRoomFailAction |
                CreateUserAndAddToRoomAction |
                CreateUserAndAddToRoomSuccessAction |
                CreateUserAndAddToRoomFailAction |
                CreateUserAction |
                CreateUserSuccessAction |
                CreateUserFailAction |
                RemoveUserAction |
                RemoveUserSuccessAction |
                RemoveUserFailAction |
                RemoveRoomAction |
                RemoveRoomSuccessAction |
                RemoveRoomFailAction |
                RemoveUserFromRoomAction |
                RemoveUserFromRoomSuccessAction |
                RemoveUserFromRoomFailAction;

export const reducer = (
    state: VideoRoomState = {
        roomId: null,
        roomName: null,
        roomList: [],
        currentRoom: null,
        user: null,
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
        case ActionType.AddUserToRoom:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Running;
            })
        case ActionType.AddUserToRoomSuccess:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Succeeded;
                draftState.currentRoom = action.room;
                draftState.roomId = action.roomId;
            })
        case ActionType.AddUserToRoomFail:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Failed;
            })
        case ActionType.GetRooms:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Running;
            })
        case ActionType.GetRoomsSuccess:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Succeeded;
                draftState.roomList = action.roomsList;
            })
        case ActionType.GetRoomsFail:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Failed;
            })
        case ActionType.CreateRoomAndAddUserToRoom:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Running
            })  
        case ActionType.CreateRoomAndAddUserToRoomSuccess:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Succeeded;
                draftState.currentRoom = action.room;
                draftState.roomId = action.roomId;
            })    
        case ActionType.CreateRoomAndAddUserToRoomFail:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Failed;
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
        case ActionType.CreateUser:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Running;
            })
        case ActionType.CreateUserSuccess:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Succeeded;
                draftState.user = action.user;
            })
        case ActionType.CreateUserFail:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Failed;
            })
        case ActionType.RemoveUser:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Running;
            })
        case ActionType.RemoveUserSuccess:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Succeeded;
                draftState.user = action.user;
            })
        case ActionType.RemoveUserFail:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Failed;
            })
        case ActionType.RemoveRoom:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Running;
            })
        case ActionType.RemoveRoomSuccess:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Succeeded;
            })
        case ActionType.RemoveRoomFail:
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
                draftState.currentRoom = action.currentRoom;
                draftState.roomId = action.roomId;
                draftState.users = action.users;
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

export const getRoomsAction = (api: VideoRoomApi): any => {
    return (dispatch): any => {
        dispatch({
            type: ActionType.GetRooms,
        } as GetRoomsAction);
        api.getRooms().then(roomsList => {
            dispatch({
                type: ActionType.GetRoomsSuccess,
                roomsList: roomsList,
            } as GetRoomsSuccessAction);
        }).catch(err => {
            dispatch({
                type: ActionType.GetRoomsFail
            } as GetRoomsFailAction);
        });
    };
};

export const addUserToRoomAction = (api: VideoRoomApi, roomId: number, userId: number, roomList: Room[]): any => {
    return (dispatch): any => {
        dispatch({
            type: ActionType.AddUserToRoom,
        } as AddUserToRoomAction);
        api.addUserToRoom(roomId, userId).then(response => {
            dispatch({
                type: ActionType.AddUserToRoomSuccess,
                room: roomList.find((room) => roomId === room.id),
                roomId: roomId,
            } as AddUserToRoomSuccessAction);
        }).catch(err => {
            dispatch({
                type: ActionType.AddUserToRoomFail
            } as AddUserToRoomFailAction);
        });
    };
};

export const createRoomAndAddUserToRoomAction = (api: VideoRoomApi, roomName: string, userId: number): any => {
    return (dispatch): any => {
        dispatch({
            type: ActionType.CreateRoomAndAddUserToRoom,
        } as CreateRoomAndAddUserToRoomAction);
        api.createRoom(roomName).then(room => {
            api.addUserToRoom(room.id, userId).then(response => {
                dispatch({
                    type: ActionType.CreateRoomAndAddUserToRoomSuccess,
                    room: room,
                    roomId: room.id,
                } as CreateRoomAndAddUserToRoomSuccessAction);
            })
        }).catch(err => {
            dispatch({
                type: ActionType.CreateRoomAndAddUserToRoomFail
            } as CreateRoomAndAddUserToRoomFailAction);
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
};

export const createUser = (api: VideoRoomApi, userName: string): any => {
    return (dispatch): any => {
        dispatch({
            type: ActionType.CreateUser,
        } as CreateUserAction);
        api.createUser(userName).then(user => {
            dispatch({
                type: ActionType.CreateUserSuccess,
                user: user,
            } as CreateUserSuccessAction);
        }).catch(err => {
            dispatch({
                type: ActionType.CreateUserFail
            } as CreateUserFailAction);
        });
    };
};

export const removeUser = (api: VideoRoomApi, userId: number): any => {
    return (dispatch): any => {
        dispatch({
            type: ActionType.RemoveUser,
        } as RemoveUserAction);
        api.removeUser(userId).then(response => {
            console.log("removed user successfully")
            dispatch({
                type: ActionType.RemoveUserSuccess,
                user: null,
            } as RemoveUserSuccessAction);
        }).catch(err => {
            dispatch({
                type: ActionType.RemoveUserFail
            } as RemoveUserFailAction);
        });
    };
};

export const removeRoom = (api: VideoRoomApi, roomId: number): any => {
    return (dispatch): any => {
        dispatch({
            type: ActionType.RemoveRoom,
        } as RemoveRoomAction);
        api.removeRoom(roomId).then(response => {
            console.log("removed room successfully")
            dispatch({
                type: ActionType.RemoveRoomSuccess,
            } as RemoveRoomSuccessAction);
        }).catch(err => {
            dispatch({
                type: ActionType.RemoveRoomFail
            } as RemoveRoomFailAction);
        });
    };
};

export const removeUserFromRoom = (api: VideoRoomApi, roomId: number, userId: number): any => {
    return (dispatch): any => {
        dispatch({
            type: ActionType.RemoveUserFromRoom,
        } as RemoveUserFromRoomAction);
        api.removeUserFromRoom(roomId, userId).then(response => {
            console.log("removed user successfully")
            dispatch({
                type: ActionType.RemoveUserFromRoomSuccess,
                currentRoom: null,
                roomId: null,
                users: [],
            } as RemoveUserFromRoomSuccessAction);
        }).catch(err => {
            dispatch({
                type: ActionType.RemoveUserFromRoomFail
            } as RemoveUserFromRoomFailAction);
        });
    };
};