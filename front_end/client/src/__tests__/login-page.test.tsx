import React from 'react';
import { shallow } from 'enzyme';
import { User } from "../api/video-room-types";
import { LoginPage } from '../components/login/login-page';
import { LoginForm } from '../components/login/login-form';

jest.mock('../App.tsx', () => "root");

const users: User = {
    id: 1,
    name: 'tester',
};

const props = {
    currentUser: users
};

const setup = () => {
    return shallow(
        <LoginPage {...props} />
    );
};

const wrapper = setup();

describe('Login component', () => {
    test('Should render without errors', () => {
        expect(wrapper.exists()).toBe(true);
    })

    test('Should render LoginForm', () => {
        expect(wrapper.find(LoginForm)).toHaveLength(1)
    });
})
