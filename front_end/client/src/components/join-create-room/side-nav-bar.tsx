import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import useStyles from '../styles';

export interface Prop {
    title?: string;
    buttonName: string;
    buttonOnClick: () => void;
}

const SideNavBar = (props: Prop) => {
    const classes = useStyles();

}

export default SideNavBar;