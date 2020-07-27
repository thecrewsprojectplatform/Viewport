import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { VideoRoomApi } from "../../api/video-room-api";
import { User } from "../../api/video-room-types";
import { store } from "../../store";
import { NotificationState } from "../../store/notifications/notifications";
import { createUser, Status } from "../../store/video-room/video-room";
import { ApiContext } from "..";
import { BaseAlert } from "../common/base-alert";
import useStyles from "../styles";
import { LoginForm } from "./login-form";


/**
 * Represents the required properties of the LoginPage.
 */
export interface Prop {
    currentUser: User;
    updateStatus: Status;
    notificationState: NotificationState;
}

/**
 * Represents the login page. Users input their username in a textbox and
 * go to the join/create room page.
 *
 * @param {Object} props An object representing the require properties of
 *                 the login page. Contains a setPage function.
 * @returns {JSX.Element} The JSX representing the login page.
 */

export const LoginPage = (props: Prop) => {
    const classes = useStyles();
    const [newUserName, setNewUserName] = useState(props.currentUser ? props.currentUser.name : "");
    const api = useContext<VideoRoomApi>(ApiContext);
    const history = useHistory();

    const handleChange = (event): void => {
        setNewUserName(event.target.value);
    }

    const handleSubmit = (event): void => {
        store.dispatch(createUser(api, newUserName)).then(() => {
            console.log("going into then")
            history.push("/rooms")
        }).catch(() => {

        });
        event.preventDefault();
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <BaseAlert
                displayNotification={props.notificationState.displayNotification}
                notificationType={props.notificationState.notificationType}
                notificationHeader={props.notificationState.notificationHeader}
                notificationBody={props.notificationState.notificationBody}
            />
            <div id="login">
                <Typography variant="h1" component="h1" align="center">
                    Viewport
                </Typography>
                <LoginForm
                    newUserName={newUserName}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </div>
        </Container>
    )
}

/**
 * Used to connect the state of the overall front end to the LoginPage.
 *
 * @param {Object} state The current state of the LoginPage.
 */
const mapStateToProps = state => {
    console.log(state)
    return {
        currentUser: state.videoRoom.user,
        updateStatus: state.videoRoom.updateStatus,
        notificationState: state.notifications,
    }
}

export const LoginPageR = connect(mapStateToProps)(LoginPage);