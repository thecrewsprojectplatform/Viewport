import { Collapse, IconButton } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import { Alert, AlertTitle } from '@material-ui/lab';
import React from "react";
import { NotificationType } from "../../store/notifications/notifications";
import "./help-icon.scss";

export interface Prop {
    onClose?: () => void;
    showBaseModal: boolean
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
    const classes = useStyles();
    if (props.displayNotification === true) {
        return <div className={classes.root}>
          <Collapse in={props.showBaseModal}>
            <Alert 
              severity={props.notificationType === NotificationType.Failure ? "error" : "success"}
              action={ 
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={props.onClose}
                >
                  <Close className="alert-button"/>
                </IconButton>
              }
            >
              <AlertTitle>{props.notificationHeader}</AlertTitle>
              {props.notificationBody}
            </Alert>
          </Collapse>
        </div>
    } else {
        return null;
    }
}