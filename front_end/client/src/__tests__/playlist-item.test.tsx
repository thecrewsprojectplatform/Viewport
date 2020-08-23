import React from 'react';
import { shallow } from 'enzyme';
import { PlaylistItem } from '../components/playlist/playlist-item';
import { Video, Room, User } from '../api/video-room-types';
import { IconButton, ListItemText } from '@material-ui/core';

const video: Video = {
    userId: 1,
    url: ""
};

const roomDetail: Room = {
    id: 1,
    name: 'tester',
};

const user: User = {
    id: 1,
    name: 'tester',
};

const props = {
    video: video,
    currentRoom: roomDetail,
    user: user
};

describe('Playlist Item component', () => {
    let wrapper;
    let mockDeleteClick;
    let mockSendUrl;

    beforeEach(() => {
        mockDeleteClick = jest.fn();
        mockSendUrl = jest.fn();
        wrapper = shallow(
            <PlaylistItem deleteVideo={mockDeleteClick} sendUrlToServer={mockSendUrl} {...props}/>
        )
    })

    afterEach(() => {
        jest.clearAllMocks
    })

    test('Should render without errors', () => {
        expect(wrapper.exists()).toBe(true);
    })

    test('Should test url text click', () => {
        expect(mockSendUrl).toHaveBeenCalledTimes(0);

        const onClick = wrapper.find(ListItemText);
        onClick.simulate('click')

        expect(mockSendUrl).toHaveBeenCalledTimes(1);
    })

    test('Should delete button', () => {
        expect(mockDeleteClick).toHaveBeenCalledTimes(0);

        const onClick = wrapper.find(IconButton);
        onClick.simulate('click')

        expect(mockDeleteClick).toHaveBeenCalledTimes(1);
    })
})