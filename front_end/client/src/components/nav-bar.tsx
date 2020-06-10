import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core';
import useStyles from './styles';

const NavBar = (name, onClick) => {
    const classes = useStyles();

    return(
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Multimedia Platform
                    </Typography>
                    <Button color="inherit" onClick={onClick}>{name}</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default NavBar;