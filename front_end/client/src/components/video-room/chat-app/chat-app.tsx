import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";

import { MessageDetail } from "../../../api/video-room-types";
import { store } from "../../../store";
import { sendMessageToServer } from '../../../store/video-room/video-room';
import useStyles from "../../styles";
import { ChatMessageInput } from "./chat-message-input";
import { ChatMessageItem } from "./chat-message-item";

/**
 * Represents the required properties of the ChatApp.
 */
export interface Prop {
    clientMessage: string;
    clientName: string;
    msgTime: string;
    messageHistory: MessageDetail[];
}

export const ChatApp = (props: Prop) => {
    const classes = useStyles();
    const [msg, setMessage] = useState("");
    const msgTime = new Date().toLocaleTimeString('en-US');
    const messagesEndRef = useRef(null);

    const sendMessageClick = (): void => {
        if (msg !== "") {
            store.dispatch(sendMessageToServer(msg, msgTime))
            setMessage('')
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    };

    useEffect(scrollToBottom, [props.messageHistory]);

    return(
        <div className={classes.chatApp}>
            <Typography className={classes.chatHeader}>
                ROOM CHAT
            </Typography>
            <div className={classes.displayMessage}>
                {
                    props.messageHistory && props.messageHistory.length !== 0 &&
                    (() => {
                        return props.messageHistory.map((message) => {
                            return (
                                <ChatMessageItem
                                clientMessage={message.chat_message}
                                clientName={message.chat_username}
                                msgTime={message.message_time}
                                />
                            )
                        })
                    })()
                }
                <div ref={messagesEndRef} />
            </div>
            <ChatMessageInput
                sendMessageClick={sendMessageClick}
                setMessage={setMessage}
                msg={msg}
            />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        clientMessage: state.videoRoom.clientMessage,
        clientName: state.videoRoom.clientName,
        msgTime: state.videoRoom.msgTime,
        messageHistory: state.videoRoom.messageHistory
    }
}

export const ChatAppR = connect(mapStateToProps)(ChatApp);
