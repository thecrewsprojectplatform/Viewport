import React from "react";
import { TextField } from "@material-ui/core";
import "./chat-app.scss";

///// THIS FILE IS CURRENTLY NOT BEING USED, BUT WILL BE USED SOON /////

/**
 * Represents the required properties of sending a Chat Message.
 */
interface Prop {
    sendMessageClick: () => void;
    setMessage: (message: string) => void;
    msg: String
}

export const ChatMessageInput = (props: Prop) => {

    const handleClick = (event): void => {
        props.sendMessageClick()
        event.preventDefault();
    }

    const handleChange = (event) => {
        props.setMessage(event)
    }

    return (
        <div className="chat-message">
            <form onSubmit={handleClick} autoComplete="off">
                <TextField
                    type="text"
                    placeholder="Send a message..."
                    id="messageSender"
                    variant="outlined"
                    InputProps={{
                        className: "chat-box-tray",
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                    onChange={event => handleChange(event.target.value)}
                    value={props.msg}
                    fullWidth
                />
            </form>
        </div>
    )
}