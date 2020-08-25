import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter  as Router, Route } from "react-router-dom";
import configureSocket from '../src/components/video-room/chat-app/socket'
import { VideoRoomApi } from "./api/video-room-api";
import { BasePageRouterR } from "./components";
import { store } from "./store";
import { StylesProvider } from '@material-ui/core/styles';

export const socket = configureSocket(store.dispatch, new VideoRoomApi)

/**
 * @constructor App representing the current front end for our application.
 */
class App extends React.Component {
  /**
   * Renders the application with React.
   *
   * @returns {JSX.Element} The current layout of our application.
   */
  render() {
    return (
      <StylesProvider injectFirst>
        <Provider store={store}>
          <Router>
            <Route path="/" component={BasePageRouterR} />
          </Router>
        </Provider>
      </StylesProvider>
    );
  }
}

export default App;