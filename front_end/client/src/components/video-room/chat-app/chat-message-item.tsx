import React from "react";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

interface Prop {
    clientMessage: string;
    clientName: string;
    msgTime: string;
}

const theme = createMuiTheme({
    typography: {
      subtitle1: {
        fontSize: 10,
      },
      body1: {
        fontWeight: 500,
      }
    },
});

export const ChatMessageItem = (props: Prop) => {
    return (
        <div className="message">
            <span>{props.clientName + ": " + props.clientMessage}</span><br></br>
            <ThemeProvider theme={theme}>
                <Typography variant="subtitle1">{"Sent at " + props.msgTime}</Typography>
            </ThemeProvider>
        </div>
    )
}