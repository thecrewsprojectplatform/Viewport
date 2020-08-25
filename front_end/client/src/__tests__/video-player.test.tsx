import React from 'react';
import { shallow } from 'enzyme';
import { Room, User, Player } from "../api/video-room-types";
import { VideoPlayer } from "../components/video-room/video-player/video-player";
import { PlayButtonR } from '../components/video-room/video-player/play-button';
import { VideoControllerR } from '../components/video-room/video-player/video-controller';
import { PlaylistButton } from '../components/playlist/playlist-button';

const roomDetail: Room = {
    id: 1,
    name: 'tester',
};

const users: User = {
    id: 1,
    name: 'tester',
};

const players: Player = {
    videoUrl: 'test url',
    videoState: 'test state',
    videoTime: 1,
    videoLength: 2,
    videoVolume: 0,
}

const props = {
    currentRoom: roomDetail,
    player: players,
    user: users,
    seeking: true
};

const setup = () => {
    let mockFn = jest.fn();

    return shallow(
        <VideoPlayer
            sendVideoState={mockFn}
            sendVideoTime={mockFn}
            currentRoom={props.currentRoom}
            player={props.player}
            user={props.user}
            seeking={props.seeking}
        />
    );
};

const wrapper = setup();

describe('Video Room Page component', () => {

    test('Should render without errors', () => {
        expect(wrapper.exists()).toBe(true);
    })

    test('Should contain Playlist Button', () => {
        expect(wrapper.find(PlaylistButton).exists()).toBeTruthy()
    })


    test('Should contain PlayButton', () => {
        expect(wrapper.find(PlayButtonR).exists()).toBeTruthy();
    })


    test('Should contain VideoController', () => {
        expect(wrapper.find(VideoControllerR).exists()).toBeTruthy();
    })

})