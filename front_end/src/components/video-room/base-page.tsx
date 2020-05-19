import React, { useEffect, useContext, useState } from "react";
import { connect } from "react-redux";
import { createRoomAction } from "../../store/video-room/video-room";
import { ApiContext } from ".";
import { VideoRoomApi } from "../../api/video-room-api";
import { store } from "../../store";
import { UserListR } from "./user-list";
import { VideoRoomPageR } from "../video-room-page";
import { HomePage } from "../home-page";
import { JoinCreateRoomPageR } from "../join-create-room-page";
import { User } from "../../api/video-room-types";

enum PageType {
  LoginPage="LOGIN_PAGE",
  JoinCreateRoomPage="JOIN_CREATE_ROOM_PAGE",
  VideoRoomPage="VIDEO_ROOM_PAGE"
}

export interface Prop {
    roomId: string;
    user: User;
}

const BasePage = (props: Prop) => {
    const api = useContext<VideoRoomApi>(ApiContext);

    useEffect(() => {
        if (props.roomId === null) {
            store.dispatch(createRoomAction(api, "New Room"));
        }
    }, [props.roomId])


    const [pageType, setPageType] = useState(PageType.LoginPage);

    console.log(props.user);
    return (
        <div className="App">
        <header className="App-header">
          <h2>
            Multimedia Platform
          </h2>
        </header>
        
        {(() => {
          //code goes here
          switch (pageType) {
            case PageType.LoginPage:
              return <HomePage setPage={() => setPageType(PageType.JoinCreateRoomPage)}/>
            case PageType.JoinCreateRoomPage:
              return <JoinCreateRoomPageR setPage={() => setPageType(PageType.VideoRoomPage)} />
            case PageType.VideoRoomPage:
              return <VideoRoomPageR />
          }
        })()}
      </div>
    )
}

const mapStateToProps = state => {
    return {
        roomId: state.roomId,
        user: state.user,
    }
}

export const BasePageR = connect(mapStateToProps)(BasePage);