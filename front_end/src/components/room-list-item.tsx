import React from "react";
import { Room } from "../api/video-room-types";

interface Prop {
    room: Room;
    onJoinClick: (id: number) => void;
}

export const RoomListItem = (props: Prop) => {
    return (
        <div className="Room" key={props.room.id}>
            <span className="Room-name">{props.room.name}</span>
            <button
                className="Join-button"
                onClick={(ev) => {
                    props.onJoinClick(props.room.id)}
            }>
                Join
            </button>
        </div>
    )
}