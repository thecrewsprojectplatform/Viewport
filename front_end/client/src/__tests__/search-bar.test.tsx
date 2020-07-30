import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import { Room, User } from '../api/video-room-types';
import { SearchBar } from '../components/video-room/video-player/search-bar';

const room: Room = {
    id: 0,
    name: 'testing',
}

const user: User = {
    id: 0,
    name: 'testing',
}

describe('SearchBar component', () => {

    let wrapper;
    let mockClick;

    beforeEach(() => {
        jest.mock('../App.tsx', () => "root")
        mockClick = jest.fn();
        wrapper = shallow(
            <SearchBar
                sendUrlToServer={mockClick}
                currentRoom={room}
                user={user}
            />
        )
    })

    afterEach(() => {
        jest.clearAllMocks
    })

    test('Should render without errors', () => {
        expect(wrapper.exists()).toBe(true);
    })
})