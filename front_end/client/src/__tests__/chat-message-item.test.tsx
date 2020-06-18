import React from 'react';
import { shallow } from 'enzyme';
import { ChatMessageItem } from "../components/video-room/chat-app/chat-message-item";

const setup = () => {
    return shallow(<ChatMessageItem 
        clientMessage="test"
        clientName="test user"
        msgTime="1:11"
    />)
};

const wrapper = setup();

describe('Chat Message component', () => {

    test('Should render without errors', () => {
        expect(wrapper.exists()).toBe(true);
    })

})