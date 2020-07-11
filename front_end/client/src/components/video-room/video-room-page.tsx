import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { match } from "react-router-dom";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, CssBaseline } from "@material-ui/core";

import { VideoRoomApi } from "../../api/video-room-api";
import { Room, User } from "../../api/video-room-types";
import { store } from "../../store";
import { loadVideo } from '../../store/video-room/video-player'
import { createUserAndAddToRoom, getRoomsAction, getRoomUsers, removeRoom, removeUserFromRoom } from "../../store/video-room/video-room";
import { ApiContext } from "..";
import NavBar from "../nav-bar";
import useStyles from "../styles";
import { ChatAppR } from "./chat-app/chat-app"
import { EditUserModal } from "./user-list/edit-user-modal";
import { UserList } from "./user-list/user-list";
import VideoPlayer from "./video-player/video-player"

/**
 * Represents the required properties of the VideoRoomPage.
 */
export interface Prop {
    currentRoom: Room;
    roomList: Room[];
    currentUser: User;
    users: User[];
    match?: match<any>;
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
export const VideoRoomPage = (props: Prop) => {
    const classes = useStyles();
    const api = useContext<VideoRoomApi>(ApiContext);
    const history = useHistory();
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [leaveRoom, setLeaveRoom] = useState(false);

    useEffect(() => {
        if (leaveRoom) {
            history.push("/rooms");
        }
    }, [props.users]);

    const exitRoomClick = (): void => {
        if (props.users.length === 1) {
            store.dispatch(removeUserFromRoom(api, props.currentRoom.id, props.currentUser.id));
            store.dispatch(removeRoom(api, props.currentRoom.id));
        } else {
            store.dispatch(removeUserFromRoom(api, props.currentRoom.id, props.currentUser.id));
        }
        setLeaveRoom(true);
    }

    useEffect(() => {
        if (props.currentRoom) {
            store.dispatch(getRoomUsers(api, props.currentRoom.id));
            api.getRoom(props.currentRoom.id).then(roomApi => {
                store.dispatch(loadVideo(roomApi.video_url))
            })
        }
    }, [props.currentRoom])

    useLayoutEffect(() => {
        if (!props.currentUser && props.roomList.length === 0) {
            store.dispatch(getRoomsAction(api))
        } else if (!props.currentUser) {
            store.dispatch(createUserAndAddToRoom(api, props.match.params.videoRoomId, "Guest"));
        }
    }, [props.roomList]);

    useEffect(() => {
        if (showEditUserModal === true) {
            setShowEditUserModal(false);
        }
    }, [props.currentUser]);

    return (
        <div>
            <NavBar
                title={!props.currentRoom ? "" : props.currentRoom.name}
                buttonName={"Exit Room"}
                buttonOnClick={exitRoomClick}
            />
            <Container className={classes.videoRoom} maxWidth='xl'>
                <CssBaseline />
                    {
                        showEditUserModal &&
                        <EditUserModal
                            currentRoom={props.currentRoom}
                            currentUser={props.currentUser}
                            onClose={() => {setShowEditUserModal(false)}}
                        />
                    }
                    <UserList
                        users={props.users}
                        currentUser={props.currentUser}
                        onEditClick={() => {setShowEditUserModal(true)}}
                    />
                    <VideoPlayer />
                    <ChatAppR />
            </Container>
        </div>
    )
}

/**
 * Used to connect the state of the overall front end to the VideoRoomPage.
 * 
 * @param {Object} state The current state of the VideoRoomPage.
 */
const mapStateToProps = state => {
    return {
        currentRoom: state.videoRoom.currentRoom,
        roomList: state.videoRoom.roomList,
        currentUser: state.videoRoom.user,
        users: state.videoRoom.users,
        updateStatus: state.videoRoom.updateStatus,
    }
}

export const VideoRoomPageR = connect(mapStateToProps)(VideoRoomPage);