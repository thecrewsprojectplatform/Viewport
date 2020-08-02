import React from 'react';
import { List } from '@material-ui/core';

import { Video } from '../../api/video-room-types';
import { PlaylistItem } from './playlist-item';
import { connect } from 'react-redux';

interface Prop {
    playlist: Video[];
    currentVideo: Video;
}

export const Playlist = (props: Prop) => {
    return (
        <div>
            <List>
                {props.playlist.map((video) => {
                    return (
                        <PlaylistItem video={video}/>
                    );
                })}
            </List>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        playlist: state.player.playlist
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export const PlaylistR = connect(mapStateToProps, mapDispatchToProps)(Playlist);