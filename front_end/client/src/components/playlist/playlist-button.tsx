import React, { useState } from 'react';
import { connect } from 'react-redux'
import { Button, Dialog, DialogTitle } from '@material-ui/core'

import { SearchBarR } from './search-bar';
import { PlaylistR } from './playlist';

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
            <Button onClick={handleClickOpen}>
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