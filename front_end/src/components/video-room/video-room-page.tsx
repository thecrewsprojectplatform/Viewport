import React, { useEffect, useContext} from "react";
import { connect } from "react-redux";
import { createRoomAction, getRoomUsers, VideoRoomState, removeUserFromRoom, removeRoom, getRoomsAction } from "../../store/video-room/video-room";
import { ApiContext } from "..";
import { VideoRoomApi } from "../../api/video-room-api";
import { store } from "../../store";
import { UserListR } from "./user-list";
import { Room, User } from "../../api/video-room-types";
import { ChatAppR } from "./chat-app/chat-app"
import VideoPlayer from "./video-player"
import NavBar from "../nav-bar";
import { Container, CssBaseline } from "@material-ui/core";
import useStyles from "../../styles";

/**
 * Represents the required properties of the VideoRoomPage.
 */
export interface Prop {
    currentRoom: Room;
    roomList: Room[];
    currentUser: User;
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
    const classes = useStyles();
    const api = useContext<VideoRoomApi>(ApiContext);

    useEffect(() => {
        if (props.currentRoom) {
            store.dispatch(getRoomUsers(api, props.currentRoom.id));
        }
    }, [props.currentRoom])

    useEffect(() => {
        store.dispatch(getRoomsAction(api))
    }, []);

    const exitRoomClick = (): void => {
        if (props.users.length === 1) {
            store.dispatch(removeUserFromRoom(api, props.currentRoom.id, props.currentUser.id));
            store.dispatch(removeRoom(api, props.currentRoom.id));
        } else {
            store.dispatch(removeUserFromRoom(api, props.currentRoom.id, props.currentUser.id));
        }
        props.setPageBackwards()
    }

    return (
        <div>
            {NavBar("Exit Room", exitRoomClick)}
            <Container>
                <CssBaseline />
                <div className={classes.videoRoom}>
                    <UserListR />
                    <VideoPlayer />
                    <ChatAppR />
                </div>
            </Container>
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
        roomList: state.roomList,
        currentUser: state.user,
        users: state.users,
        updateStatus: state.updateStatus,
    }
}

export const VideoRoomPageR = connect(mapStateToProps)(VideoRoomPage);