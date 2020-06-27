import React from "react";
import { Room } from "../../api/video-room-types";
import { TextField } from '@material-ui/core';
import useStyles from '../styles';

/**
 * Represents the required properties of creating a Room.
 */
interface Prop {
    currentRoom: Room;
    createNewRoomClick: () => void;
    setNewRoomName: (name: string) => void;
    newRoomName: String
}

export const CreateRoomInput = (props: Prop) => {
    const classes = useStyles();

    const handleClick = (event): void => {
        props.createNewRoomClick()
        console.log('handleClick has been triggered')
        event.preventDefault();
    }

    const handleChange = (event) => {
        props.setNewRoomName(event)
    }

    return (
        <div>
            <form className={classes.form} onSubmit={handleClick} autoComplete="off">
                <TextField
                    variant="outlined"
                    margin="normal"
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