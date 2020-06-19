import React, { useState, useRef, useEffect } from "react";
import { VideoRoomState, sendMessageToServer } from '../../../store/video-room/video-room';
import { connect } from "react-redux";
import { ChatMessageItem } from "./chat-message-item";
import { store } from "../../../store";
import { MessageDetail } from "../../../api/video-room-types";
import { TextField, Typography } from "@material-ui/core";
import useStyles from "../../styles";
import PropTypes from "prop-types";

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

    const sendMessageClick = (event): void => {
        if ((event.key === 'Enter') && (msg !== "")) {
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
            <div className={classes.typingSection}>
                <TextField
                    type="text"
                    placeholder="Send a message..."
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
            </div>
        </div>
    )
}

const mapStateToProps = (state: VideoRoomState) => {
    return {
        clientMessage: state.clientMessage,
        clientName: state.clientName,
        msgTime: state.msgTime,
        messageHistory: state.messageHistory
    }
}

export const ChatAppR = connect(mapStateToProps)(ChatApp);
