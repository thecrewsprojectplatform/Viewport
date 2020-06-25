import React from "react";
import { TextField } from "@material-ui/core";
import useStyles from "../../styles";

///// THIS FILE IS CURRENTLY NOT BEING USED, BUT WILL BE USED SOON /////

/**
 * Represents the required properties of sending a Chat Message.
 */
interface Prop {
    sendMessageClick: (event) => void;
    setMessage: (message: string) => void;
    msg: String
}

export const ChatMessageInput = (props: Prop) => {
    const classes = useStyles();

    const handleClick = (event): void => {
        props.sendMessageClick(event)
        event.preventDefault();
    }

    const handleChange = (event) => {
        props.setMessage(event)
        console.log('handleChange has been triggered')
    }

    return (
        <div>
            <TextField
                type="text"
                placeholder="Send a message..."
                id="messageSender"
                variant="outlined"
                className={classes.formControl}
                InputProps={{
                    className: classes.formControl
                }}
                InputLabelProps={{
                    shrink: true
                }}

                value={props.msg}
                onChange={event => handleChange(event.target.value)}
                onKeyDown={handleClick}
            />
        </div>
    )
}

/**
 *                 <TextField
                    type="text"
                    placeholder="Send a message..."
                    id="messageSender"
                    variant="outlined"
                    className={classes.formControl}
                    InputProps={{
                        className: classes.formControl
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}

                    value={msg}
                    onChange={event => setMessage(event.target.value)}
                    onKeyDown={sendMessageClick}
                />
 */