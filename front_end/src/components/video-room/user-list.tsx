import React, { useState, useEffect, useContext } from 'react';
import { connect } from "react-redux";
import { User } from "../../api/video-room-types";
import { UserListItem } from './user-list-item';
import { store } from '../../store';
import { getRoomUsers, createUserAndAddToRoom, removeUserFromRoom, VideoRoomState } from '../../store/video-room/video-room';
import { VideoRoomApi } from "../../api/video-room-api";
import { ApiContext } from "..";
import { Status } from "../../store/video-room/video-room"

/**
 * Represents the required properties of the UserList.
 */
export interface Prop {
    roomId: number;
    users: User[];
    updateStatus: Status;
}

/**
 * Represents a list of users currently watching a video together.
 * 
 * @param {Object} props The properties of a UserList. 
 *                 Requires an array of user objects which
 *                 contains the id and name of a user, a roomId
 *                 which is the id of the current room, and the
 *                 updateStatus that holds the current state of the
 *                 web application.
 * @returns {JSX.Element} The JSX representing the UserList.
 */
const UserList = (props: Prop) => {
    const [newUserName, setNewUserName] = useState("");
    const api = useContext<VideoRoomApi>(ApiContext);

    useEffect(() => {
        if (props.roomId) {
            store.dispatch(getRoomUsers(api, props.roomId));
        }
    }, [props.roomId]);

    useEffect(() => {
        if (props.updateStatus === Status.Succeeded) {
            store.dispatch(getRoomUsers(api, props.roomId));
        }
    }, [props.updateStatus]);

    const onRemoveUserClick = (userId: number): void => {
        store.dispatch(removeUserFromRoom(api, props.roomId, userId));
    }

    console.log(props.roomId);
    console.log(props.users);
    return (
        <div className="User-list">
            {
                props.users && props.users.length !== 0 &&
                (() => {
                    return props.users.map((user) => {
                        return (
                            <UserListItem 
                                key={user.id}
                                user={user}
                            />
                        )
                    })
                })()
            }
        </div>
    )
}

/**
 * Used to connect the state of the overall front end to the UserList.
 * 
 * @param {Object} state The current state of the UserList.
 */
const mapStateToProps = (state: VideoRoomState) => {
    return {
        roomId: state.roomId,
        users: state.users,
        updateStatus: state.updateStatus,
    }
}

export const UserListR = connect(mapStateToProps)(UserList);