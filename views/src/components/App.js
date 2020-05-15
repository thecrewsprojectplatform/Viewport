import React from 'react';
import UserList from './userList';

let init_users = [
  {id: 0, name: "Michael"},
  {id: 1, name: "Eric"},
  {id: 2, name: "Sung"},
  {id: 3, name: "Andrew"}
];

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            Multimedia Platform
          </h1>
        </header>

        <UserList users={init_users}/>
      </div>
    );
  }
}

export default App;
