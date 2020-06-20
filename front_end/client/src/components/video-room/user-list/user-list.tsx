import React from 'react';
import { User } from "../../../api/video-room-types";
import { UserListItem } from './user-list-item';
import { List, Typography } from '@material-ui/core';
import useStyles from '../../styles';

/**
 * Represents the required properties of the UserList.
 */
export interface Prop {
    users: User[];
    currentUser: User;
    onEditClick: () => void;
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
    const classes = useStyles();

    return (
        <div className={classes.userList}>
            <Typography className={classes.userListHeader}>
                ACTIVE USERS
            </Typography>
            <List className={classes.userListContent}>
            {
                props.users && props.users.length !== 0 &&
                (() => {
                    return props.users.map((user) => {
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