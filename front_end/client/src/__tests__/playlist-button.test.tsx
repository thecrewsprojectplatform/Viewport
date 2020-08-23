import React from 'react';
import { shallow } from 'enzyme';
import { PlaylistButton } from '../components/playlist/playlist-button';
import { Dialog } from '@material-ui/core/';

const setup = () => {
    return shallow(
        <PlaylistButton />
    );
}

const wrapper = setup();

describe('Playlist Button component', () => {
    test('Should render without errors', () => {
        expect(wrapper.exists()).toBe(true);
    })

    test('Should render Dialog', () => {
        expect(wrapper.find(Dialog)).toHaveLength(1);
    })
})