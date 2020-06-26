import React, { useState, useContext, useEffect } from 'react';
import { connect } from "react-redux";
import { createRoomAndAddUserToRoomAction, addUserToRoomAction, Status, VideoRoomState, getRoomsAction, loadVideo } from '../../store/video-room/video-room';
import { useHistory } from "react-router-dom";
import { RoomListItem } from './room-list-item';
import { CreateRoomInput } from './create-room-input';
import { store } from '../../store';
import { ApiContext } from '..';
import { Room, User } from '../../api/video-room-types';
import { VideoRoomApi } from '../../api/video-room-api';
import { TextField, CssBaseline, Container, List } from '@material-ui/core';
import useStyles from '../styles';

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
        api.getRoom(roomId).then(room => {
            store.dispatch(loadVideo(room.video_url))
        })
        history.push(`/rooms/${roomId}`)
    }
 
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className="Room-list">
                <CreateRoomInput
                    newRoomName={newRoomName}
                    createNewRoomClick={createNewRoomClick}
                    setNewRoomName={setNewRoomName}
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
const mapStateToProps = (state: VideoRoomState) => {
    return {
        availableRooms: state.roomList,
        currentRoom: state.currentRoom,
        user: state.user,
        updateStatus: state.updateStatus,
    }
}

export const RoomListR = connect(mapStateToProps)(RoomList);