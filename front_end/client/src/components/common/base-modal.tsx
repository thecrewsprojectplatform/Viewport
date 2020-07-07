import React, { ReactNode } from "react";
import { Modal } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';


export interface Prop {
    title: string;
    body: ReactNode;
    onClose?: () => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: 300,
        flexGrow: 1,
        minWidth: 300,
        transform: 'translateZ(0)',
        // The position fixed scoping doesn't work in IE 11.
        // Disable this demo to preserve the others.
        '@media all and (-ms-high-contrast: none)': {
        display: 'none',
        },
    },
    modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export const BaseModal = (props: Prop) => {
    const classes = useStyles();
    return (
        <Modal
            open={true}
            onClose={props.onClose}
            className={classes.modal}
        >
            <div className={classes.paper}>
                <h5>{props.title}</h5>
                {props.body}
            </div>
        </Modal>
    );
}