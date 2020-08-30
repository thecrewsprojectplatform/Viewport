import { TextField } from '@material-ui/core';
import React from "react";
import "./create-room.scss";

/**
 * Represents the required properties of creating a Room.
 */
interface Prop {
    label: string;
    onSubmit: () => void;
    setValue: (value: string) => void;
    value: string
}

export const BaseInput = (props: Prop) => {

    const handleClick = (event): void => {
        props.onSubmit();
        event.preventDefault();
    }

    return (
        <div>
            <form className="input-form" onSubmit={handleClick} autoComplete="off">
                <TextField
                    variant="outlined"
                    fullWidth
                    label={props.label}
                    autoComplete="off"
                    autoFocus
                    required
                    type="text"
                    onChange={(event) => props.setValue(event.target.value)}
                    value={props.value}
                />
            </form>
        </div>
    )
}