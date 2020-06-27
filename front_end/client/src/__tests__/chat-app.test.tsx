import React from 'react';
import { shallow } from 'enzyme';
import { ChatMessageItem } from "../components/video-room/chat-app/chat-message-item";
import { ChatApp } from "../components/video-room/chat-app/chat-app";
import { MessageDetail } from "../api/video-room-types";
import { ChatMessageInput } from '../components/video-room/chat-app/chat-message-input';

//const mockStore = configureStore([]);

jest.mock('../App.tsx', () => "root")

const messageHist: MessageDetail = {
  chat_message: 'test',
  chat_username: 'test user',
  message_time: '1:11',
};

const props = {
  clientMessage: messageHist.chat_message,
  clientName: messageHist.chat_username,
  msgTime: messageHist.message_time,
  messageHistory:[messageHist, messageHist]
}

const setup = () => {
  return shallow(
    <ChatApp {...props}/>
  )
};

const wrapper = setup();

describe('Chat App component', () => {

  test('Should render without errors', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('Should render correct number of messages', () => {
    expect(wrapper.at(0).find(ChatMessageItem)).toHaveLength(2)
  });

  test('Should find ChatMessageInput', () => {
    expect(wrapper.find(ChatMessageInput)).toHaveLength(1)
  });

})
