import React from "react";
import { ChatMessage } from "../../../api/video-room-types";

interface Prop {
    message: ChatMessage;
}

export const ChatMessageItem = (props: Prop) => {
    return (
        <div className="message">
            <span className="message-name">{props.message}</span>
        </div>
    )
}