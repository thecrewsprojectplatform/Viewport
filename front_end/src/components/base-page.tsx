import React, { useEffect, useContext, useState } from "react";
import { connect } from "react-redux";
import { createRoomAction } from "../store/video-room/video-room";
import { ApiContext } from ".";
import { VideoRoomApi } from "../api/video-room-api";
import { store } from "../store";
import { VideoRoomPageR } from "./video-room/video-room-page";
import { LoginPageR } from "./login/login-page";
import { JoinCreateRoomPageR } from "./join-create-room/join-create-room-page";
import { User } from "../api/video-room-types";

/**
 * Represents the different pages our web application can render.
 */
enum PageType {
    LoginPage="LOGIN_PAGE",
    JoinCreateRoomPage="JOIN_CREATE_ROOM_PAGE",
    VideoRoomPage="VIDEO_ROOM_PAGE"
}

/**
 * Represents the required properties of the BasePage.
 */

export interface Prop {
    roomId: string;
    user: User;
}

/**
 * Represents the current page that the user is on. Users will start at
 * the login page first, then the join/create room page, and then the
 * actual room that contains the video and other users in the room.
 * 
 * @param {Object} props An object representing the require properties of
 *                 the BasePage. Contains a roomId string and a
 *                 User object.
 * @returns {JSX.Element} The JSX representing the current page.
 */
const BasePage = (props: Prop) => {
    const api = useContext<VideoRoomApi>(ApiContext);
    // happens right away
    // when a value in the list gets changed, call the function.
    /*useEffect(() => {
        if (props.roomId === null) {
            // send some action to the store
            // change the store -> change the prop
            // -> component rerenders.
            store.dispatch(createRoomAction(api, "New Room"));
        }
    }, [props.roomId])*/

    // creating useState to set login page as the first page.
    const [pageType, setPageType] = useState(PageType.LoginPage);

    return (
        <div className="App">
            <header className="App-header">
                <h2>
                    Multimedia Platform
                </h2>
            </header>

        {(() => {
            // Conditional rendering done here
            switch (pageType) {
                case PageType.LoginPage:
                    return <LoginPageR setPage={() => setPageType(PageType.JoinCreateRoomPage)}/>
                case PageType.JoinCreateRoomPage:
                    return <JoinCreateRoomPageR setPage={() => setPageType(PageType.VideoRoomPage)} />
                case PageType.VideoRoomPage:
                    return <VideoRoomPageR />
            }
        })()}
        </div>
    )
}

/**
 * Used to connect the state of the overall front end to the BasePage.
 * 
 * @param {Object} state The current state of the BasePage.
 */

// global state gets passed into this function.
// from that state, get the roomId and user as a prop.
// this function allows these props to be used in this file
const mapStateToProps = state => {
    console.log(state)
    return {
        roomId: state.roomId,
        user: state.user,
    }
}

// connect takes in mapStateToProps
// which returns a function that takes in the basepage
// which returns component that has all the correct props
export const BasePageR = connect(mapStateToProps)(BasePage);