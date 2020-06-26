import React, { Component } from 'react';
import { shallow } from 'enzyme';
import NavBar from "../components/nav-bar";
import { Button } from '@material-ui/core';

jest.mock('../App.tsx', () => "root")

describe('NavBar component', () => {

    test('Should render without errors', () => {
        const wrapper = shallow(
            <NavBar 
                buttonName= 'test button' 
                buttonOnClick= {jest.fn()}
            />
        )
        expect(wrapper.exists()).toBe(true);  
    })

    test('Should test logout click', () => {
        const mockButton = jest.fn();
        const wrapper = shallow(
            <NavBar 
                buttonName= 'test button' 
                buttonOnClick= {mockButton}
            />
        )
        expect(mockButton).toHaveBeenCalledTimes(0);
        const onClick = wrapper.find(Button);
        onClick.simulate('click')
        expect(mockButton).toHaveBeenCalledTimes(1);
    })

})