import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import { JoinCreateRoomPage } from "../components/join-create-room/join-create-room-page";
import NavBar from "../components/nav-bar";
import configureStore from 'redux-mock-store';
import { useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import { Button } from '@material-ui/core';

jest.mock('../App.tsx', () => "root")

enum Status {
    NotStarted="NOT_STARTED",
    Running="RUNNING",
    Succeeded="SUCCEEDED",
    Failed="FAILED",
}

const props = {
    users: [],
    roomList: [],
    currentUser: { id: 1, name:'tester' },
    updateStatus: Status.NotStarted, 
    setPageForward: () => {},
    setPageBackwards: () => {},
}

const setup = () => {
    return shallow(
        <JoinCreateRoomPage {...props} />
    )
};
  
const wrapper = setup();
console.log(wrapper.debug())

describe('Join-Create-Room component', () => {

    test('Should render without errors', () => {
        expect(wrapper.exists()).toBe(true);  
    })

    test('Should test logout on logout click', () => {
        /*
        const spy = jest.spyOn(wrapper.find(NavBar).props(), 'buttonOnClick');
        wrapper.update();
        const onClick = wrapper.find(NavBar);
        expect(spy).toHaveBeenCalledTimes(0)
        onClick.simulate('click')
        expect(spy).toHaveBeenCalledTimes(1)
        */
        
       const logSpy = jest.spyOn(console, 'log');
       const wrapper = shallow(<JoinCreateRoomPage {...props} />);
       const button = wrapper.find(NavBar).dive().find(Button);
       expect(button.text()).toBe('Logout');
       button.simulate('click');
       expect(logSpy).toBeCalledWith("Testing logoutClick");

        /*
        const navBar = wrapper.find(NavBar).dive()
        navBar.find('button').simulate('click')
        */
    })

    test('Should test setPageFoward work', () => {

        //wrapper.find(NavBar).simulate('click')

        /*
        const navBar = wrapper.find(NavBar).dive()
        navBar.find('button').simulate('click')
        */
    })

})
