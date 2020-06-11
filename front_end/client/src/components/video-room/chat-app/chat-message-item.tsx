import React from "react";

interface Prop {
    clientMessage: string;
    clientName: string;
}

export const ChatMessageItem = (props: Prop) => {
    return (
        <div className="message">
            <span>{props.clientName + ": " + props.clientMessage}</span>
        </div>
    )
}