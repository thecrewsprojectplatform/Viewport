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
  videoVolume: 0,
}

const room: Room = {
    id: 0,
    name: 'testing',
}

describe('VideoController component', () => {

    let wrapper;
    let mockClick1;
    let mockClick2;
    let mockClick3;

    beforeEach(() => {
        jest.mock('../App.tsx', () => "root")
        mockClick1 = jest.fn();
        mockClick2 = jest.fn();
        mockClick3 = jest.fn();
        wrapper = shallow(
            <VideoController
                setSeeking={mockClick1}
                sendVideoTime={mockClick2}
                updateVideoTime={mockClick3}
                currentRoom={room}
                player={player}
                seeking={true}
                reactPlayer={null}
                sliderVideoTime={0}
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
      expect(mockClick3).toHaveBeenCalledTimes(0);
      const input = wrapper.find(Slider);
      input.simulate('change', fakeEvent);
      expect(mockClick1).toHaveBeenCalledTimes(1);
      expect(mockClick2).toHaveBeenCalledTimes(1);
      expect(mockClick3).toHaveBeenCalledTimes(1);
  })
})