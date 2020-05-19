import React, { useState, useEffect, useContext } from 'react';
import { connect } from "react-redux";
import { User } from "../../api/video-room-types";
import { UserListItem } from './user-list-item';
import { store } from '../../store';
import { getRoomUsers, createUserAndAddToRoom, removeUserFromRoom, VideoRoomState } from '../../store/video-room/video-room';
import { VideoRoomApi } from "../../api/video-room-api";
import { ApiContext } from ".";
import { Status } from "../../store/video-room/video-room"

export interface Prop {
    roomId: number;
    users: User[];
    updateStatus: Status;
}

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

    const createNewUserClick = (): void => {
        store.dispatch(createUserAndAddToRoom(api, props.roomId, newUserName));
        setNewUserName("");
    }

    return (
        <div className="User-list">
            <input 
                id="Add-user" 
                className="User-input" 
                type="text" 
                onChange={(event) => setNewUserName(event.target.value)} 
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        createNewUserClick();
                    }
                }}
                value={newUserName}
            />
            {
                props.users && props.users.length !== 0 &&
                (() => {
                    return props.users.map((user) => {
                        return (
                            <UserListItem 
                                key={user.id}
                                user={user}
                                onRemoveClick={onRemoveUserClick}
                            />
                        )
                    })

                })()
            }
        </div>
    )
}

const mapStateToProps = (state: VideoRoomState) => {
    return {
        roomId: state.roomId,
        users: state.users,
        updateStatus: state.updateStatus,
    }
}

export const UserListR = connect(mapStateToProps)(UserList);