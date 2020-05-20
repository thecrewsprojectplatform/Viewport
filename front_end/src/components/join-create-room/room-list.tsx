import React, { useState, useEffect, useContext } from 'react';
import { connect } from "react-redux";
import { createRoomAndAddUserToRoomAction, addUserToRoomAction, Status, VideoRoomState } from '../../store/video-room/video-room';
import { RoomListItem } from './room-list-item';
import { store } from '../../store';
import { ApiContext } from '..';
import { Room, User } from '../../api/video-room-types';
import { VideoRoomApi } from '../../api/video-room-api';

/**
 * Represents the required properties of the UserList.
 */
export interface Prop {
    currentRooms: Room[];
    currentUser: User;
    updateStatus: Status;
    setPage: () => void;
}

/**
 * Represents a list of rooms currently available.
 * 
 * @param {Object} props The properties of a RoomList. 
 *                 Requires an array of Room objects which
 *                 contains the id and name of a room, the current
 *                 User, and an updateStatus that holds the current
 *                 state of the web application.
 * @returns {JSX.Element} The JSX representing the RoomList.
 */
const RoomList = (props: Prop) => {
    const [newRoomName, setNewRoomName] = useState("");
    const api = useContext<VideoRoomApi>(ApiContext);

    const createNewRoomClick = (): void => {
        store.dispatch(createRoomAndAddUserToRoomAction(api, newRoomName, props.currentUser.id));
        setNewRoomName("");
        props.setPage();
    }

    const onJoinRoomClick = (roomId: number): void => {
        store.dispatch(addUserToRoomAction(api, roomId, props.currentUser.id, props.currentRooms));
        props.setPage();
    }

    return (
        <div className="Room-list">
            <input 
                id="Add-room" 
                className="Room-input" 
                type="text" 
                onChange={(event) => setNewRoomName(event.target.value)} 
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        createNewRoomClick();
                    }
                }}
                value={newRoomName}
            />
            {
                (() => {
                    return props.currentRooms.map((room) => {
                        return (
                            <RoomListItem 
                                key={room.id}
                                room={room}
                                onJoinClick={onJoinRoomClick}
                            />
                        )
                    })

                })()
            }
        </div>
    )
}

/**
 * Used to connect the state of the overall front end to the RoomList.
 * 
 * @param {Object} state The current state of the RoomList.
 */
const mapStateToProps = (state: VideoRoomState) => {
    return {
        currentRooms: state.roomList,
        currentUser: state.user,
        updateStatus: state.updateStatus,
    }
}

export const RoomListR = connect(mapStateToProps)(RoomList);