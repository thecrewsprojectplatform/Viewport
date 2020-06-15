import React from 'react';
import { shallow } from 'enzyme';
import { ChatMessageItem } from "../components/video-room/chat-app/chat-message-item";

const setup = () => {
    return shallow(<ChatMessageItem 
        clientMessage= 'testMsg'
        clientName= 'testName'
        msgTime= '11:11'
    />)
};

const wrapper = setup();

describe('Chat Message component', () => {

    it('Should render without errors', () => {
        expect(wrapper).not.toBe(null);
        expect(wrapper.find('.message-container').length.toBe(1))
    })

})

/*
describe('ChatArea component', () => {
    it('renders without crashing', () => {
      const wrapper = setup();
      expect(wrapper).not.toBe(null)
    });
  
    it('should render correct number of messages', () => {
      const wrapper = setup();
      expect(wrapper.find(Message).length).toEqual(2);
    })
}); */