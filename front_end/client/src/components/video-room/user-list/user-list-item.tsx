import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import { User } from "../../../api/video-room-types";
import useStyles from "../../styles";

/**
 * Represents the required properties of the User.
 */
interface Prop {
    user: User;
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
        <ListItem button key={props.user.id} className={classes.user}>
                <ListItemText primary={props.user.name} className={classes.userName} />
        </ListItem>
    )
}