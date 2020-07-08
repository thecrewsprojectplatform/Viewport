import React from 'react';
import { shallow } from 'enzyme';
import { User } from "../api/video-room-types";
import { LoginPage } from '../components/login/login-page';
import { LoginForm } from '../components/login/login-form';
import { NotificationState, NotificationType } from '../store/notifications/notifications';

jest.mock('../App.tsx', () => "root");

const users: User = {
    id: 1,
    name: 'tester',
};

enum Status {
    NotStarted="NOT_STARTED",
    Running="RUNNING",
    Succeeded="SUCCEEDED",
    Failed="FAILED",
};

const notificationState: NotificationState = {
    displayNotification: true,
    notificationType: NotificationType.Successs,
    notificationHeader: "Testing",
    notificationBody: "Testing"
};

const props = {
    currentUser: users,
    updateStatus: Status.NotStarted,
    notificationState: notificationState,
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
