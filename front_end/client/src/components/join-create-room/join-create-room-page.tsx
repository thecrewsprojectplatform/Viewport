import { Button } from "@material-ui/core";
import { Help } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { ApiContext } from "..";
import { VideoRoomApi } from "../../api/video-room-api";
import { Room, User } from "../../api/video-room-types";
import { store } from "../../store";
import { NotificationState } from "../../store/notifications/notifications";
import { getRoomsAction, Status } from "../../store/video-room/video-room";
import { BaseAlert } from "../common/base-alert";
import "../common/help-icon.scss";
import { HelpModal } from "../video-room/help-modal";
import { RoomListR } from "./room-list";

/**
 * Represents the required properties of the JoinCreateRoomPage.
 */
export interface Prop {
    users: User[];
    roomList: Room[];
    currentUser: User;
    updateStatus: Status;
    notificationState: NotificationState;
}

/**
 * Represents the join/create room page. Users input a room name into a textbox
 * if they want to create a room and join it. The current list of available rooms
 * is displayed so users can also join already existing rooms.
 *
 * @param {Object} props An object representing the require properties of
 *                 the join/create room page. Contains a list of rooms,
 *                 the current user, the current update status, and a
 *                 setPage function.
 * @returns {JSX.Element} The JSX representing the join/create room page.
 */
export const JoinCreateRoomPage = (props: Prop) => {
    const api = useContext<VideoRoomApi>(ApiContext);
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [showBaseModal, setShowBaseModal] = useState(true);

    useEffect(() => {
        store.dispatch(getRoomsAction(api))
    }, []);

    return (
        <div className="join-create-room">
            {
                showHelpModal &&
                <HelpModal
                    onClose={() => {setShowHelpModal(false)}}
                />
            }
            <BaseAlert
                onClose={() => {setShowBaseModal(false)}}
                showBaseModal={showBaseModal}
                displayNotification={props.notificationState.displayNotification}
                notificationType={props.notificationState.notificationType}
                notificationHeader={props.notificationState.notificationHeader}
                notificationBody={props.notificationState.notificationBody}
            />
            <Button className="help-button" onClick={() => {setShowHelpModal(true)}}><Help /></Button>
            <RoomListR />
        </div>
    )
}

/**
 * Used to connect the state of the overall front end to the JoinCreateRoomPage.
 *
 * @param {Object} state The current state of the JoinCreateRoomPage.
 */
const mapStateToProps = state => {
    return {
        users: state.videoRoom.users,
        roomList: state.videoRoom.roomList,
        currentUser: state.videoRoom.user,
        updateStatus: state.videoRoom.updateStatus,
        notificationState: state.notifications,
    }
}

export const JoinCreateRoomPageR = connect(mapStateToProps)(JoinCreateRoomPage);
