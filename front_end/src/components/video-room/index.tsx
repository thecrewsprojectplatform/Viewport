import React, { useState, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { VideoRoomApi } from "../../api/video-room-api";
import { BasePageR } from "./base-page";

interface Prop {

}

export const ApiContext = React.createContext(null);

const VideoRoomRouter = (props: Prop) => {
    const [api, setApi] = useState(null as VideoRoomApi);
    const [showPage, setShowPage] = useState(false);

    useLayoutEffect(() => {
        const videoRoomApi = new VideoRoomApi();
        setApi(videoRoomApi);
        setTimeout(() => {
            setShowPage(true);
        }, 0);
    }, [])

    if (!showPage) {
        return <div></div>
    }

    return (
        <ApiContext.Provider value={api}>
            <Switch>
                <Route path="" component={BasePageR} />
            </Switch>
        </ApiContext.Provider>
    )
}

const mapStateToProps = state => {
    return {

    }
}

export const VideoRoomRouterR = connect(mapStateToProps)(VideoRoomRouter);