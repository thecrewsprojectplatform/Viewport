import { List } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Video } from '../../api/video-room-types';
import { PlaylistItemR } from './playlist-item';




interface Prop {
    playlist: Video[];
}

export const Playlist = (props: Prop) => {

    return (
        <div>
            {props.playlist ? 
                <List>
                    {props.playlist.map((video) => {
                        return (
                            <PlaylistItemR video={video}/>
                        );
                    })}
                </List>
            : null
            }
        </div>
    );
}

const mapStateToProps = state => {
    return {
        playlist: state.playlist.videos,
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export const PlaylistR = connect(mapStateToProps, mapDispatchToProps)(Playlist);