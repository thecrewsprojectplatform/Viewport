import React, { Component } from 'react';
import { shallow } from 'enzyme';
import { CreateRoomInput } from '../components/join-create-room/create-room-input';
import { TextField } from '@material-ui/core';

jest.mock('../App.tsx', () => "root");

describe('CreateRoomInput component', () => {

    test('Should render without errors', () => {
        const wrapper = shallow(
            <CreateRoomInput
                createNewRoomClick= {jest.fn()}
                setNewRoomName= {jest.fn()}
                newRoomName= 'testing'
            />
        );
        expect(wrapper.exists()).toBe(true);
    })

    test('Should test submit', () => {
        const fakeEvent = { preventDefault: () => jest.fn() };
        const mockSubmit = jest.fn();
        const wrapper = shallow(
            <CreateRoomInput
                createNewRoomClick= {mockSubmit}
                setNewRoomName= {jest.fn()}
                newRoomName= 'testing'
            />
        );
        expect(mockSubmit).toHaveBeenCalledTimes(0);
        const submit = wrapper.find('form');
        submit.simulate('submit', fakeEvent);
        expect(mockSubmit).toHaveBeenCalledTimes(1);
    })

    test('Should test handleChange', () => {
        const fakeEvent = { preventDefault: () => jest.fn(),
                            target: { value: 'test value' } };
        const mockChange = jest.fn();
        const wrapper = shallow(
            <CreateRoomInput
                createNewRoomClick= {jest.fn()}
                setNewRoomName= {mockChange}
                newRoomName= 'testing'
            />
        );
        expect(mockChange).toHaveBeenCalledTimes(0);
        const submit = wrapper.find(TextField);
        submit.simulate('change', fakeEvent);
        expect(mockChange).toHaveBeenCalledTimes(1);
    })

})