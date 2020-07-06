import React, { useState } from "react";
import { Room } from "../../api/video-room-types";
import { TextField, Button } from '@material-ui/core';
import useStyles from '../styles';

/**
 * Represents the required properties of the User.
 */
interface Prop {
    newUserName: string;
    handleChange: (event) => void;
    handleSubmit: (event) => void;
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
export const LoginForm = (props: Prop) => {
    const classes = useStyles();

    const handleSubmit = (event): void => {
        props.handleSubmit(event);
        event.preventDefault();
    }

    const handleChange = (event): void => {
        props.handleChange(event);
    }
    
    return (
        <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
            <TextField 
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="off"
                autoFocus
            
                type="text" 
                onChange={handleChange}
                value={props.newUserName}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign In
            </Button>
        </form>
    )
}