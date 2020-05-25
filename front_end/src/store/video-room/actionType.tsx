export enum ActionType {
    SetVideoRoom="SET_VIDEO_ROOM",
    SetVideoRoomUsers="SET_VIDEO_ROOM_USERS",
    AddUserToRoom="ADD_USER_TO_ROOM",
    AddUserToRoomSuccess="ADD_USER_TO_ROOM_SUCCESS",
    AddUserToRoomFail="ADD_USER_TO_ROOM_FAIL",
    GetRooms="GET_ROOMS",
    GetRoomsSuccess="GET_ROOMS_SUCCESS",
    GetRoomsFail="GET_ROOMS_FAIL",
    CreateRoomAndAddUserToRoom="CREATE_ROOM_AND_ADD_USER_TO_ROOM", 
    CreateRoomAndAddUserToRoomSuccess="CREATE_ROOM_AND_ADD_USER_TO_ROOM_SUCCESS",
    CreateRoomAndAddUserToRoomFail="CREATE_ROOM_AND_ADD_USER_TO_ROOM_FAIL",
    CreateUserAndAddToRoom="CREATE_USER_AND_ADD_TO_ROOM",
    CreateUserAndAddToRoomSuccess="CREATE_USER_AND_ADD_TO_ROOM_SUCCESS",
    CreateUserAndAddToRoomFail="CREATE_USER_AND_ADD_TO_ROOM_FAIL",
    CreateUser="CREATE_USER",
    CreateUserSuccess="CREATE_USER_SUCCESS",
    CreateUserFail="CREATE_USER_FAIL",
    RemoveUser="REMOVE_USER",
    RemoveUserSuccess="REMOVE_USER_SUCCESS",
    RemoveUserFail="REMOVE_USER_FAIL", 
    RemoveUserFromRoom="REMOVE_USER_FROM_ROOM",
    RemoveUserFromRoomSuccess="REMOVE_USER_FROM_ROOM_SUCCESS",
    RemoveUserFromRoomFail="REMOVE_USER_FROM_ROOM_FAIL",
}