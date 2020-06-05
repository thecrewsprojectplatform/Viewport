import React, { useState, useContext } from 'react';
import {connect } from 'react-redux';
import ReactPlayer from 'react-player'
import { store } from '../../store';
import { sendUrlToServer, VideoRoomState, loadVideo, sendControlsToServer, getRoomState, getVideoState } from '../../store/video-room/video-room';
import { VideoRoomApi } from '../../api/video-room-api';
import { ApiContext } from '..';
import { Room } from '../../api/video-room-types';

export interface Prop {
    currentRoom: Room;
    url: string;
    video_state: string;
}

/**
 * Creates a video player with the following attributes:
 *      Input field for loading videos from an url
 *      play/pause button
 *      Progress bar 
 */
const VideoPlayer = (props: Prop) => {
    const api = useContext<VideoRoomApi>(ApiContext)

    const [url, setUrl] = useState(null)
    const [playing, setPlaying] = useState(false)

    const loadButton = () => {
        store.dispatch(sendUrlToServer(url))
        store.dispatch(getRoomState(api, props.currentRoom.id))
    }

    const handlePlayPause = () => {


        // fetches room state from the api
        store.dispatch(getRoomState(api, props.currentRoom.id))

        //store.dispatch(sendControlsToServer(playing))
    }

    const checkVideoState = () => {
        if (props.currentRoom) {
            return props.currentRoom.video_state == null || props.currentRoom.video_state == "PLAYING" ? false : true
        }
        return false
    }

    const handleProgress = (state: object) => {
        //this.setState(state)
    }

        return (
            <div>
            <div>
                <div>
                    <input 
                        type='text'
                        placeholder='Enter URL'
                        className='FORM-CONTROL'
                        value={url}
                        onChange={event => setUrl(event.target.value)} />
                    <button onClick={loadButton}>Load</button>
                </div>
                
                <ReactPlayer
                    url={props.url}
                    config={{
                        youtube: {
                            playerVars: { 
                                rel : 0}
                        }
                    }}
                    playing={checkVideoState()}
                />
                <button onClick={handlePlayPause}>{checkVideoState() ? 'Pause' : 'Play'}</button>
            </div>
            </div>
        );
    }


const mapStateToProps = (state: VideoRoomState) => {
    return {
        currentRoom: state.currentRoom,
        url: state.url,
        video_state: state.video_state
    }
}

export default connect(mapStateToProps)(VideoPlayer);
