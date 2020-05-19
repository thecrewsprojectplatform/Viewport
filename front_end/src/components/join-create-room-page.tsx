import React, { useEffect, useContext, useState } from "react";
import { connect } from "react-redux";
import { createRoomAction, getRoomsAction, VideoRoomState, Status } from "../store/video-room/video-room";
import { ApiContext } from "./video-room";
import { VideoRoomApi } from "../api/video-room-api";
import { store } from "../store";
import { UserListR } from "./video-room/user-list";
import { User, Room } from "../api/video-room-types";
import { RoomListR } from "./room-list";

export interface Prop {
    roomList: Room[];
    currentUser: User;
    updateStatus: Status;
    setPage: () => void;
}

const JoinCreateRoomPage = (props: Prop) => {
    const api = useContext<VideoRoomApi>(ApiContext);

    useEffect(() => {
        // code goes here
        store.dispatch(getRoomsAction(api))
    }, []);

    /*
    const createNewRoomClick = (): void => {
        console.log("Created new room!")
    }
    */

    console.log(props.roomList);
    console.log(props.currentUser);
    return (
        <div>
            <span>Join or Create page!</span>
            <RoomListR setPage={props.setPage}/>
        </div>
    )
}

const mapStateToProps = (state: VideoRoomState) => {
    return {
        roomList: state.roomList,
        currentUser: state.user,
        updateStatus: state.updateStatus,
    }
}

export const JoinCreateRoomPageR = connect(mapStateToProps)(JoinCreateRoomPage);