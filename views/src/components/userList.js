import React from 'react';
import User from './user';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: props.users,
            openId: props.users.length
        };
        
        // Allows for the button events passed to the users to affect the list
        this.handleClick = this.handleClick.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    handleClick(id) {
        this.setState(prevState => ({
            users: prevState.users.filter(user => user.id !== id)
        }));
        
    }

    addUser(event) {
        const name = document.getElementById("Add-user").value;

        if(event.keyCode === 13 && name !== "") {
            event.preventDefault();
            
            // Placeholder id 
            const id = this.state.openId;

            this.setState(prevState => ({
                users: prevState.users.concat({id: id, name: name}),
                openId: prevState.openId++
            }));

            document.getElementById("Add-user").value = "";
        }
    }

    render() {
        const userList = this.state.users.map((user) => 
            <User key={user.id} 
                  name={user.name} 
                  onClick={() => this.handleClick(user.id)} />
        );

        return (
            <div className="User-list">
                <input type="text" 
                       placeholder="Enter username..." 
                       id="Add-user" 
                       onKeyDown={(event) => this.addUser(event)}/>
                {userList}
            </div>
        );
    }
}

export default UserList;