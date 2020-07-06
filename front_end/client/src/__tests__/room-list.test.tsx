import React from 'react';
import { shallow } from 'enzyme';
import { Room } from "../api/video-room-types";
import { RoomList } from '../components/join-create-room/room-list';
import { RoomListItem } from '../components/join-create-room/room-list-item';
import { CreateRoomInput } from '../components/join-create-room/create-room-input';

jest.mock('../App.tsx', () => "root");

const roomDetail: Room = {
    id: 1,
    name: 'tester',
    video_id: 'test id',
    video_url: 'test.com',
    video_state: 'test state',
    video_time: 1,
    video_length: 1
};

enum Status {
    NotStarted="NOT_STARTED",
    Running="RUNNING",
    Succeeded="SUCCEEDED",
    Failed="FAILED",
};

const props = {
    currentRoom: roomDetail,
    availableRooms: [roomDetail, roomDetail],
    user: { id: 1, name:'tester' },
    updateStatus: Status.NotStarted,
};

const setup = () => {
    return shallow(
        <RoomList {...props} />
    );
};

const wrapper = setup();

describe('Room list component', () => {

    test('Should render without errors', () => {
        expect(wrapper.exists()).toBe(true);
    })

    test('Should render createRoomInput', () => {
        expect(wrapper.find(CreateRoomInput).exists()).toBeTruthy();
    })

    test('should render RoomListItem', () => {
        expect(wrapper.find(RoomListItem).exists()).toBeTruthy();
    });

    test('Should test correct number of roomlist displayed', () => {
        expect(wrapper.at(0).find(RoomListItem)).toHaveLength(2);
    })

})
