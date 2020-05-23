import React from "react";
import { Room } from "../../api/video-room-types";

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
    return (
        <div className="Room" key={props.currentRoom.id}>
            <span className="Room-name">{props.currentRoom.name}</span>
            <button
                className="Join-button"
                onClick={(ev) => {
                    props.onJoinClick(props.currentRoom.id)}
            }>
                Join
            </button>
        </div>
    )
}