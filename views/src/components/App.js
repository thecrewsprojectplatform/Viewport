import React from 'react';
import UserList from './userList';

let users = [
  {id: 1, name: "Michael"},
  {id: 2, name: "Sung"},
  {id: 3, name: "Andrew"},
  {id: 4, name: "Eric"}
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

        <UserList users={users}/>
      </div>
    );
  }
}

export default App;
