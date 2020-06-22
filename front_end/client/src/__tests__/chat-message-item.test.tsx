import React from 'react';
import { shallow, mount } from 'enzyme';
import { ChatMessageItem } from "../components/video-room/chat-app/chat-message-item";

const props = {
    clientMessage: 'hello',
    clientName: 'tester1',
    msgTime: '1:11',
  }

const setup = () => {
    return shallow(<ChatMessageItem 
        {...props}
    />)
};

const wrapper = setup();

describe('Chat Message component', () => {

    test('Should render without errors', () => {
        expect(wrapper.exists()).toBe(true);
    })

})