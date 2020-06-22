import React from 'react';
import { BrowserRouter  as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from "./store";
import { BasePageRouterR } from "./components";
import { VideoRoomApi } from "./api/video-room-api";
import configureSocket from '../src/components/video-room/chat-app/socket'

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
      <Provider store={store}>
        <Router>
          <Route path="/" component={BasePageRouterR} />
        </Router>
      </Provider>
    );
  }
}

export default App;