import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import { getRoomsAction, VideoRoomState, Status, removeUser } from "../../store/video-room/video-room";
import { ApiContext } from "..";
import { VideoRoomApi } from "../../api/video-room-api";
import { store } from "../../store";
import { User, Room } from "../../api/video-room-types";
import { RoomListR } from "./room-list";

/**
 * Represents the required properties of the JoinCreateRoomPage.
 */
export interface Prop {
    roomList: Room[];
    currentUser: User;
    updateStatus: Status;
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

    return (
        <div>
            <button
                className="Logout-button"
                onClick={(ev) => {
                    logoutClick()
                }
            }>
                Logout
            </button>
            <p>Join or Create page!</p>
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
        roomList: state.roomList,
        currentUser: state.user,
        updateStatus: state.updateStatus,
    }
}

export const JoinCreateRoomPageR = connect(mapStateToProps)(JoinCreateRoomPage);