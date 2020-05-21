import React, { useContext, useEffect, constructor } from "react";
import io from "socket.io-client";
import { store } from '../../store';
import { getRoomUsers, createUserAndAddToRoom, removeUserFromRoom, VideoRoomState } from '../../store/video-room/video-room';
import { VideoRoomApi } from "../../api/video-room-api";
import { ApiContext } from "..";
import { User, ChatMessage, ChatHistory } from "../../api/video-room-types";
import { UserListItem } from './user-list-item';
import { Status } from "../../store/video-room/video-room"
import { render } from "react-dom";
import { connect } from "react-redux";

/**
 * Represents the required properties of the ChatApp.
 */
export interface Prop {
    message: ChatMessage[];
    chatHistory: ChatHistory[];
}

class ChatApp extends React.Component<Prop, any> {
    socket: any;
    sendMessage: (e: any) => void;

    // Add constructor to initiate
    constructor(props: Prop) {
        super(props);
        this.state = {
            msg: props.message,
            messages_list: props.chatHistory,
            //chatUsers: []
        };

        this.socket = io('localhost:5000');
        
        // once messages are received
        this.socket.on('message response', function(data) {
            addMessage(data);
        });

        // appending newly put messages into the messages list.
        const addMessage = data => {
            this.setState(prevState => ({
                messages_list: prevState.message_list.concat(data),
                //chatUsers: prevState.chatUsers.concat(data)
            }))
        };

        // every time someone clicks 'Send Message:
        this.sendMessage = e => {
            e.preventDefault();
            // sending a message and user that sent the message
            // under event name 'chat msg' along with the data
            this.socket.emit('chat message', {
                chat_message: this.state.msg,
                //user_list: this.state.username
        })
        
        // input is cleared, so user can write another message
        this.setState({msg: ''});
        }
    }

    render () {

        return(
            <div>
                <div className="display_message">
                    {this.state.messages_list.map(message_v => {
                        return (
                        <div>{message_v.chat_message}</div>
                        )
                    })}
                </div>
                <input 
                    type="text" 
                    placeholder="Type message..." 
                    className="form-control"
                    value={this.state.msg} 
                    onChange={e => this.setState({msg: e.target.value})}/>
                <br/>
                <button 
                    onClick={this.sendMessage} 
                    className="btn btn-primary form-control">Send
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state: VideoRoomState) => {
    return {
        roomId: state.roomId,
        users: state.users,
        message: state.message,
        chatHistory: state.chatHistory,
        updateStatus: state.updateStatus,
    }
}

export default ChatApp && connect(mapStateToProps)(ChatApp);

/*
// Add constructor to initiate
    constructor(props) {
        super(props);
        this.state = {
            username:  props.chatUser,
            msg: '',
            messages_list: [],
            //chatUsers: []
        };

        this.socket = io('localhost:5001');
        
        // once messages are received
        this.socket.on('message response', function(data) {
            addMessage(data);
        });

        // appending newly put messages into the messages list.
        // this needs to be saved into ChatHistory
        const addMessage = data => {
            this.setState(prevState => ({
                chatHistory: prevState.messages_list.concat(data),
                //chatUsers: prevState.chatUsers.concat(data)
            }))
        };

        // every time someone clicks 'Send Message:
        // this needs to be saved into ChatMessage
        this.sendMessage = e => {
            e.preventDefault();
            // sending a message and user that sent the message
            // under event name 'chat msg' along with the data
            this.socket.emit('chat message', {
                chat_message: this.state.msg,
                authors: this.state.username
        })
        
        // input is cleared, so user can write another message
        this.setState({msg: ''});
        }
    }


    return(
        <div>
            <div className="display_message">
                {this.state.messages_list.map(message_v => {
                    return (
                    <div>{message_v.user_list}:{message_v.chat_message}</div>
                    )
                })}
            </div>
            <input 
                type="text" 
                placeholder="Type message..." 
                className="form-control"
                value={this.state.msg} 
                onChange={e => this.setState({msg: e.target.value})}/>
            <br/>
            <button 
                onClick={this.sendMessage} 
                className="btn btn-primary form-control">Send
            </button>
        </div>
    );
*/