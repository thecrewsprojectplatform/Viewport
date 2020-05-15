import React from 'react';
import User from './user';

/**
 * @class UserList representing a list of users currently watching a video together
 */
class UserList extends React.Component {
    /**
     * Creates an instance of a UserList.
     * 
     * @constructor
     * @param {Object} props The properties of a UserList.
     */
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

    /**
     * Removes a User with the given id from the UserList.
     * 
     * @param {number} id The id of the User to be deleted.
     */
    handleClick(id) {
        this.setState(prevState => ({
            users: prevState.users.filter(user => user.id !== id)
        }));
        
    }

    /**
     * Adds a User to the UserList once text has been written in the textbar
     * and the user has pressed the enter key.
     * 
     * @param {keydown} event The event we are listening for on the keyboard.
     */
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

    /**
     * Renders the UserList using React.
     * 
     * @returns {JSX.Element} The current layout of our UserList.
     */
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