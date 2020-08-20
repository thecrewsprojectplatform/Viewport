import React from 'react';
import { shallow } from 'enzyme';
import { Room, User } from "../api/video-room-types";
import { VideoRoomPage } from "../components/video-room/video-room-page";
import { UserList } from '../components/video-room/user-list/user-list';
import { VideoPlayerR } from "../components/video-room/video-player/video-player";
import { ChatAppR } from '../components/video-room/chat-app/chat-app';
import NavBar from '../components/nav-bar';
import { EditUserModal } from '../components/video-room/user-list/edit-user-modal';

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
    roomList: [roomDetail, roomDetail],
    currentUser: users,
    users: [users, users],
};

const setup = () => {
    return shallow(
        <VideoRoomPage {...props} />
    );
};

const wrapper = setup();

describe('Video Room Page component', () => {

    test('Should render without errors', () => {
        expect(wrapper.exists()).toBe(true);
    })

    test('Should contain NavBar', () => {
        expect(wrapper.find(NavBar).exists()).toBeTruthy();
    })

    test('Should contain UserList', () => {
        expect(wrapper.find(UserList).exists()).toBeTruthy();
    })

        
    test('Should contain VideoPlayer', () => {
        expect(wrapper.find(VideoPlayerR).exists()).toBeTruthy();
    })

        
    test('Should contain ChatAppR', () => {
        expect(wrapper.find(ChatAppR).exists()).toBeTruthy();
    })
})