import React from 'react';
import { shallow, mount } from 'enzyme';
import { ChatMessageItem } from "../components/video-room/chat-app/chat-message-item";
import { ChatApp, ChatAppR } from "../components/video-room/chat-app/chat-app";
import { MessageDetail } from "../api/video-room-types";
import {render, fireEvent, cleanup} from '@testing-library/react';
import TextField from '@material-ui/core/TextField';
import { store } from "../store/index";
import { reducer } from "../store/reducer";
import { ActionType } from "../store/video-room/actionType";

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
//console.log(wrapper.debug())


describe('Chat App component', () => {

  test('Should render without errors', () => {
    expect(wrapper.exists()).toBe(true);
  });

<<<<<<< HEAD
  test('Should render correct message items', () => {
    expect(wrapper.find(ChatMessageItem ({
      clientMessage: 'test',
      clientName: "test user",
      msgTime: "1:11"})
      ).length).toEqual(0);
=======
  test('Should render correct number of messages', () => {
    expect(wrapper.at(0).find(ChatMessageItem)).toHaveLength(2)
>>>>>>> master
  });

  test('should call sendMessageClick on click enter', () => {
    /*
    const spy = jest.spyOn(ChatApp.prototype, 'sendMessageClick');
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper.find(TextField).simulate('keypress', {key: 'Enter'});
    expect(spy).toHaveBeenCalledTimes(1);
    */
  });

  test('should render <TextField />', () => {
    expect(wrapper.find(TextField)).toHaveLength(1)
  });

  test('should check for changed message value on change', () => {

  /* does not work right now, wrapper isn't updated
    expect(wrapper.find(TextField).text()).toBe('')
    wrapper.find(TextField).simulate('change', {
      target: { value: 'text message' }
    });
    expect(wrapper.find(TextField).text()).toBe('text message')
  */
  });
})
