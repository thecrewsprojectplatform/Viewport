import React from 'react';
import  { ListItem, ListItemText } from '@material-ui/core'

import { Video } from '../../api/video-room-types';

interface Prop {
    video: Video;
}

export const PlaylistItem = (props: Prop) => {
    return (
        <ListItem>
            <ListItemText primary={props.video.url} />
        </ListItem>
    )
}