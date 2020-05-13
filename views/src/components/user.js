import React from 'react';

function User(props) {
    return (
        <div className="user">
            <span>{props.name}</span>
            <button onClick={props.onClick}>{"Remove"}</button>
        </div>
    );
}

export default User;