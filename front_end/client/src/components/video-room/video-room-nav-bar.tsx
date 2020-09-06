import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import "./video-room.scss";

export interface Prop {
    title?: string;
    onShareClick: () => void;
    onExitClick: () => void;
    toggleChatOnClick: () => void;
    toggleListOnClick: () => void;
}


const VidRoomNavBar = (props: Prop) => {
    return(
        <div className="video-nav-bar">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className="video-nav-bar-title">
                        {props.title || "Viewport"}
                    </Typography>

                    <Button className="video-nav-bar-button" color="inherit" onClick={props.onShareClick}>Share Room</Button>
                    <Button className="video-nav-bar-button" color="inherit" onClick={props.onExitClick}>Exit Room</Button>

                </Toolbar>
            </AppBar>
        </div>
    )
}

export default VidRoomNavBar;

/* For Navigation Menu
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

    <IconButton edge="start" className="menu-toggler" color="inherit">
        <MenuIcon onClick={() => toggleDrawer(true)}/>
        <Drawer className="video-menu" anchor="left" open={navBar} onClose={() => toggleDrawer(false)}>
            <List className="menu-toggle-buttons">
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
*/