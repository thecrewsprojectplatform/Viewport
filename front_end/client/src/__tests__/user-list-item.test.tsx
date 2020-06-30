import React from 'react';
import { shallow } from 'enzyme';
import { User } from '../api/video-room-types';
import { UserListItem } from '../components/video-room/user-list/user-list-item';

jest.mock('../App.tsx', () => "root");

const users: User = {
    id: 1,
    name: 'tester',
};

describe('Userlist Item component', () => {

    test('Should render without errors', () => {
        const mockClick = jest.fn();
        const wrapper = shallow(
            <UserListItem
                user= {users}
                isCurrentUser= {true}
                onEditClick= {mockClick}
            />
        );
        expect(wrapper.exists()).toBe(true);
    })

    test('Should test onEditClick', () => {
        const mockClick = jest.fn();
        const wrapper = shallow(
            <UserListItem
                user= {users}
                isCurrentUser= {true}
                onEditClick= {mockClick}
            />
        );
        expect(mockClick).toHaveBeenCalledTimes(0);
        const onClick = wrapper.find('EditIcon');
        onClick.simulate('click');
        expect(mockClick).toHaveBeenCalledTimes(1);
    })

})
