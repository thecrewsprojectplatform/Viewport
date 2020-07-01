import React from 'react';
import { shallow } from 'enzyme';
import { CreateRoomInput } from '../components/join-create-room/create-room-input';
import { TextField } from '@material-ui/core';

describe('CreateRoomInput component', () => {

    let wrapper;
    let mockSubmit;
    let mockChange;

    beforeEach(() => {
        jest.mock('../App.tsx', () => "root")
        mockSubmit = jest.fn();
        mockChange = jest.fn();
        wrapper = shallow(
            <CreateRoomInput
                createNewRoomClick= {mockSubmit}
                setNewRoomName= {mockChange}
                newRoomName= 'testing'
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