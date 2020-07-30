import React from 'react';
import { List } from '@material-ui/core';

import { Video } from '../../api/video-room-types';

interface Prop {
    videos: Video[];
    currentVideo: Video;
}

export const Playlist = (props: Prop) => {
    return (
        <div>
            <List>
                {props.videos.map((video) => {
                    return (
                        {video}
                    );
                })}
            </List>
        </div>
    );
}