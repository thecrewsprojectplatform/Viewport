import React from 'react';
import { shallow } from 'enzyme';
import { Room } from "../api/video-room-types";
import { RoomList } from '../components/join-create-room/room-list';
import { RoomListItem } from '../components/join-create-room/room-list-item';

jest.mock('../App.tsx', () => "root")

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
}
const props = {
    currentRoom: roomDetail,
    availableRooms: [roomDetail, roomDetail],
    user: { id: 1, name:'tester' },
    updateStatus: Status.NotStarted, 
}

const setup = () => {
    return shallow(
        <RoomList {...props} />
    )
};
  
const wrapper = setup();
console.log(wrapper.debug())

describe('Room list component', () => {
    test('Should render without errors', () => {
        expect(wrapper.exists()).toBe(true);  
    })

    // we want to simulate onSubmit and check if the createNewRoomClick method is called
    // but we have to mock the createNewRoomClick method
    // but we can't pass the mock function as a prop atm cause it is not part of 
    // roomlist prop.
    test('Should test createNewRoomClick', () => {
        /*
        const fakeEvent = { preventDefault: () => console.log('preventDefault') };
        const loginComponent = shallow(<RoomList {...props} />);
        expect(loginComponent.find('form').length).toBe(1);
        loginComponent.find('.form').simulate('submit', fakeEvent);
        expect(loginComponent.find(Notification).length).toBe(1);
        */
    })

    test('Should test onchange event with setNewRoomName', () => {
        
    })

    test('should render RoomListItem', () => {
        expect(wrapper.find(RoomListItem)).toHaveLength(1)
    });

    test('Should test correct number of roomlist displayed', () => {
        expect(wrapper.at(0).find(RoomListItem)).toHaveLength(2)
    })


})
