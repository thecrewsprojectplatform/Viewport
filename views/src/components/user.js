import React from 'react';

/**
 * Outputs the JSX for a User in our current UserList.
 * 
 * @param {Object} props The properties of a User.
 * @returns {JSX.Element} The current layout of the User.
 */
function User(props) {
    return (
        <div className="User">
            <span className="User-name">{props.name}</span>
            <button className="Remove-button" onClick={props.onClick}>{"Remove"}</button>
        </div>
    );
}

export default User;