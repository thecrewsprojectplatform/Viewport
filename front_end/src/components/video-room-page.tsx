import React, { useEffect, useContext, useState } from "react";
import { connect } from "react-redux";
import { createRoomAction, getRoomUsers, VideoRoomState } from "../store/video-room/video-room";
import { ApiContext } from "./video-room";
import { VideoRoomApi } from "../api/video-room-api";
import { store } from "../store";
import { UserListR } from "./video-room/user-list";
import { Room, User } from "../api/video-room-types";

export interface Prop {
    room: Room
    currentUsers: User[];
}

const VideoRoomPage = (props: Prop) => {
    const api = useContext<VideoRoomApi>(ApiContext);

    useEffect(() => {
        console.log(api);
        console.log(props.room);
        if (props.room) {
            store.dispatch(getRoomUsers(api, props.room.id));
        }
    }, [props.room])

    console.log("Users!!");
    console.log(props.room);
    console.log(props.currentUsers);
    return (
        <div className="row">
        <span className="Video-section">YouTube videos go here</span>
        <UserListR />
        </div>
    )
}

const mapStateToProps = (state: VideoRoomState) => {
    console.log(state);
    return {
        room: state.currentRoom,
        currentUsers: state.users,
        updateStatus: state.updateStatus,
    }
}

export const VideoRoomPageR = connect(mapStateToProps)(VideoRoomPage);