import React, { useEffect, useContext, useState } from "react";
import { connect } from "react-redux";
import { createRoomAction, getRoomsAction, VideoRoomState, Status } from "../../store/video-room/video-room";
import { ApiContext } from "..";
import { VideoRoomApi } from "../../api/video-room-api";
import { store } from "../../store";
import { UserListR } from "../video-room/user-list";
import { User, Room } from "../../api/video-room-types";
import { RoomListR } from "./room-list";

/**
 * Represents the required properties of the JoinCreateRoomPage.
 */
export interface Prop {
    roomList: Room[];
    currentUser: User;
    updateStatus: Status;
    setPage: () => void;
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

    return (
        <div>
            <span>Join or Create page!</span>
            <RoomListR setPage={props.setPage}/>
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