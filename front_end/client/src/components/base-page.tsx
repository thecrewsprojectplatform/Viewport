import React, { useState } from "react";
import { connect } from "react-redux";
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

    const [pageType, setPageType] = useState(PageType.LoginPage);

    return (
        <div className="App">
            <header className="App-header">
                <h2>
                    Multimedia Platform
                </h2>
            </header>

        {(() => {
            switch (pageType) {
                case PageType.LoginPage:
                    return <LoginPageR setPage={() => setPageType(PageType.JoinCreateRoomPage)}/>
                case PageType.JoinCreateRoomPage:
                    return <JoinCreateRoomPageR setPageForward={() => setPageType(PageType.VideoRoomPage)}
                                                setPageBackwards={() => setPageType(PageType.LoginPage)} />
                case PageType.VideoRoomPage:
                    return <VideoRoomPageR setPageBackwards={() => setPageType(PageType.JoinCreateRoomPage)} />
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

const mapStateToProps = state => {
    return {
        roomId: state.roomId,
        user: state.user,
    }
}

export const BasePageR = connect(mapStateToProps)(BasePage);