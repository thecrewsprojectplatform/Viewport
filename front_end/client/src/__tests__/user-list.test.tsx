import React from 'react';
import { shallow } from 'enzyme';
import { User } from '../api/video-room-types';
import { UserList } from '../components/video-room/user-list/user-list';
import { UserListItem } from '../components/video-room/user-list/user-list-item';

jest.mock('../App.tsx', () => "root");

const users: User = {
    id: 1,
    name: 'tester',
};

const props = {
    users: [users, users],
    currentUser: users,
    onEditClick: () => jest.fn()
};

const setup = () => {
    return shallow(
        <UserList {...props} />
    );
};

const wrapper = setup();

describe('Userlist component', () => {

    test('Should render without errors', () => {
        expect(wrapper.exists()).toBe(true);
    })

    test('should render UserListItem', () => {
        expect(wrapper.find(UserListItem).exists()).toBeTruthy();
    });

    test('Should test correct number of users displayed', () => {
        expect(wrapper.at(0).find(UserListItem)).toHaveLength(2);
    })

})
