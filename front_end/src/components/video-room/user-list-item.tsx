import React from "react";
import { User } from "../../api/video-room-types";

interface Prop {
    user: User;
    onRemoveClick: (id: number) => void;
}

export const UserListItem = (props: Prop) => {
    return (
        <div className="User" key={props.user.id}>
            <span className="User-name">{props.user.name}</span>
            <button
                className="Remove-button"
                onClick={(ev) => {
                    props.onRemoveClick(props.user.id)}
            }>
                Remove
            </button>
        </div>
    )
}