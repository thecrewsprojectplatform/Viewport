import React, { useEffect, useContext, useState } from "react";
import { connect } from "react-redux";
import { createRoomAction, getRoomUsers, VideoRoomState } from "../../store/video-room/video-room";
import { ApiContext } from "..";
import { VideoRoomApi } from "../../api/video-room-api";
import { store } from "../../store";
import { UserListR } from "./user-list";
import { Room, User } from "../../api/video-room-types";
import ChatApp from "./chat-app"

/**
 * Represents the required properties of the VideoRoomPage.
 */
export interface Prop {
    room: Room
    currentUsers: User[];
}

/**
 * Represents the video room page. Users go to this page to watch videos.
 * The current list of Users in the room is displayed.
 * 
 * @param {Object} props An object representing the require properties of
 *                 the video room page. Contains a the current Room, and
 *                 the current users in the room.
 * @returns {JSX.Element} The JSX representing the video room page.
 */
const VideoRoomPage = (props: Prop) => {
    const api = useContext<VideoRoomApi>(ApiContext);

    useEffect(() => {
        if (props.room) {
            store.dispatch(getRoomUsers(api, props.room.id));
        }
    }, [props.room])

    return (
        <div className="row">
            <span className="Video-section">YouTube videos go here</span>
            <UserListR />
            <ChatApp />
        </div>
    )
}

/**
 * Used to connect the state of the overall front end to the VideoRoomPage.
 * 
 * @param {Object} state The current state of the VideoRoomPage.
 */
const mapStateToProps = (state: VideoRoomState) => {
    return {
        room: state.currentRoom,
        currentUsers: state.users,
        updateStatus: state.updateStatus,
    }
}

export const VideoRoomPageR = connect(mapStateToProps)(VideoRoomPage);