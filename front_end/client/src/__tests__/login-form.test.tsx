import React, { Component } from 'react';
import { shallow } from 'enzyme';
import { LoginForm } from '../components/login/login-form';

jest.mock('../App.tsx', () => "root")

describe('LoginForm component', () => {

    test('Should render without errors', () => {
        const wrapper = shallow(
            <LoginForm
                newUserName= 'test form' 
                handleChange= {jest.fn()}
                handleSubmit= {jest.fn()}
            />
        )
        expect(wrapper.exists()).toBe(true);  
    })

    test('Should test submit', () => {
        const mockSubmit = jest.fn();
        const wrapper = shallow(
            <LoginForm
                newUserName= 'test form' 
                handleChange= {jest.fn()}
                handleSubmit= {mockSubmit}
            />
        )
        expect(mockSubmit).toHaveBeenCalledTimes(0);
        wrapper.simulate('submit', {
                preventDefault: () => {
            }
        });
        expect(mockSubmit).toHaveBeenCalledTimes(1);
    })

})