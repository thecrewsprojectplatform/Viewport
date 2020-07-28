import React from "react";
import { Room } from "../../api/video-room-types";
import { ListItem, ListItemText } from "@material-ui/core";

/**
 * Represents the required properties of the User.
 */
interface Prop {
    currentRoom: Room;
    onJoinClick: (id: number) => void;
}

/**
 * Represents a room in our application.
 *
 * @param {Object} props The properties of a Room.
 *                 Requires a Room which holds an roomId
 *                 and a room name. Also holds an onJoinClick
 *                 function that allows users to join the room.
 * @returns {JSX.Element} The JSX representing the RoomList.
 */
export const RoomListItem = (props: Prop) => {
    const handleClick = (event): void => {
        props.onJoinClick(props.currentRoom.id)
        event.preventDefault();
    }

    return (
        <ListItem button onClick={handleClick} key={props.currentRoom.id}>
            <ListItemText primary={props.currentRoom.name} />
        </ListItem>
    )
}