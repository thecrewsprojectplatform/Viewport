import React from 'react';
import { shallow } from 'enzyme';
import { JoinCreateRoomPage } from "../components/join-create-room/join-create-room-page";
import NavBar from "../components/nav-bar";
import { RoomListR } from '../components/join-create-room/room-list';
import { NotificationState, NotificationType } from '../store/notifications/notifications';

jest.mock('../App.tsx', () => "root");

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
    users: [],
    roomList: [],
    currentUser: { id: 1, name:'tester' },
    updateStatus: Status.NotStarted,
    notificationState: notificationState,
};

const setup = () => {
    return shallow(
        <JoinCreateRoomPage {...props} />
    );
};

const wrapper = setup();

describe('Join-Create-Room component', () => {

    test('Should render without errors', () => {
        expect(wrapper.exists()).toBe(true);
    })

    test('should render NavBar', () => {
        expect(wrapper.find(NavBar)).toHaveLength(1);
    });

    test('should render RoomListR', () => {
        expect(wrapper.find(RoomListR)).toHaveLength(1);
    });
})
