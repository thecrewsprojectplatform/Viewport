import React, { useContext, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { createUser, Status, resetUpdateStatus } from "../../store/video-room/video-room";
import { ApiContext } from "..";
import { VideoRoomApi } from "../../api/video-room-api";
import { store } from "../../store";
import { CssBaseline } from "@material-ui/core";
import useStyles from "../styles";
import { User } from "../../api/video-room-types";
import { LoginForm } from "./login-form";
import { NotificationState } from "../../store/notifications/notifications";
import { BaseAlert } from "../common/base-alert";

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
            <div className={classes.login}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Multimedia Platform
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