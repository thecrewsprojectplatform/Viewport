import React from 'react';
import { shallow } from 'enzyme';
import { Room } from "../api/video-room-types";
import { RoomListItem } from '../components/join-create-room/room-list-item';
import ListItem from '@material-ui/core/ListItem';

const roomDetail: Room = {
    id: 1,
    name: 'tester',
    video_id: 'test id',
    video_url: 'test.com',
    video_state: 'test state',
    video_time: 1,
    video_length: 1
};

describe('Roomlist Item component', () => {

    let wrapper;
    let mockClick;

    beforeEach(() => {
        jest.mock('../App.tsx', () => "root")
        mockClick = jest.fn();
        wrapper = shallow(
            <RoomListItem
                currentRoom={roomDetail}
                onJoinClick={mockClick}
            />
        )
    })

    afterEach(() => {
        jest.clearAllMocks
    })

    test('Should render without errors', () => {
        expect(wrapper.exists()).toBe(true);
    })

    test('Should test onJoinRoomClick', () => {
        const fakeEvent = { preventDefault: () => {} };
        expect(mockClick).toHaveBeenCalledTimes(0);

        const onClick = wrapper.find(ListItem);
        onClick.simulate('click', fakeEvent)

        expect(mockClick).toHaveBeenCalledTimes(1);
    })

})
