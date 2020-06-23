import React, { useState } from "react";
import { Room } from "../../api/video-room-types";
import { TextField } from '@material-ui/core';
import useStyles from '../styles';

/**
 * Represents the required properties of the User.
 */
interface Prop {
    currentRoom: Room;
    createNewRoomClick: () => void;
    setNewRoomName: (name: string) => void;
    newRoomName: String
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

/*
    <form className={classes.form} onSubmit={createNewRoomClick} autoComplete="off">
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
                onChange={(event) => setNewRoomName(event.target.value)}
                value={newRoomName}
            />
    </form>
*/