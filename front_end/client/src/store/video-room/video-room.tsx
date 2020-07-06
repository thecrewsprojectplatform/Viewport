import { ActionType } from "./actionType";
import { produce } from "immer";
import { VideoRoomApi } from "../../api/video-room-api";
import { User, Room, MessageDetail } from "../../api/video-room-types";
import { socket } from "../../App"

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
    pastRoomId: number;
    user: User;
    users: User[];
    clientMessage: string;
    clientName: string;
    msgTime: string;
    messageHistory: MessageDetail[];
    currentUser: User;
    fetchStatus: Status;
    updateStatus: Status;
}

export interface SetVidoRoomUsersAction {
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

interface SendToAllClientsAction {
    type: ActionType.SendMessageToAllClients;
    clientName: string;
    clientMessage: string;
    msgTime: string;
}

interface SendInitialClientMessageAction {
    type: ActionType.SendInitialClientMessage;
    clientMessage: string;
    msgTime: string;
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
    user: User;
    roomId: number;
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

interface EditUserNameAction {
    type: ActionType.EditUserName;
}

interface EditUserNameSuccessAction {
    type: ActionType.EditUserNameSuccess;
    user: User;
}

interface EditUserNameFailAction {
    type: ActionType.EditUserNameFail;
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
    pastRoomId: number;
    messageHistory: MessageDetail[];
    roomId: number;
    users: User[];
}

interface RemoveUserFromRoomFailAction {
    type: ActionType.RemoveUserFromRoomFail;
}

interface RemoveUserAfterBrowserCloseAction {
    type: ActionType.RemoveUserAfterBrowserClose;
}

interface RemoveUserAfterBrowserCloseSuccessAction {
    type: ActionType.RemoveUserAfterBrowserCloseSuccess;
    pastRoomId: number;
    messageHistory: MessageDetail[];
    currentRoom: Room;
    roomId: number;
    users: User[];
}

interface RemoveUserAfterBrowserCloseFailAction {
    type: ActionType.RemoveUserAfterBrowserCloseFail;
}

export interface Actions {
    SetVidoRoomUsersAction: SetVidoRoomUsersAction
    GetRoomsAction: GetRoomsAction
    GetRoomsSuccessAction: GetRoomsSuccessAction
    GetRoomsFailAction: GetRoomsFailAction
    AddUserToRoomAction: AddUserToRoomAction
    AddUserToRoomSuccessAction: AddUserToRoomSuccessAction
    AddUserToRoomFailAction: AddUserToRoomFailAction
    SendToAllClientsAction: SendToAllClientsAction
    SendInitialClientMessageAction: SendInitialClientMessageAction
    CreateRoomAndAddUserToRoomAction: CreateRoomAndAddUserToRoomAction
    CreateRoomAndAddUserToRoomSuccessAction: CreateRoomAndAddUserToRoomSuccessAction
    CreateRoomAndAddUserToRoomFailAction: CreateUserAndAddToRoomFailAction
    CreateUserAndAddToRoomAction: CreateUserAndAddToRoomAction
    CreateUserAndAddToRoomSuccessAction: CreateUserAndAddToRoomSuccessAction
    CreateUserAndAddToRoomFailAction: CreateUserAndAddToRoomFailAction
    CreateUserAction: CreateUserAction
    CreateUserSuccessAction: CreateUserSuccessAction
    CreateUserFailAction: CreateUserFailAction
    RemoveUserAction: RemoveUserAction
    RemoveUserSuccessAction: RemoveUserSuccessAction
    RemoveUserFailAction: RemoveUserFailAction
    RemoveRoomAction: RemoveRoomAction
    RemoveRoomSuccessAction: RemoveRoomSuccessAction
    RemoveRoomFailAction: RemoveRoomFailAction
    RemoveUserFromRoomAction: RemoveUserFromRoomAction
    RemoveUserFromRoomSuccessAction: RemoveUserFromRoomSuccessAction
    RemoveUserFromRoomFailAction: RemoveUserFromRoomFailAction
    RemoveUserAfterBrowserCloseAction: RemoveUserAfterBrowserCloseAction
    RemoveUserAfterBrowserCloseSuccessAction: RemoveUserAfterBrowserCloseSuccessAction
    RemoveUserAfterBrowserCloseFailAction: RemoveUserAfterBrowserCloseFailAction
    EditUserNameAction: EditUserNameAction
    EditUserNameSuccessAction: EditUserNameSuccessAction
    EditUserNameFailAction: EditUserNameFailAction
}

type Action =   SetVidoRoomUsersAction |
                GetRoomsAction |
                GetRoomsSuccessAction |
                GetRoomsFailAction |
                AddUserToRoomAction |
                AddUserToRoomSuccessAction |
                AddUserToRoomFailAction |
                SendToAllClientsAction |
                SendInitialClientMessageAction |
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
                RemoveUserFromRoomFailAction |
                RemoveUserAfterBrowserCloseAction |
                RemoveUserAfterBrowserCloseSuccessAction |
                RemoveUserAfterBrowserCloseFailAction |
                EditUserNameAction |
                EditUserNameSuccessAction |
                EditUserNameFailAction;

export const reducer = (
    state: VideoRoomState = {
        roomId: null,
        roomName: null,
        roomList: [],
        currentRoom: null,
        pastRoomId: null,
        user: null,
        users: [],
        clientMessage: null,
        clientName: null,
        msgTime: null,
        messageHistory: [],
        currentUser: null,
        fetchStatus: Status.NotStarted,
        updateStatus: Status.NotStarted,
    }, action: Action
): VideoRoomState => {
    switch (action.type) {
        case ActionType.SetVideoRoomUsers:
            return produce(state, draftState => {
                draftState.users = action.users;
            });
        case ActionType.AddUserToRoom:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Running;
            });
        case ActionType.AddUserToRoomSuccess:
            socket.emit('joinRoom', {
                roomId: action.roomId,
            });
            return produce(state, draftState => {
                draftState.updateStatus = Status.Succeeded;
                draftState.currentRoom = action.room;
                draftState.roomId = action.roomId;
            });
        case ActionType.AddUserToRoomFail:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Failed;
            });
        case ActionType.GetRooms:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Running;
            });
        case ActionType.GetRoomsSuccess:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Succeeded;
                draftState.roomList = action.roomsList;
            });
        case ActionType.GetRoomsFail:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Failed;
            });
        case ActionType.CreateRoomAndAddUserToRoom:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Running
            });
        case ActionType.CreateRoomAndAddUserToRoomSuccess:
            socket.emit('joinRoom', {
                roomId: action.roomId,
            });
            return produce(state, draftState => {
                draftState.updateStatus = Status.Succeeded;
                draftState.currentRoom = action.room;
                draftState.roomId = action.roomId;
            });
        case ActionType.CreateRoomAndAddUserToRoomFail:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Failed;
            });
        case ActionType.CreateUserAndAddToRoom:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Running;
            });
        case ActionType.CreateUserAndAddToRoomSuccess:
            socket.emit('joinRoom', { 
                roomId: action.roomId,
            });
            return produce(state, draftState => {
                draftState.updateStatus = Status.Succeeded;
                draftState.user = action.user;
                draftState.currentRoom = state.roomList.find((room) => room.id == action.roomId);
            });
        case ActionType.CreateUserAndAddToRoomFail:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Failed;
            });
        case ActionType.CreateUser:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Running;
            });
        case ActionType.CreateUserSuccess:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Succeeded;
                draftState.user = action.user;
            });
        case ActionType.CreateUserFail:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Failed;
            });
        case ActionType.EditUserName:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Running;
            });
        case ActionType.EditUserNameSuccess:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Succeeded;
                draftState.user = action.user;
                draftState.users = state.users.filter((user) => user.id !== action.user.id).concat([action.user]);
            });
        case ActionType.EditUserNameFail:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Failed;
            })
        case ActionType.RemoveUser:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Running;
            });
        case ActionType.RemoveUserSuccess:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Succeeded;
                draftState.user = action.user;
            });
        case ActionType.RemoveUserFail:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Failed;
            });
        case ActionType.RemoveRoom:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Running;
            });
        case ActionType.RemoveRoomSuccess:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Succeeded;
                draftState.currentRoom = null;
            });
        case ActionType.RemoveRoomFail:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Failed;
            });
        case ActionType.RemoveUserFromRoom:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Running;
            });
        case ActionType.RemoveUserFromRoomSuccess:
            socket.emit('leaveRoom', {
                roomId: action.pastRoomId,
            });
            return produce(state, draftState => {
                draftState.updateStatus = Status.Succeeded;
                draftState.currentRoom = null;
                draftState.messageHistory = action.messageHistory;
                draftState.roomId = action.roomId;
                draftState.users = action.users;
            });
        case ActionType.RemoveUserFromRoomFail:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Failed;
            })
        case ActionType.SendInitialClientMessage:
            socket.emit('clientMessageToServer', {
                clientMessage: action.clientMessage,
                msgTime: action.msgTime,
                currentRoomId: state.currentRoom.id,
                clientId: state.user.id,
                clientName: state.user.name
            });
            return produce(state, draftState => {
                draftState.clientMessage = action.clientMessage;
            });
        case ActionType.SendMessageToAllClients:
            return produce(state, draftState => {
                draftState.clientMessage = action.clientMessage;
                draftState.clientName = action.clientName;
                draftState.msgTime = action.msgTime;
                draftState.messageHistory = [...state.messageHistory, {
                    chat_message: action.clientMessage,
                    chat_username: action.clientName,
                    message_time: action.msgTime
                }];
            });
        case ActionType.RemoveUserAfterBrowserClose:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Running;
            });
        case ActionType.RemoveUserAfterBrowserCloseSuccess:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Succeeded;
            });
        case ActionType.RemoveUserAfterBrowserCloseFail:
            return produce(state, draftState => {
                draftState.updateStatus = Status.Failed;
            });
        default:
            return state;
    }
}

export const getRoomsAction = (api: VideoRoomApi): any => {
    return (dispatch): any => {
        dispatch({
            type: ActionType.GetRooms,
        } as GetRoomsAction);
        api.getRooms().then(roomsList => {
            socket.emit('updateRoomsToServerRoomList', {
                roomsList: roomsList
            });
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
        }).finally(() => {
            api.getRooms().then(roomsList => {
                socket.emit('updateRoomsToServerRoomList', {
                    roomsList: roomsList
                })
            });
        });
    };
};

export const getRoomUsers = (api: VideoRoomApi, roomId: number): any => {
    return (dispatch): any => {
        api.getUsersInRoom(roomId).then(users => {
            socket.emit('getCurrentRoom', {
                currentRoomId: roomId
            });
            socket.emit('updateUserToServerUserList', {
                currentRoomId: roomId,
                clientList: users
            })
        }).catch(err => {
            console.log("Failed to get the list of users in room");
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
                    user: user,
                    roomId: roomId,
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
            socket.emit('getCurrentUser', {
                currentUser: user
            });
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

export const editUserName = (api: VideoRoomApi, userId: number, newUserName: string): any => {
    return (dispatch): any => {
        dispatch({
            type: ActionType.EditUserName,
        } as EditUserNameAction);
        api.updateUser(userId, newUserName).then(user => {
            socket.emit('getCurrentUser', {
                currentUser: user
            });
            dispatch({
                type: ActionType.EditUserNameSuccess,
                user: user,
            } as EditUserNameSuccessAction);
        }).catch(err => {
            dispatch({
                type: ActionType.EditUserNameFail
            } as EditUserNameFailAction);
        });
    };
};

export const removeUser = (api: VideoRoomApi, userId: number): any => {
    return (dispatch): any => {
        dispatch({
            type: ActionType.RemoveUser,
        } as RemoveUserAction);
        api.removeUser(userId).then(response => {
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
            dispatch({
                type: ActionType.RemoveRoomSuccess,
            } as RemoveRoomSuccessAction);
        }).catch(err => {
            dispatch({
                type: ActionType.RemoveRoomFail
            } as RemoveRoomFailAction);
        }).finally(() => {
            api.getRooms().then(roomsList => {
                socket.emit('updateRoomsToServerRoomList', {
                    roomsList: roomsList
                })
            });
        });
    };
};

export const removeUserFromRoom = (api: VideoRoomApi, roomId: number, userId: number): any => {
    return (dispatch): any => {
        dispatch({
            type: ActionType.RemoveUserFromRoom,
        } as RemoveUserFromRoomAction);
        api.removeUserFromRoom(roomId, userId).then(response => {
            dispatch({
                type: ActionType.RemoveUserFromRoomSuccess,
                pastRoomId: roomId,
                currentRoom: null,
                roomId: null,
                messageHistory: [],
                users: [],
            } as RemoveUserFromRoomSuccessAction);
        }).catch(err => {
            dispatch({
                type: ActionType.RemoveUserFromRoomFail
            } as RemoveUserFromRoomFailAction);
        }).finally(() => {
            api.getUsersInRoom(roomId).then(users => {
                socket.emit('updateUserToServerUserList', {
                    currentRoomId: roomId,
                    clientList: users
                });
                socket.emit('updateUserListDisconnected', {
                    userListDisconnect: users
                })
            });
        });
    };
};


export const sendMessageToAllClients = (message: string, username: string, msgTime: string): any => {
    return (dispatch): any => {
        dispatch ({
            type: ActionType.SendMessageToAllClients,
            clientMessage: message,
            clientName: username,
            msgTime: msgTime
        });
    }
}

export const sendMessageToServer = (message: string, msgTime: string): any => {
    return (dispatch): any => {
        dispatch({
            type: ActionType.SendInitialClientMessage,
            clientMessage: message,
            msgTime: msgTime
        })
    }
}

export const closedBrowserUserList = (api: VideoRoomApi, roomId: number): any => {
    return (dispatch): any => {
        dispatch({
            type: ActionType.RemoveUserAfterBrowserClose,
        } as RemoveUserAfterBrowserCloseAction);
        api.getUsersInRoom(roomId).then(users => {
            socket.emit('updateUserToServerUserList', {
                currentRoomId: roomId,
                clientList: users
            })
        }).catch(err => {
            dispatch({
                type: ActionType.RemoveUserAfterBrowserCloseFail
            } as RemoveUserAfterBrowserCloseFailAction);
        });
    };
}

