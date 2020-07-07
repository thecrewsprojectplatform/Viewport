import { ActionType } from "./actionType";
import produce from "immer";

export enum NotificationType {
    Successs = "SUCCESS",
    Failure = "Failure",
}

export interface NotificationState {
    displayNotification: boolean;
    notificationType: NotificationType;
    notificationHeader: string | JSX.Element;
    notificationBody: string | JSX.Element;
}

export interface ShowSuccessNotification {
    type: ActionType.ShowSuccessNotification;
    header: string | JSX.Element;
    body: string | JSX.Element;
}

export interface ShowErrorNotification {
    type: ActionType.ShowErrorNotification;
    header: string | JSX.Element;
    body: string | JSX.Element;
}

export interface HideNotification {
    type: ActionType.HideNotification;
}

type Action =   ShowSuccessNotification |
                ShowErrorNotification |
                HideNotification;

export const reducer = (
    state: NotificationState = {
        displayNotification: false,
        notificationType: NotificationType.Successs,
        notificationHeader: "",
        notificationBody: "",
    }, action: Action
): NotificationState => {
    switch (action.type) {
        case ActionType.ShowSuccessNotification:
            return produce(state, draftState => {
                draftState.displayNotification = true;
                draftState.notificationType = NotificationType.Successs;
                draftState.notificationHeader = action.header;
                draftState.notificationBody = action.body;
            });
        case ActionType.ShowErrorNotification:
            return produce(state, draftState => {
                draftState.displayNotification = true;
                draftState.notificationType = NotificationType.Failure;
                draftState.notificationHeader = action.header;
                draftState.notificationBody = action.body;
            });
        case ActionType.HideNotification:
            return produce(state, draftState => {
                draftState.displayNotification = false;
                draftState.notificationHeader = "";
                draftState.notificationBody = "";
            });
        default:
            return state;
    }
}