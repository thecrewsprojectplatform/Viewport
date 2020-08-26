import { Button, Dialog, DialogTitle } from '@material-ui/core';
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
            <Button className="playlist-button" onClick={handleClickOpen}>
                Playlist
            </Button>
            <Dialog onClose={handleClose} open={open} >
                <DialogTitle>
                    Playlist
                </DialogTitle>
                <SearchBarR />
                <PlaylistR />
            </Dialog>
        </div>
    )
}

const mapStateToProps = state => {

}

const mapDispatchToProps = dispatch => {

}

export const PlayListButtonR = connect(mapStateToProps, mapDispatchToProps)(PlaylistButton);