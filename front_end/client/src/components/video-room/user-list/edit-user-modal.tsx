import React, { useContext, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { User, Room } from "../../../api/video-room-types";
import { VideoRoomApi } from "../../../api/video-room-api";
import { store } from "../../../store";
import { editUserName } from "../../../store/video-room/video-room";
import { ApiContext } from "../..";
import { BaseModal } from "../../common/base-modal";

export interface Prop {
    currentRoom: Room;
    currentUser: User;
    onClose: () => void;
}

export const EditUserModal = (props: Prop) => {
    const [newUserName, setNewUserName] = useState(props.currentUser.name);
    const api = useContext<VideoRoomApi>(ApiContext);

    const handleChange = (event): void => {
        setNewUserName(event.target.value);
    }

    const handleSubmit = (event): void => {
        store.dispatch(editUserName(api, props.currentUser.id, props.currentRoom.id, newUserName));
        event.preventDefault();
    }
    
    return <BaseModal
        title="Edit User Name"
        onClose={props.onClose}
        body={
            <div id="edit-user-modal">
                <form onSubmit={handleSubmit} autoComplete="off">
                    <TextField
                        variant="outlined"
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
                        className="button"
                    >
                        Change Name
                    </Button>
                </form>
            </div>
        }
    />
}