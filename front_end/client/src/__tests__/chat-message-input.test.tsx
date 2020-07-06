import React from 'react';
import { shallow } from 'enzyme';
import { ChatMessageInput } from '../components/video-room/chat-app/chat-message-input';
import TextField from '@material-ui/core/TextField';

jest.mock('../App.tsx', () => "root");

describe('ChatMessageInput component', () => {

    test('Should render without errors', () => {
        const mockClick = jest.fn();
        const mockMessage = jest.fn();
        const wrapper = shallow(
            <ChatMessageInput
                sendMessageClick= {mockClick}
                setMessage= {mockMessage}
                msg= {'test message'}
            />
        );
        expect(wrapper.exists()).toBe(true);
    })

    test('Should test sendMessageClick', () => {
        const fakeEvent = { preventDefault: () => jest.fn() };
        const mockClick = jest.fn();
        const wrapper = shallow(
            <ChatMessageInput
                sendMessageClick= {mockClick}
                setMessage= {jest.fn()}
                msg= {'test message'}
            />
        );
        expect(mockClick).toHaveBeenCalledTimes(0);
        const submit = wrapper.find('form');
        submit.simulate('submit', fakeEvent);
        expect(mockClick).toHaveBeenCalledTimes(1);
    })

    test('Should test handleChange when message is typed', () => {
        const fakeEvent = { preventDefault: () => jest.fn(),
                            target: { value: 'test value' } };
        const mockChange = jest.fn();
        const wrapper = shallow(
            <ChatMessageInput
                sendMessageClick= {jest.fn()}
                setMessage= {mockChange}
                msg= 'testing'
            />
        );
        expect(mockChange).toHaveBeenCalledTimes(0);
        const submit = wrapper.find(TextField);
        submit.simulate('change', fakeEvent);
        expect(mockChange).toHaveBeenCalledTimes(1);
    })
})
