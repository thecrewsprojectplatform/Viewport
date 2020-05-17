import React from 'react';
import UserList from './userList';

/**
 * PLACEHOLDER
 * 
 * Initial set of users for now.
 */
let init_users = [
  {id: 0, name: "Michael"},
  {id: 1, name: "Eric"},
  {id: 2, name: "Sung"},
  {id: 3, name: "Andrew"}
];

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
      <div className="App">
        <header className="App-header">
          <h2>
            Multimedia Platform
          </h2>
        </header>
          <div className="row">
            <span className="Video-section">YouTube videos go here</span>
            <UserList users={init_users}/>
          </div>
      </div>
    );
  }
}

export default App;
