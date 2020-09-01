import { Button, List } from '@material-ui/core';
import { KeyboardTab } from '@material-ui/icons';
import React from 'react';
import { User } from "../../../api/video-room-types";
import "../toggle-display.scss";
import { UserListItem } from './user-list-item';
import "./user-list.scss";

/**
 * Represents the required properties of the UserList.
 */
export interface Prop {
    users: User[];
    currentUser: User;
    onEditClick: () => void;
    toggleUserList: () => void;
}

/**
 * Represents a list of users currently watching a video together.
 *
 * @param {Object} props The properties of a UserList.
 *                 Requires an array of user objects which
 *                 contains the id and name of a user, a roomId
 *                 which is the id of the current room, and the
 *                 updateStatus that holds the current state of the
 *                 web application.
 * @returns {JSX.Element} The JSX representing the UserList.
 */
export const UserList = (props: Prop) => {
    return (
        <div className="user-list" id="user-list">
            <div className="user-list-header">
                <Button onClick={props.toggleUserList} className="toggle-display-user">
                    <KeyboardTab />
                </Button>
                USERS
            </div>
            <List className="user-list-content">
            {
                props.users && props.users.length !== 0 &&
                (() => {
                    return props.users.sort(function (a, b) {
                            return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
                        }).map((user) => {
                        return (
                            <UserListItem
                                key={user.id}
                                user={user}
                                isCurrentUser={user.id === props.currentUser.id}
                                onEditClick={props.onEditClick}
                            />
                        )
                    })
                })()
            }
            </List>
        </div>
    )
}