import React from 'react';
import { shallow } from 'enzyme';
import { ChatApp } from "../components/video-room/chat-app/chat-app";
import { ChatMessageItem } from "../components/video-room/chat-app/chat-message-item";
import { ChatMessageInput } from '../components/video-room/chat-app/chat-message-input';
import TextField from '@material-ui/core/TextField';

jest.mock('../App.tsx', () => "root")

describe('ChatMessageInput component', () => {

    test('Should render without errors', () => {
        const mockClick = jest.fn();
        const mockMessage = jest.fn();
        const wrapper = shallow(
            <ChatMessageInput
                sendMessageClick={mockClick}
                setMessage={mockMessage}
                msg={'test message'}
            />
        )
        expect(wrapper.exists()).toBe(true);  
    })

    test('Should test sendMessageClick', () => {
        /*
        const fakeEvent = { preventDefault: () => console.log('preventDefault') };
        const mockClick = jest.fn();
        const mockMessage = jest.fn();
        const wrapper = shallow(
            <ChatMessageInput
                sendMessageClick={mockClick}
                setMessage={mockMessage}
                msg={'test message'}
            />
        )
        expect(mockClick).toHaveBeenCalledTimes(0);
        const onClick = wrapper.find(TextField);
        onClick.simulate('click', fakeEvent)
        expect(mockClick).toHaveBeenCalledTimes(1);
        */
    })

    test('Should test handleChange when message is typed', () => {

    })
})
