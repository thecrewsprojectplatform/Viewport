import { Container, CssBaseline, Grid } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { ApiContext } from '..';
import { VideoRoomApi } from '../../api/video-room-api';
import { Room, User } from '../../api/video-room-types';
import { store } from '../../store';
import { getPlaylistFromServer } from '../../store/video-room/playlist';
import { addUserToRoomAction, createRoomAndAddUserToRoomAction, getRoomsAction, Status } from '../../store/video-room/video-room';
import { AvailableRoomList } from './available-room-list';
import { CreateRoomInput } from './create-room-input';
import "./create-room.scss";

/**
 * Represents the required properties of the UserList.
 */
export interface Prop {
    getPlaylist: Function;
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
        // api.getRoom(roomId).then(roomApi => {
        //     store.dispatch(loadVideo(roomApi.video_url))
        // })
        props.getPlaylist(api, roomId)
        history.push(`/rooms/${roomId}`)
    }

    return (
        <Grid className="room-list" container spacing={3}>
            <CssBaseline />
                <Grid className="room-list-available" item xs={6} sm={6}>
                    <AvailableRoomList 
                        availableRooms={props.availableRooms}
                        onJoinRoomClick={onJoinRoomClick}
                    />
                </Grid>
                <Grid className="room-list-create" item xs={6} sm={6}>
                    <Container maxWidth="xs">
                        <CreateRoomInput
                            createNewRoomClick={createNewRoomClick}
                            setNewRoomName={setNewRoomName}
                            newRoomName={newRoomName}
                        />
                    </Container>
                </Grid>
        </Grid>
    )
}

/**
 * Used to connect the state of the overall front end to the RoomList.
 *
 * @param {Object} state The current state of the RoomList.
 */
const mapStateToProps = state => {
    return {
        availableRooms: state.videoRoom.roomList,
        currentRoom: state.videoRoom.currentRoom,
        user: state.videoRoom.user,
        updateStatus: state.videoRoom.updateStatus,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPlaylist: (
            api: VideoRoomApi,
            roomId: number,
        ) => {getPlaylistFromServer(api, roomId, dispatch)}
    }
}

export const RoomListR = connect(mapStateToProps, mapDispatchToProps)(RoomList);
