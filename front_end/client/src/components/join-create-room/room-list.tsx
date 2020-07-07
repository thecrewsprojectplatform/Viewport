import React, {  useContext, useEffect, useState } from 'react';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { CssBaseline, Container, List } from '@material-ui/core';

import { Room, User } from '../../api/video-room-types';
import { VideoRoomApi } from '../../api/video-room-api';
import { store } from '../../store';
import { loadVideo } from '../../store/video-room/video-player'
import { addUserToRoomAction, createRoomAndAddUserToRoomAction, getRoomsAction, Status  } from '../../store/video-room/video-room';
import { ApiContext } from '..';
import useStyles from '../styles';
import { CreateRoomInput } from './create-room-input';
import { RoomListItem } from './room-list-item';

/**
 * Represents the required properties of the UserList.
 */
export interface Prop {
    currentRoom: Room;
    availableRooms: Room[];
    user: User;
    updateStatus: Status;
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
export const RoomList = (props: Prop) => {
    const classes = useStyles();
    const [newRoomName, setNewRoomName] = useState("");
    const api = useContext<VideoRoomApi>(ApiContext);
    const history = useHistory();

    useEffect(() => {
        store.dispatch(getRoomsAction(api))
    }, []);

    useEffect(() => {
        if (props.currentRoom) {
            history.push(`/rooms/${props.currentRoom.id}`)
        }
    }, [props.currentRoom]);

    const createNewRoomClick = (): void => {
        store.dispatch(createRoomAndAddUserToRoomAction(api, newRoomName, props.user.id));
    }

    const onJoinRoomClick = (roomId: number): void => {
        store.dispatch(addUserToRoomAction(api, roomId, props.user.id, props.availableRooms));
        api.getRoom(roomId).then(roomApi => {
            store.dispatch(loadVideo(roomApi.video_url))
        })
        history.push(`/rooms/${roomId}`)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className="Room-list">
                <CreateRoomInput
                    createNewRoomClick={createNewRoomClick}
                    setNewRoomName={setNewRoomName}
                    newRoomName={newRoomName}
                />
                Available Rooms:
                <List>
                {
                    (() => {
                        return props.availableRooms.map((room) => {
                            return (
                                <RoomListItem
                                    key={room.id}
                                    currentRoom={room}
                                    onJoinClick={onJoinRoomClick}
                                />
                            )
                        })

                    })()
                }
                </List>
            </div>
        </Container>
    )
}

/**
 * Used to connect the state of the overall front end to the RoomList.
 *
 * @param {Object} state The current state of the RoomList.
 */
const mapStateToProps = state => {
    return {
        availableRooms: state.room.roomList,
        currentRoom: state.room.currentRoom,
        user: state.room.user,
        updateStatus: state.room.updateStatus,
    }
}

export const RoomListR = connect(mapStateToProps)(RoomList);