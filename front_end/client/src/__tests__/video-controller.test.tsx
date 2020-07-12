import React, { Component } from 'react';
import { shallow } from 'enzyme';
import { Room, Player } from '../api/video-room-types';
import { VideoController } from '../components/video-room/video-player/video-controller';
import { Slider } from '@material-ui/core';

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

describe('VideoController component', () => {

    let wrapper;
    let mockClick1;
    let mockClick2;

    beforeEach(() => {
        jest.mock('../App.tsx', () => "root")
        mockClick1 = jest.fn();
        mockClick2 = jest.fn();
        wrapper = shallow(
            <VideoController
                setSeeking={mockClick1}
                sendControl={mockClick2}
                currentRoom={room}
                player={player}
                seeking={true}
                reactPlayer={null}
            />
        )
    })

    afterEach(() => {
        jest.clearAllMocks
    })

    test('Should render without errors', () => {
        expect(wrapper.exists()).toBe(true);
    })

    test('Should test handleSeekChange', () => {
      const fakeEvent = {
          preventDefault: () => {},
          newTime: 0.0
      };
      expect(mockClick1).toHaveBeenCalledTimes(0);
      expect(mockClick2).toHaveBeenCalledTimes(0);
      const input = wrapper.find(Slider);
      input.simulate('change', fakeEvent);
      expect(mockClick1).toHaveBeenCalledTimes(2);
      expect(mockClick2).toHaveBeenCalledTimes(1);
  })
})