import React, { useState, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { VideoRoomApi } from "../api/video-room-api";
import { BasePageR } from "./base-page";

/**
 * Represents the required properties of the BasePageRouter.
 */
interface Prop {

}

export const ApiContext = React.createContext(null);

/**
 * Routes the App to the BasePage.
 * 
 * @param {Object} props An object representing the require properties of
 *                 the BasePage. Contains nothing.
 * @returns {JSX.Element} The JSX representing the BasePage.
 */
const BasePageRouter = (props: Prop) => {
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

/**
 * Used to connect the state of the overall front end to the BasePageRouter.
 * 
 * @param {Object} state The current state of the BasePageRouter.
 */
const mapStateToProps = state => {
    return {

    }
}

export const BasePageRouterR = connect(mapStateToProps)(BasePageRouter);