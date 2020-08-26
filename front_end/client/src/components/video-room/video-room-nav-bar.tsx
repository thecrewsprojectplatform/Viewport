import { Button, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import GroupIcon from '@material-ui/icons/Group';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import "./video-room.scss";

export interface Prop {
    title?: string;
    buttonName: string;
    buttonOnClick: () => void;
    toggleChatOnClick: () => void;
    toggleListOnClick: () => void;
}

const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
});

const VidRoomNavBar = (props: Prop) => {
    const classes = useStyles();
    const [navBar, setNavBar] = useState(false);
    const toggleList = [
        {
            text: "Chat Box",
            icon: <ChatIcon />,
            onClick: () => props.toggleChatOnClick()
        },
        {
            text: "Userlist Box",
            icon: <GroupIcon />,
            onClick: () => props.toggleListOnClick()
        }
    ];

    const toggleDrawer = (open: boolean) => {
        setNavBar(open)
    }

    return(
        <div className="video-nav-bar">
            <AppBar position="static">
                <Toolbar>

                    <IconButton edge="start" className="menu-toggler" color="inherit" aria-label="menu">
                        <MenuIcon onClick={() => toggleDrawer(true)}/>
                        <Drawer className="menu" anchor="left" open={navBar} onClose={() => toggleDrawer(false)}>
                            <List>
                                {toggleList.map((toggle) => {

                                    const { text, icon, onClick } = toggle;

                                    return (
                                        <ListItem button key={text} alignItems='center' onClick={onClick}>
                                            {icon && <ListItemIcon>{icon}</ListItemIcon>}
                                            <ListItemText primary={text} />
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </Drawer>
                    </IconButton>

                    <Typography variant="h6" className="video-nav-bar-title">
                        {props.title || "Viewport"}
                    </Typography>

                    <Button className="video-nav-bar-button" color="inherit" onClick={props.buttonOnClick}>{props.buttonName}</Button>

                </Toolbar>
            </AppBar>
        </div>
    )
}

export default VidRoomNavBar;


/*

                        <ToggleButton
                            value="check"
                            selected={toggle}
                            onChange={() => {
                            setToggle(!toggle);
                            }}
                        >
                            <CheckIcon />
                        </ToggleButton>
*/
