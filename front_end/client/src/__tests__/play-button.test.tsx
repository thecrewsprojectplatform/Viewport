import React, { Component } from 'react';
import { shallow } from 'enzyme';
import { PlayButton } from '../components/video-room/video-player/play-button';
import { Player, Room } from '../api/video-room-types';
import { Button } from '@material-ui/core';

const player: Player = {
    videoUrl: 'testing',
    videoState: null,
    videoTime: 0,
    videoLength: 0,
}

const room: Room = {
    id: 0,
    name: 'testing',
}

const props = {
    player: player,
    currentRoom: room,
}

describe('PlayButton component', () => {

    let wrapper;
    let mockClick;

    beforeEach(() => {
        jest.mock('../App.tsx', () => "root")
        mockClick = jest.fn();
        wrapper = shallow(
            <PlayButton
                sendControl={mockClick}
                player={props.player}
                currentRoom={props.currentRoom}
            />
        )
    })

    afterEach(() => {
        jest.clearAllMocks
    })

    test('Should render without errors', () => {
        expect(wrapper.exists()).toBe(true);
    })

    test('Should test handlePausePlay', () => {
        const fakeEvent = { preventDefault: () => {} };
        expect(mockClick).toHaveBeenCalledTimes(0);

        const onClick = wrapper.find(Button);
        onClick.simulate('click', fakeEvent)

        expect(mockClick).toHaveBeenCalledTimes(1);
    })
})