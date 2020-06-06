import React, { useState } from "react";
import { VideoRoomState, sendMessageToServer } from '../../../store/video-room/video-room';
import { connect } from "react-redux";
import { ChatMessageItem } from "./chat-message-item";
import { store } from "../../../store";
import { MessageDetail } from "../../../api/video-room-types";

/**
 * Represents the required properties of the ChatApp.
 */
export interface Prop {
    clientMessage: string;
    clientName: string;
    messageHistory: MessageDetail[];
}

export const ChatApp = (props: Prop) => {
    const [msg, setMessage] = useState("");

    const sendMessageClick = (): void => {
        store.dispatch(sendMessageToServer(msg))
        setMessage('')
    };

    return(
        <div>
            <div className="display_message">
                {
                    props.messageHistory && props.messageHistory.length !== 0 &&
                    (() => {
                        return props.messageHistory.map((message) => {
                            return (
                                <ChatMessageItem
                                clientMessage={message.chat_message}
                                clientName={message.chat_username}
                                />
                            )
                        })
                    })()
                }
            </div>
            <input 
                type="text" 
                placeholder="Type message..." 
                className="form-control"
                value={msg} 
                onChange={event => setMessage(event.target.value)}
            />
            <button 
                onClick={sendMessageClick} 
                className="btn btn-primary form-control">Send
            </button>
            <br/>
        </div>
    ) 
}

const mapStateToProps = (state: VideoRoomState) => {
    return {
        clientMessage: state.clientMessage,
        clientName: state.clientName,
        messageHistory: state.messageHistory
    }
}

export const ChatAppR = connect(mapStateToProps)(ChatApp);