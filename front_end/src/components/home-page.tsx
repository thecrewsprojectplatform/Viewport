import React, { useEffect, useContext, useState } from "react";
import { connect } from "react-redux";
import { createRoomAction, createUser } from "../store/video-room/video-room";
import { ApiContext } from "./video-room";
import { VideoRoomApi } from "../api/video-room-api";
import { store } from "../store";
import { UserListR } from "./video-room/user-list";

export interface Prop {
    setPage: () => void;
}

export const HomePage = (props: Prop) => {
    const [newUserName, setNewUserName] = useState("");
    const api = useContext<VideoRoomApi>(ApiContext);

    const createNewUserClick = (): void => {
        console.log("Created new user!")
        store.dispatch(createUser(api, newUserName));
    }
    
    return (
        <div>
            <input 
                type="text" 
                onChange={(event) => setNewUserName(event.target.value)} 
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        createNewUserClick();
                        props.setPage();
                    }
                }}
                value={newUserName}
            />
        </div>
    )
}