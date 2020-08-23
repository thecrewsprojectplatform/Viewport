import React, { useLayoutEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { useMediaQuery, CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { VideoRoomApi } from "../api/video-room-api";
import { JoinCreateRoomPageR } from "./join-create-room/join-create-room-page";
import { LoginPageR } from "./login/login-page";
import { VideoRoomPageR } from "./video-room/video-room-page";


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
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(
        () =>
        createMuiTheme({
            palette: {
            type: prefersDarkMode ? 'dark' : 'light',
            },
        }),
        [prefersDarkMode],
    );

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
        // any child can access the api
        // provider is saying anyone can access this thing
        // value = setting the thing people can access
        <ApiContext.Provider value={api}>
            <ThemeProvider theme={theme}>
            <CssBaseline/>
                <Switch>
                    <Route path="/rooms/:videoRoomId" component={VideoRoomPageR} />
                    <Route path="/rooms" component={JoinCreateRoomPageR} />
                    <Route path="/" component={LoginPageR} />
                </Switch>
            </ThemeProvider>
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