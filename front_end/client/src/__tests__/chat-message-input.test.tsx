import React from 'react';
import { shallow } from 'enzyme';
import { ChatMessageInput } from '../components/video-room/chat-app/chat-message-input';
import TextField from '@material-ui/core/TextField';

describe('Chat Message Input component', () => {

    let wrapper;
    let mockClick;
    let mockMessage;

    beforeEach(() => {
        jest.mock('../App.tsx', () => "root")
        mockClick = jest.fn();
        mockMessage = jest.fn();
        wrapper = shallow(
            <ChatMessageInput
                sendMessageClick= {mockClick}
                setMessage= {mockMessage}
                msg= {'test message'}
            />
        )
    })

    afterEach(() => {
        jest.clearAllMocks
    })

    test('Should render without errors', () => {
        expect(wrapper.exists()).toBe(true);
    })

    test('Should test sendMessageClick', () => {
        const fakeEvent = { preventDefault: () => {} };
        expect(mockClick).toHaveBeenCalledTimes(0);

        const onClick = wrapper.find('form');
        onClick.simulate('submit', fakeEvent)

        expect(mockClick).toHaveBeenCalledTimes(1);
    })

    test('Should test handleChange when message is typed', () => {
        const fakeEvent = {
            preventDefault: () => {},
            target: { value: 'test message'}
        };
        expect(mockMessage).toHaveBeenCalledTimes(0);

        const onClick = wrapper.find(TextField);
        onClick.simulate('change', fakeEvent)

        expect(mockMessage).toBeCalledWith('test message')
    })
})
