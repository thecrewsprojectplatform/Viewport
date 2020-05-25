import React from "react";

interface Prop {
    clientMessage: string;
    clientName: string;
}

export const ChatMessageItem = (props: Prop) => {
    return (
        <div className="message">
            <span className="message-name">{props.clientMessage}</span>
            <span className="message-user">{props.clientName}</span>
        </div>
    )
}