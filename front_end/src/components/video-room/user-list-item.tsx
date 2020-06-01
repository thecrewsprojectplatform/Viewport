import React from "react";
import { User } from "../../api/video-room-types";
import { ListItem, ListItemText } from "@material-ui/core";

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
    return (
        <ListItem className= "User" key={props.user.id}>
                <ListItemText primary={props.user.name} />
        </ListItem>
    )
}