import React, { Component } from 'react';
import { shallow } from 'enzyme';
import { LoginForm } from '../components/login/login-form';
import { TextField } from '@material-ui/core';

describe('LoginForm component', () => {

    let wrapper;
    let mockChange;
    let mockSubmit;

    beforeEach(() => {
        jest.mock('../App.tsx', () => "root")
        mockChange = jest.fn();
        mockSubmit = jest.fn();
        wrapper = shallow(
            <LoginForm
                newUserName= 'test form'
                handleChange= {mockChange}
                handleSubmit= {mockSubmit}
            />
        )
    })

    afterEach(() => {
        jest.clearAllMocks
    })


    test('Should render without errors', () => {
        expect(wrapper.exists()).toBe(true);
    })

    test('Should test submit', () => {
        const fakeEvent = { preventDefault: () => jest.fn() };
        expect(mockSubmit).toHaveBeenCalledTimes(0);
        const submit = wrapper.find('form');
        submit.simulate('submit', fakeEvent);
        expect(mockSubmit).toHaveBeenCalledTimes(1);
    })

    test('Should test handleChange', () => {
        const fakeEvent = { preventDefault: () => jest.fn(),
                            target: { value: 'test value' } };
        expect(mockChange).toHaveBeenCalledTimes(0);
        const submit = wrapper.find(TextField);
        submit.simulate('change', fakeEvent);
        expect(mockChange).toHaveBeenCalledTimes(1);
    })
})