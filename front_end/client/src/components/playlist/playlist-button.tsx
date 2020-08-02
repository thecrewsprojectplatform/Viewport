import React from 'react';
import { Button } from '@material-ui/core'

interface Prop {
    playlistToggle: boolean
}

export const PlaylistButton = (props: Prop) => {

    const handlePlaylistToggle = () => {

    }

    return (
        <Button >
            onClick={handlePlaylistToggle}
        </Button>
    )
}