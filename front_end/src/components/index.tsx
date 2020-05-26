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

// creating ApiContext that can be passed through
// all child components
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
    // to show the website
    const [showPage, setShowPage] = useState(false);

    // useLayoutEffect only happens after rendering
    // has a function and a list.
    // whenever the value in the list changes, call the function.
    // this is to create an api once for the entire app and store it.
    // this is to prevent multiple apis being created for the app.
    useLayoutEffect(() => {
        // create the video room api
        const videoRoomApi = new VideoRoomApi();
        // setting the api to the video room api
        setApi(videoRoomApi);
        // wait 0 seconds and set the function inside.
        setTimeout(() => {
            setShowPage(true);
        }, 0);
    }, [])

    if (!showPage) {
        return <div></div>
    }

    return (
        // any child can access the api
        // provider is saying anyone can access this thing
        // value = setting the thing people can access
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