import React from 'react';
import { shallow } from 'enzyme';
import { Video } from '../api/video-room-types';
import { Playlist } from '../components/playlist/playlist';

const video: Video = {
    userId: 1,
    url: ""
};

const props = {
    playlist: [video]
};

const setup = () => {
    return shallow(
        <Playlist {...props}/>
    );
};

const wrapper = setup();

describe('Playlist Main component', () => {
    
    test('Should render without errors', () => {
        expect(wrapper.exists()).toBe(true);
    })
})