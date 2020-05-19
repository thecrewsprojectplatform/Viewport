import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import { createRoomAction } from "../../store/video-room/video-room";
import { ApiContext } from ".";
import { VideoRoomApi } from "../../api/video-room-api";
import { store } from "../../store";
import { UserListR } from "./user-list";

export interface Prop {
    roomId: string;
}

const BasePage = (props: Prop) => {
    const api = useContext<VideoRoomApi>(ApiContext);

    useEffect(() => {
        if (props.roomId === null) {
            store.dispatch(createRoomAction(api, "New Room"));
        }
    }, [props.roomId])


    return (
        <div className="App">
        <header className="App-header">
          <h2>
            Multimedia Platform
          </h2>
        </header>
          <div className="row">
            <span className="Video-section">YouTube videos go here</span>
            <UserListR />
          </div>
      </div>
    )
}

const mapStateToProps = state => {
    return {
        roomId: state.roomId,
    }
}

export const BasePageR = connect(mapStateToProps)(BasePage);