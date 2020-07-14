import React, { Fragment } from "react";
import { Avatar,  IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';

import { User } from "../../../api/video-room-types";
import useStyles from "../../styles";

/**
 * Represents the required properties of the User.
 */
interface Prop {
    user: User;
    isCurrentUser: boolean;
    onEditClick: () => void;
}

/**
 * Represents a user of our application.
 *
 * @param {Object} props The properties of a User.
 *                 Requires a User which holds an userId
 *                 and a username.
 * @returns {JSX.Element} The JSX representing the RoomList.
 */
export const UserListItem = (props: Prop) => {
    const classes = useStyles();

    return (
        <ListItem button className={classes.user} key={props.user.id}>
            {
                // TODO: need to make list look better
                props.isCurrentUser ? (
                    <Fragment>
                        <ListItemAvatar>
                            <Avatar>
                                <AccountCircleOutlinedIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={props.user.name} classes={{ primary: classes.userName }}/>
                        <ListItemSecondaryAction>
                            <IconButton edge="end">
                                <EditIcon onClick={props.onEditClick} />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </Fragment>
                ) : (
                    <ListItemText primary={props.user.name} classes={{ primary: classes.userName}} inset />
                )
            }
        </ListItem>
    )
}