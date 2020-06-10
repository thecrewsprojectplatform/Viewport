import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import { userClosedBrowser, removeRoom, getRoomsAction, VideoRoomState, Status, removeUser } from "../../store/video-room/video-room";
import { ApiContext } from "..";
import { VideoRoomApi } from "../../api/video-room-api";
import { store } from "../../store";
import { User, Room } from "../../api/video-room-types";
import { RoomListR } from "./room-list";
import { socket } from "../../App"
import NavBar from "../nav-bar";

/**
 * Represents the required properties of the JoinCreateRoomPage.
 */
export interface Prop {
    users: User[];
    roomList: Room[];
    currentUser: User;
    updateStatus: Status;
    userListDisconnect: User[];
    setPageForward: () => void;
    setPageBackwards: () => void;
}

/**
 * Represents the join/create room page. Users input a room name into a textbox
 * if they want to create a room and join it. The current list of available rooms
 * is displayed so users can also join already existing rooms.
 *
 * @param {Object} props An object representing the require properties of
 *                 the join/create room page. Contains a list of rooms,
 *                 the current user, the current update status, and a
 *                 setPage function.
 * @returns {JSX.Element} The JSX representing the join/create room page.
 */
const JoinCreateRoomPage = (props: Prop) => {
    const api = useContext<VideoRoomApi>(ApiContext);

    useEffect(() => {
        store.dispatch(getRoomsAction(api))
    }, []);

    const logoutClick = (): void => {
        store.dispatch(removeUser(api, props.currentUser.id));
        props.setPageBackwards()
    }

    socket.on('clientDisconnectedUpdateRoomList', data => {
        if (props.userListDisconnect.length === 0) {
            console.log('remove room', data.currentRoomId)
            store.dispatch(removeRoom(api, data.currentRoomId));
        }
    });

    return (
        <div>
            {NavBar("Logout", logoutClick)}
            <RoomListR setPageForward={props.setPageForward}/>
        </div>
    )
}

/**
 * Used to connect the state of the overall front end to the JoinCreateRoomPage.
 *
 * @param {Object} state The current state of the JoinCreateRoomPage.
 */
const mapStateToProps = (state: VideoRoomState) => {
    return {
        users: state.users,
        roomList: state.roomList,
        currentUser: state.user,
        updateStatus: state.updateStatus,
        userListDisconnect: state.userListDisconnect
    }
}

export const JoinCreateRoomPageR = connect(mapStateToProps)(JoinCreateRoomPage);
