import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import { LoginForm } from '../components/login/login-form';
import { Button } from '@material-ui/core';

jest.mock('../App.tsx', () => "root")

describe('LoginForm component', () => {

    test('Should render without errors', () => {
        const mockClick = jest.fn();
        const wrapper = shallow(
            <LoginForm
                newUserName= 'test form'
                handleChange= {mockClick}
                handleSubmit= {mockClick}
            />
        )
        expect(wrapper.exists()).toBe(true);
    })

    test('Should test submit', () => {
        const fakeEvent = { preventDefault: () => jest.fn() };
        const mockSubmit = jest.fn();
        const wrapper = shallow(
            <LoginForm
                newUserName= 'test form'
                handleChange= {jest.fn()}
                handleSubmit= {mockSubmit}
            />
        )
        expect(mockSubmit).toHaveBeenCalledTimes(0);
        const submit = wrapper.find('form');
        submit.simulate('submit', fakeEvent);
        expect(mockSubmit).toHaveBeenCalledTimes(1);
    })

})