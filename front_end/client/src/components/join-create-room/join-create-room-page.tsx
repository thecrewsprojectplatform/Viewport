import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { removeRoom, closedBrowserUserList, getRoomsAction, VideoRoomState, Status, removeUser } from "../../store/video-room/video-room";
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
    const history = useHistory();

    const logoutClick = (): void => {
        store.dispatch(removeUser(api, props.currentUser.id));
        history.push("/");
    }

    useEffect(() => {
        store.dispatch(getRoomsAction(api))
    }, []);

    socket.on('clientDisconnectedUpdateUserList', data => {
        api.removeUserFromRoom(data.currentRoomId, data.currentUserId).then(() => {
            store.dispatch(closedBrowserUserList(api, data.currentRoomId));
        }).finally(() => {
            api.getUsersInRoom(data.currentRoomId).then(users => {
                if (users.length === 0) {
                    store.dispatch(removeRoom(api, data.currentRoomId));
                }
            })
        })
        api.removeUser(data.currentUserId)
    });

    return (
        <div>
            <NavBar
                buttonName="Logout"
                buttonOnClick={logoutClick}
            />
            <RoomListR />
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
    }
}

export const JoinCreateRoomPageR = connect(mapStateToProps)(JoinCreateRoomPage);
