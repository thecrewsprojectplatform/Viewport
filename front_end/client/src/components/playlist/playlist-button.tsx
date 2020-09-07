import { Button, Dialog, DialogTitle } from '@material-ui/core';
import { PlaylistAdd } from '@material-ui/icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { PlaylistR } from './playlist';
import "./playlist.scss";
import { SearchBarR } from './search-bar';

interface Prop {
    
}

export const PlaylistButton = (props: Prop) => {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <Button className="video-nav-bar-button playlist-button" color="inherit" onClick={handleClickOpen}>
                <PlaylistAdd />
            </Button>
            <Dialog 
                onClose={handleClose}
                open={open} 
                fullWidth={true}
                maxWidth={"sm"}
            >
                <div className="playlist-header">
                    <DialogTitle >
                        Playlist
                    </DialogTitle>
                </div>
                <div className="playlist-content">
                    <SearchBarR />
                    <PlaylistR />
                </div>
            </Dialog>
        </div>
    )
}

const mapStateToProps = state => {

}

const mapDispatchToProps = dispatch => {

}

export const PlayListButtonR = connect(mapStateToProps, mapDispatchToProps)(PlaylistButton);