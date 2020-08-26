import { TextField } from '@material-ui/core';
import React from "react";
import "./create-room.scss";

/**
 * Represents the required properties of creating a Room.
 */
interface Prop {
    createNewRoomClick: () => void;
    setNewRoomName: (name: string) => void;
    newRoomName: String
}

export const CreateRoomInput = (props: Prop) => {

    const handleClick = (event): void => {
        props.createNewRoomClick()
        event.preventDefault();
    }

    const handleChange = (event) => {
        props.setNewRoomName(event)
    }

    return (
        <div>
            <form className="create-room-input-form" onSubmit={handleClick} autoComplete="off">
                <TextField
                    variant="outlined"
                    fullWidth
                    id="EditUserModal"
                    label="Create New Room"
                    name="EditUserModal"
                    autoComplete="off"
                    autoFocus
                    required
                    type="text"
                    onChange={(event) => handleChange(event.target.value)}
                    value={props.newRoomName}
                />
            </form>
        </div>
    )
}