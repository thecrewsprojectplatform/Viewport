import React from "react";
import "./chat-app.scss";

export interface Prop {
    clientMessage: string;
    clientName: string;
    msgTime: string;
}

export const ChatMessageItem = (props: Prop) => {
    if (props.msgTime === "true") {
        return (
            <div className="chat-message-bubble-system">
                <span className="system-message">
                    {props.clientName + " has joined the room"}
                </span>
            </div>
        )
    } else if (props.msgTime === "false") {
        return (
            <div className="chat-message-bubble-system">
                <span className="system-message">
                    {props.clientName + " has left the room"}
                </span>
            </div>
        )
    } else {
        return (
            <div className="chat-message-bubble-user">
                <span className="chat-message">
                    {props.clientName + ": " + props.clientMessage}
                </span>
                <br/>
                <span className="chat-message-time">
                        {"Sent at " + props.msgTime}
                </span>
            </div>
        )
    }
}