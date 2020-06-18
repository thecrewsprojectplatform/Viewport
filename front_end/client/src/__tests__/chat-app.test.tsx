import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { ChatMessageItem } from "../components/video-room/chat-app/chat-message-item";
import { ChatAppR } from "../components/video-room/chat-app/chat-app";
import { MessageDetail } from "../api/video-room-types";
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
    <Provider store={store}>
      <ChatAppR {...props}/>
    </Provider>
  )
};

const wrapper = setup();
const instance = wrapper.instance();

describe('Chat App component', () => {

  test('Should render without errors', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('Should render correct message items', () => {
    expect(wrapper.find(ChatMessageItem ({
      clientMessage: 'test',
      clientName: "test user",
      msgTime: "1:11"})
      ).length).toEqual(3);
  });

})

/*
describe('My Connected React-Redux Component', () => {
  let store;
  let component;
 
  beforeEach(() => {
    store = mockStore({
      clientMessage: messageHist.chat_message,
      clientName: messageHist.chat_username,
      msgTime: messageHist.message_time,
      messageHistory:[messageHist, messageHist]
    });

    store.dispatch = jest.fn();

    component = renderer.create(
      <Provider store={store}>
        <ChatAppR />
      </Provider>
    );
  });
 
  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
 
  it('should dispatch an action on button click', () => {
 
  });
});
*/
/*
describe('Reducer component', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });
})
*/