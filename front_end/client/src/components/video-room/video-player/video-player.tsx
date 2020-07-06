import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player'

import { ActionType } from '../../../store/video-room/actionType';
import { store } from '../../../store';
import { VideoRoomState } from '../../../store/video-room/video-room';
import { VideoRoomApi } from '../../../api/video-room-api';
import { ApiContext } from '../..';
import { Room, Player, User } from '../../../api/video-room-types';
import { socket } from "../../../App"

import './video-player.css';
import { Button, TextField, InputAdornment, IconButton, Slider } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import useStyles from '../../styles';
import SearchBar from './search-bar';
import PlayButton from './play-button';
import VideoController from './video-controller'

interface Prop {
    currentRoom: Room;
    player: Player;
    user: User;
    seeking: boolean;
}

/**
 * Creates a video player with the following attributes:
 *      Input field for loading videos from an url
 *      play/pause button
 *      Progress bar (currently disabled)
 */
const VideoPlayer = (props: Prop) => {
    const classes = useStyles();
    const api = useContext<VideoRoomApi>(ApiContext)

    const [reactPlayer, setReactPlayer] = useState(null)

    /**
     * Updates the api on what part the video is at, by default, updates every second
     * @param state the state of the video
     */
    const handleProgress = state => {
        if (!props.seeking) {
            api.updateRoom(
                props.currentRoom.id,
                props.currentRoom.name,
                "", 
                props.player.videoUrl,
                props.player.videoState,
                state.played,
                props.player.videoLength
            )
        }
    }

    const ref = player => {
        setReactPlayer(player)
    }

    
    return (
        <div className={classes.videoPlayer}>
            <div>
                <div>
                    <SearchBar 
                        currentRoom={props.currentRoom}
                        user={props.user}
                    />
                </div>
                <div className='player-wrapper'>
                    <ReactPlayer
                        ref={ref}
                        className='react-player'
                        url={props.player.videoUrl}
                        width='100%'
                        height='100%'
                        controls={false}
                        config={{
                            youtube: {
                                playerVars: { 
                                    rel : 0,
                                    disablekb: 1}
                            }
                        }}
                        playing={props.player?.videoState === "PAUSED" ? false : true}
                        onProgress={handleProgress}
                        //onPlay={handleOnPlay}
                        //onPause={handleOnPause}
                    />
                </div>
                <PlayButton />
                
                <VideoController reactPlayer={reactPlayer}/>
                

            </div>
        </div>
    );
}


const mapStateToProps = state => {
    return {
        currentRoom: state.room.currentRoom,
        player: state.player.player,
        user: state.room.user,
        seeking: state.player.seeking
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
