import React from 'react';
import User from './user';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: props.users.map((u) => <User key={u.id} name={u.name} onClick={() => this.handleClick(u.id)}/>),
            help: 22
        };
    }

    handleClick(id) {
        const idx = this.state.users.indexOf();
        console.log(idx);
        if (idx > -1) {
            this.setState(prevState => ({
                users: prevState.users.splice(idx, 1)
            }));
        }
    }

    render() {
        return (
            <div>
                {this.state.users}
            </div>
        );
    }
}

export default UserList;