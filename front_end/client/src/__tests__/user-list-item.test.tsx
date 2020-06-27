import React from 'react';
import { shallow } from 'enzyme';
import { User } from '../api/video-room-types';
import { UserListItem } from '../components/video-room/user-list/user-list-item';

const users: User = {
    id: 1,
    name: 'tester',
};

describe('Userlist Item component', () => {

    let wrapper;
    let mockClick;

    beforeEach(() => {
        jest.mock('../App.tsx', () => "root")
        mockClick = jest.fn();
        wrapper = shallow(
            <UserListItem
                user={users}
                isCurrentUser={true}
                onEditClick={mockClick}
            />
        )
    })

    afterEach(() => {
        jest.clearAllMocks
    })

    test('Should render without errors', () => {
        expect(wrapper.exists()).toBe(true);  
    })

    test('Should test onEditClick', () => {
        expect(mockClick).toHaveBeenCalledTimes(0);

        const onClick = wrapper.find('EditIcon');
        onClick.simulate('click')

        expect(mockClick).toHaveBeenCalledTimes(1);
    })

})
