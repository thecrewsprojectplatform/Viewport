import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import "./nav-bar.scss";

export interface Prop {
    title?: string;
    buttonName: string;
    buttonOnClick: () => void;
}

const NavBar = (props: Prop) => {
    return(
        <div className="nav-bar">
            <AppBar position="static">
                <Toolbar>
                    <Typography className="nav-bar-title" variant="h6">
                        {props.title || ""}
                    </Typography>
                    <Button className="nav-bar-button" color="inherit" onClick={props.buttonOnClick}>{props.buttonName}</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;