import React from 'react';
import { shallow } from 'enzyme';
import { User, Room } from '../api/video-room-types';
import { EditUserModal } from "../components/video-room/user-list/edit-user-modal";

jest.mock('../App.tsx', () => "root");

const roomDetail: Room = {
    id: 1,
    name: 'tester',
};

const users: User = {
    id: 1,
    name: 'tester',
};

const props = {
    currentRoom: roomDetail, 
    currentUser: users,
    onClose: () => jest.fn()
};

const setup = () => {
    return shallow(
        <EditUserModal {...props} />
    );
};

const wrapper = setup();


describe('Edit User Modal component', () => {

    test('Should render without errors', () => {
        expect(wrapper.exists()).toBe(true);
    })

})