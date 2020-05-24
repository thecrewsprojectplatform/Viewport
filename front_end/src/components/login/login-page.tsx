import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { createUser } from "../../store/video-room/video-room";
import { ApiContext } from "..";
import { VideoRoomApi } from "../../api/video-room-api";
import { store } from "../../store";

/**
 * Represents the required properties of the LoginPage.
 */
export interface Prop {
    setPage: () => void;
}

/**
 * Represents the login page. Users input their username in a textbox and
 * go to the join/create room page.
 * 
 * @param {Object} props An object representing the require properties of
 *                 the login page. Contains a setPage function.
 * @returns {JSX.Element} The JSX representing the login page.
 */
export const LoginPage = (props: Prop) => {
    const [newUserName, setNewUserName] = useState("");
    const api = useContext<VideoRoomApi>(ApiContext);

    const createNewUserClick = (): void => {
        store.dispatch(createUser(api, newUserName));
    }
    
    return (
        <div>
            {
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
            />}
        </div>
    )
}

/**
 * Used to connect the state of the overall front end to the LoginPage.
 * 
 * @param {Object} state The current state of the LoginPage.
 */
const mapStateToProps = state => {
    return {
        
    }
}

export const LoginPageR = connect(mapStateToProps)(LoginPage);