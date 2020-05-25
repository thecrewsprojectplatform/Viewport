import React, { useEffect, useContext, useState } from "react";
import { connect } from "react-redux";
import { createRoomAction, getRoomUsers, VideoRoomState } from "../../store/video-room/video-room";
import { ApiContext } from "..";
import { VideoRoomApi } from "../../api/video-room-api";
import { store } from "../../store";
import { UserListR } from "./user-list";
import { Room, User } from "../../api/video-room-types";

/**
 * Represents the required properties of the VideoRoomPage.
 */
export interface Prop {
    currentRoom: Room
    users: User[];
    setPageBackwards: () => void;
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
        if (props.currentRoom) {
            store.dispatch(getRoomUsers(api, props.currentRoom.id));
        }
    }, [props.currentRoom])

    return (
        <div>
            <button
                className="Exit-room-button"
                onClick={(ev) => {
                    props.setPageBackwards()}
            }>
                Exit Room
            </button>
            <div className="row">
                <span className="Video-section">YouTube videos go here</span>
                <UserListR />
            </div>
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
        currentRoom: state.currentRoom,
        users: state.users,
        updateStatus: state.updateStatus,
    }
}

export const VideoRoomPageR = connect(mapStateToProps)(VideoRoomPage);