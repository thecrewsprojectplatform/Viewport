import React from "react";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

export interface Prop {
    clientMessage: string;
    clientName: string;
    msgTime: string;
}

const theme = createMuiTheme({
    typography: {
      subtitle1: {
        fontSize: 10,
      }
    }
});

export const ChatMessageItem = (props: Prop) => {
    if (props.msgTime === '') {
        return (
            <div className="message-container">
                <span className = "name-message">
                    {props.clientName + ": " + props.clientMessage}
                </span>
            </div>
        )
    } else {
        return (
            <div className="message-container">
                <span className = "name-message">
                    {props.clientName + ": " + props.clientMessage}
                </span>
                <br>
                </br>
                <ThemeProvider theme={theme}>
                    <Typography className = "message=time" variant="subtitle1">
                        {"Sent at " + props.msgTime}
                    </Typography>
                </ThemeProvider>
            </div>
        )
    }
}