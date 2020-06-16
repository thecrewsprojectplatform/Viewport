import React, { useState, useContext } from 'react';
import {connect } from 'react-redux';
import ReactPlayer from 'react-player'
import { store } from '../../store';
import { sendUrlToServer, VideoRoomState, getAndSendRoomState} from '../../store/video-room/video-room';
import { VideoRoomApi } from '../../api/video-room-api';
import { ApiContext } from '..';
import { Room } from '../../api/video-room-types';
import './video-player.css';
import { Button, TextField, InputAdornment, IconButton, Slider } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import useStyles from '../styles';

export interface Prop {
    currentRoom: Room;
    url: string;
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

    const [player, setPlayer] = useState(null)
    const [url, setUrl] = useState(null)
    const [invalidUrlMessage, setInvalidUrlMessage] = useState('')
    const [videoTime, setVideoTime] = useState(0.0)
    const [seeking, setSeeking] = useState(false)

    const loadButton = () => {
        store.dispatch(sendUrlToServer(url))
        // By default, set the video_state to paused after loading
        //api.updateRoomVideoUrl(props.currentRoom.id, props.currentRoom.name, url)
        //api.updateRoomVideoState(props.currentRoom.id, props.currentRoom.name, "PAUSED")
        api.updateRoom(props.currentRoom.id, props.currentRoom.name, props.currentRoom.video_id, url, "PAUSED", 0)
    }

    const updateVideoState = (playing: string) => {
        //api.updateRoomVideoState(props.currentRoom.id, props.currentRoom.name, playing).then(() => {
        api.updateRoom(props.currentRoom.id, props.currentRoom.name, props.currentRoom.video_id, url, playing, 1).then(() => {
            store.dispatch(getAndSendRoomState(api, props.currentRoom.id))
        })
    }

    /** Play/Pause button does the following 3 things:
     *  1) updates the video_state in the api, 
     *  2) reads the new video_state, 
     *  3) sends the new video_state to all clients      
    */
    const handlePlayPause = () => {
        if (props.currentRoom.video_state === null || props.currentRoom.video_state === "PAUSED") {
            updateVideoState("PLAYING")
        } else {
            updateVideoState("PAUSED")
        }
    }

    const checkVideoState = () => {
        if (props.currentRoom) {
            return props.currentRoom.video_state === null || props.currentRoom.video_state === "PAUSED" ? false : true
        }
        return false
    }

    const checkUrl = (url: string) => {
        if (!ReactPlayer.canPlay(url) && url !== '') {
            setInvalidUrlMessage('The url pasted is not valid')
        } else {
            setUrl(url)
            setInvalidUrlMessage('')
        }
    }

    const handleEnter = (event): void => {
        if ((event.key === 'Enter') && (url !== "")) {
            loadButton()
        }
    };

    const handleProgress = state => {
        if (!seeking) {
            setVideoTime(state.played)
        }
        console.log(state)
    }

    const handleSeekChange = (event, newTime) => {
        setSeeking(true)
        setVideoTime(newTime)
    }

    const handleSeekMouseUp = (event, newTime) => {
        console.log(player.getDuration())
        setSeeking(false)
        if (player) {
            player.seekTo(newTime)
        } else {
            console.log('player not found')
        }
    }

    const formatSliderLabel = (value) => {
        if (player) {
            return Math.trunc(player.getDuration() * value)
        }
        console.log('player not found')
    }

    const ref = player => {
        setPlayer(player)
    }

        return (
            <div className={classes.videoPlayer}>
                <div>
                    <div>
                        <TextField  variant='filled'
                                    type='text' 
                                    placeholder='Enter URL'
                                    value={url}
                                    onChange={event => checkUrl(event.target.value)}
                                    onKeyDown={handleEnter}

                                    InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                        <IconButton onClick={loadButton}>
                                                            <SearchIcon />
                                                        </IconButton>
                                                </InputAdornment>
                                                )
                                        }}
                        />
                    </div>
                    <div className='player-wrapper'>
                        <ReactPlayer
                            ref={ref}
                            className='react-player'
                            url={props.url}
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
                            playing={checkVideoState()}
                            onProgress={handleProgress}
                        />
                    </div>
                    <Button variant='contained' 
                        onClick={handlePlayPause}>{checkVideoState() ? 'Pause' : 'Play'}
                    </Button>

                    <Slider 
                        value={videoTime}
                        onChange={handleSeekChange}
                        min={0.0}
                        max={1.0}
                        step={0.0001}
                        onChangeCommitted={handleSeekMouseUp}
                        aria-labelledby="continous-slider"
                        valueLabelDisplay="auto"
                        valueLabelFormat={value => <div>{formatSliderLabel(value)} </div>}
                    />

                </div>
            </div>
        );
    }


const mapStateToProps = (state: VideoRoomState) => {
    return {
        currentRoom: state.currentRoom,
        url: state.url,
    }
}

export default connect(mapStateToProps)(VideoPlayer);
