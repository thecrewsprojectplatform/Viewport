import React from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { NotificationType } from "../../store/notifications/notifications";

export interface Prop {
    displayNotification: boolean;
    notificationType: NotificationType;
    notificationHeader: string | JSX.Element;
    notificationBody: string | JSX.Element;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

export const BaseAlert = (props: Prop) => {
    //console.log("updated")
    const classes = useStyles();
    if (props.displayNotification === true) {
        //console.log("displaying")
        return <div className={classes.root}>
            <Alert severity={props.notificationType === NotificationType.Failure ? "error" : "success"}>
                <AlertTitle>{props.notificationHeader}</AlertTitle>
                {props.notificationBody}
            </Alert>
        </div>
    } else {
        return null;
    }
}