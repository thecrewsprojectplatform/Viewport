import React from "react";
import { TextField } from "@material-ui/core";
import useStyles from "../../styles";

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
    const classes = useStyles();

    const handleClick = (event): void => {
        props.sendMessageClick()
        event.preventDefault();
    }

    const handleChange = (event) => {
        props.setMessage(event)
    }

    return (
        <div className={classes.typingSection}>
            <form className={classes.formControl} onSubmit={handleClick} autoComplete="off">
                <TextField
                    type="text"
                    placeholder="Send a message..."
                    id="messageSender"
                    variant="outlined"
                    InputProps={{
                        className: classes.textField
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                    onChange={event => handleChange(event.target.value)}
                    value={props.msg}
                />
            </form>
        </div>
    )
}