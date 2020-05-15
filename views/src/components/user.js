import React from 'react';

function User(props) {
    return (
        <div className="User">
            <button onClick={props.onClick}>{"Remove"}</button>
            <span>{props.name}</span>
        </div>
    );
}

export default User;