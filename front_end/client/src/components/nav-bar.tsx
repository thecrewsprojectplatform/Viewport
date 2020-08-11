import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'

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
                    <Typography variant="h6" className="title">
                        {props.title || "Viewport"}
                    </Typography>
                    <Button color="inherit" onClick={props.buttonOnClick}>{props.buttonName}</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;