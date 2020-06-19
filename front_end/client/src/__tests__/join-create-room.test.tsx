import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import { ChatMessageItem } from "../components/video-room/chat-app/chat-message-item";
import { ChatApp } from "../components/video-room/chat-app/chat-app";
import App from '../App';
import { render } from '@testing-library/react';
import { JoinCreateRoomPageR } from '../components/join-create-room/join-create-room-page';
import { Provider } from 'react-redux';
import { store } from '../store';

jest.mock('../App.tsx', () => "root");

const user = {
    id: 0,
    name: 'Michael'
};

const room = {
    id: 0,
    name: 'Testing0',
    video_id: '0',
    video_url: '0',
    video_state: '0'
}

const props = {
    users: [user],
    roomList: [room],
    currentUser: user,
    updateStatus: 'NOT_STARTED',
    setPageForward: () => null,
    setPageBackwards: () => null,
}

const setup = () => {
    return shallow(
      <Provider store={store}>
        <JoinCreateRoomPageR {...props}/>
      </Provider>
    )
};

describe('Join-Create-Room component', () => {

    test('Should render without errors', () => {
        const wrapper = setup();
    })

    test('Should render a list of rooms', () => {

    })

    test('Should test click for logging out', () => {
        
    })

    test('Should test click for joining room', () => {
        
    })

})
