import { Button, TextField } from "@material-ui/core";
import React from "react";
import { BaseModal } from "../common/base-modal";

export interface Prop {
    roomId: string;
    onClose: () => void;
}

export const ShareRoomModal = (props: Prop) => {
    return <BaseModal
        title="Share room"
        onClose={props.onClose}
        body={
            <div className="edit-user-modal">
                <p>Copy the <u>Room ID</u> and share it with friends!</p>
                <p>Or, share the URL for friends to join the room directly!</p>
                <form>
                    <TextField
                        variant="outlined"
                        fullWidth
                        id="room-id"
                        label="Room ID"
                        name="roomid"
                        disabled={true}
                        autoFocus
                        type="text"
                        value={props.roomId}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="edit-user-button"
                        onClick={props.onClose}
                    >
                        Close
                    </Button>
                </form>
            </div>
        }
    />
}