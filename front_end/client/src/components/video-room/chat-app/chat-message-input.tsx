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
        console.log('handleChange has been triggered')
    }

    return (
        <div>
            <form className={classes.form} onSubmit={handleClick} autoComplete="off">
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
                />
            </form>
        </div>
    )
}