import React from 'react';
import { shallow } from 'enzyme';
import NavBar from "../components/nav-bar";
import { Button } from '@material-ui/core';

describe('NavBar component', () => {

    let wrapper;
    let mockClick;

    beforeEach(() => {
        jest.mock('../App.tsx', () => "root")
        mockClick = jest.fn();
        wrapper = shallow(
            <NavBar
                buttonName= 'test button'
                buttonOnClick= {mockClick}
            />
        )
    })

    afterEach(() => {
        jest.clearAllMocks
    })

    test('Should render without errors', () => {
        expect(wrapper.exists()).toBe(true);
    })

    test('Should test logout click', () => {
        expect(mockClick).toHaveBeenCalledTimes(0);

        const onClick = wrapper.find(Button);
        onClick.simulate('click')

        expect(mockClick).toHaveBeenCalledTimes(1);
    })

})
