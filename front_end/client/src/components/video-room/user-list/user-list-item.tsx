import React, { Fragment } from "react";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import { ListItem, ListItemText, ListItemAvatar, Avatar, ListItemIcon, ListItemSecondaryAction, IconButton } from "@material-ui/core";
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
                /*
                props.isCurrentUser ? (
                    <Fragment>
                        <ListItemAvatar>
                            <Avatar>
                                <AccountCircleOutlinedIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={props.user.name}/>
                        <ListItemSecondaryAction>
                            <IconButton edge="end">
                                <EditIcon onClick={props.onEditClick} />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </Fragment>
                ) : (
                    <ListItemText primary={props.user.name} className={classes.userName} inset />
                )
                */
            }
            <ListItemText primary={props.user.name} className={classes.userName} />
        </ListItem>
    )
}