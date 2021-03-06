import { Button, Container, CssBaseline } from "@material-ui/core";
import { KeyboardTab } from "@material-ui/icons";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { connect } from "react-redux";
import { match, useHistory } from "react-router-dom";
import { ApiContext } from "..";
import { VideoRoomApi } from "../../api/video-room-api";
import { Room, User } from "../../api/video-room-types";
import { store } from "../../store";
import { getPlaylistFromServer } from "../../store/video-room/playlist";
import { loadVideo } from '../../store/video-room/video-player';
import { createUserAndAddToRoom, getRoomsAction, getRoomUsers, removeRoom, removeUserFromRoom } from "../../store/video-room/video-room";
import { ChatAppR } from "./chat-app/chat-app";
import { HelpModal } from "./help-modal";
import { ShareRoomModal } from "./share-room-modal";
import "./toggle-display.scss";
import { EditUserModal } from "./user-list/edit-user-modal";
import { UserList } from "./user-list/user-list";
import { VideoPlayerR } from "./video-player/video-player";
import VidRoomNavBar from "./video-room-nav-bar";
import "./video-room.scss";


/**
 * Represents the required properties of the VideoRoomPage.
 */
export interface Prop {
    getPlaylist: Function;
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
    const api = useContext<VideoRoomApi>(ApiContext);
    const history = useHistory();
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [showShareRoomModal, setShowShareRoomModal] = useState(false);
    const [leaveRoom, setLeaveRoom] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [showUser, setShowUser] = useState(false);

    useEffect(() => {
        if (leaveRoom) {
            history.push("/rooms");
        }
    }, [props.users]);

    const toggleChatButton = () => {
        setShowChat(!showChat);
    }

    const toggleUserButton = () => {
        setShowUser(!showUser);
    }

    const toggleChat = () => {
        var toggleChatApp = document.getElementById("chat-app");
        toggleChatApp.classList.toggle("hidden");
        toggleChatButton();
    }

    const toggleUserList = () => {
        var toggleUserListApp = document.getElementById("user-list");
        toggleUserListApp.classList.toggle("hidden");
        toggleUserButton();
    }

    const exitRoomClick = (): void => {
        if (props.users.length === 1) {
            store.dispatch(removeUserFromRoom(api, props.currentRoom.id, props.currentUser.id, props.users));
            store.dispatch(removeRoom(api, props.currentRoom.id));
        } else {
            store.dispatch(removeUserFromRoom(api, props.currentRoom.id, props.currentUser.id, props.users));
        }
        setLeaveRoom(true);
    }

    useEffect(() => {
        if (props.currentRoom) {
            store.dispatch(getRoomUsers(api, props.currentRoom.id));
            props.getPlaylist(api, props.currentRoom.id)
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
        <div className="video-room">
            <VidRoomNavBar
                title={!props.currentRoom ? "" : props.currentRoom.name}
                onHelpClick={() => {setShowHelpModal(true)}}
                onShareClick={() => {setShowShareRoomModal(true)}}
                onExitClick={exitRoomClick}
                toggleChatOnClick={toggleChat}
                toggleListOnClick={toggleUserList}
            />
            <Container className="video-room-content" maxWidth={false}>
                <CssBaseline />
                    {
                        showEditUserModal &&
                        <EditUserModal
                            currentRoom={props.currentRoom}
                            currentUser={props.currentUser}
                            onClose={() => {setShowEditUserModal(false)}}
                        />
                    }
                    {
                        showHelpModal &&
                        <HelpModal
                            onClose={() => {setShowHelpModal(false)}}
                        />
                    }
                    {
                        showShareRoomModal &&
                        <ShareRoomModal
                            roomId={props.currentRoom.id}
                            onClose={() => {setShowShareRoomModal(false)}}
                        />
                    }

                    <UserList toggleUserList={toggleUserList}
                        users={props.users}
                        currentUser={props.currentUser}
                        onEditClick={() => {setShowEditUserModal(true)}}
                    />
                    {
                        showUser &&
                        <Button onClick={toggleUserList} className="open-userlist">
                            <KeyboardTab />
                        </Button>
                    }
                    <VideoPlayerR />
                    <ChatAppR toggleChat={toggleChat}/>
                    {
                        showChat &&
                        <Button onClick={toggleChat} className="open-chat">
                            <KeyboardTab />
                        </Button>
                    }
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

const mapDispatchToProps = dispatch => {
    return {
        getPlaylist: (
            api: VideoRoomApi,
            roomId: string,
        ) => {getPlaylistFromServer(api, roomId, dispatch)}
    }
}

export const VideoRoomPageR = connect(mapStateToProps, mapDispatchToProps)(VideoRoomPage);
