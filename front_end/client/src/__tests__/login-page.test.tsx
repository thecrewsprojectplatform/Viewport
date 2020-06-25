import React from 'react';
import { shallow } from 'enzyme';
import { User } from "../api/video-room-types";
import { LoginPage } from '../components/login/login-page';
import {render, fireEvent, screen} from '@testing-library/react'

jest.mock('../App.tsx', () => "root")

const users: User = {
    id: 1,
    name: 'tester',
};

const props = {
    currentUser: users
}

const setup = () => {
    return shallow(
        <LoginPage {...props} />
    )
};
  
const wrapper = setup();

describe('Login component', () => {
    test('Should render without errors', () => {
        expect(wrapper.exists()).toBe(true);  
    })

    test('Should test createNewRoomClick', () => {
        /*
        const fakeEvent = { preventDefault: () => console.log('preventDefault') };
        const loginComponent = shallow(<RoomList {...props} />);
        expect(loginComponent.find('form').length).toBe(1);
        loginComponent.find('.form').simulate('submit', fakeEvent);
        expect(loginComponent.find(Notification).length).toBe(1);
        */
    })

    test('Should test onchange event with handleChange', () => {
        
    })

    test('should render RoomListItem', () => {
        //expect(wrapper.find(RoomListItem).exists()).toBeTruthy()
    });

    test('Should test correct number of roomlist displayed', () => {
        //expect(wrapper.at(0).find(RoomListItem)).toHaveLength(2)
    })


})
