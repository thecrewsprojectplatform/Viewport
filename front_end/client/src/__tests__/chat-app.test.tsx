import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import { ChatMessageItem } from "../components/video-room/chat-app/chat-message-item";
import { ChatApp } from "../components/video-room/chat-app/chat-app";
import App from '../App';
import { render, configure } from '@testing-library/react';


const setup = () => {
  return shallow(
    <ChatApp
      clientMessage=''
      clientName=''
      msgTime=''
      messageHistory={[]}
    />
  )
};

const wrapper = setup();

describe('Chat App component', () => {

  test('Should render without errors', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('Should render message value', () => {

    wrapper.find('value').simulate('change', {
      target: { msg: 'test'}
    })

  });

  test('Should render message onChange', () => {

  });

  test('Should send message onKeyDown', () => {

  });

  test('Should update messageHistory onKeyDown', () => {

  });

  test('Should update ChatMessageItem and display message', () => {

  });

  test('Should dispatch onKeyDown', () => {

  });

  test('Should update API onKeyDown', () => {

  });

  test('Should send data to socket onKeyDown', () => {

  });

  test('Should reset message value onKeyDown', () => {

  });

  test('Should update props onKeyDown', () => {

  });
  
})

/*
describe('Chat App Component', () => {

  test('renders without crashing', () => {
    const component = shallow( <ChatAppR />)
  })

})
*/

/*
const props: Prop = {    
  clientMessage: 'test msg',
  clientName: 'test name',
  msgTime: 'test msg time',
  messageHistory: []
}

const setup = () => {
  const component = shallow( <ChatAppR {...props} /> )
  return component
};
  
describe('Chat Application Component', () => {
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper).not.toBe(null)
  });

  it('should render correct number of messages', () => {
    const wrapper = setup();
    expect(wrapper.find(Message).length).toEqual(2);
  })

});

*/

