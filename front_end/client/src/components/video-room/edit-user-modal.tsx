import React, { useContext, useState } from "react";
import { TextField, Button } from "@material-ui/core";

import { User } from "../../api/video-room-types";
import { VideoRoomApi } from "../../api/video-room-api";
import { store } from "../../store";
import { editUserName } from "../../store/video-room/video-room";
import { ApiContext } from "..";
import { BaseModal } from "../common/base-modal";
import useStyles from "../styles";

export interface Prop {
    currentUser: User;
    onClose: () => void;
}

export const EditUserModal = (props: Prop) => {
    const classes = useStyles();
    const [newUserName, setNewUserName] = useState(props.currentUser.name);
    const api = useContext<VideoRoomApi>(ApiContext);

    const handleChange = (event): void => {
        setNewUserName(event.target.value);
    }

    const handleSubmit = (event): void => {
        store.dispatch(editUserName(api, props.currentUser.id, newUserName));
        event.preventDefault();
    }
    return <BaseModal
        title="Edit User Name"
        onClose={props.onClose}
        body={
            <div>
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
                        value={newUserName}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Change Name
                    </Button>
                </form>
            </div>
        }
    />
}