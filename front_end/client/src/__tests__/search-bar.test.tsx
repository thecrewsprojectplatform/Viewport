import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import { Room, User } from '../api/video-room-types';
import { SearchBar } from '../components/playlist/search-bar';

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
    let mockFn = jest.fn();

    beforeEach(() => {
        jest.mock('../App.tsx', () => "root")
        mockClick = jest.fn();
        wrapper = shallow(
            <SearchBar
                addVideo={mockFn}
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