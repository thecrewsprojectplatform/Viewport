import React, { useState, useEffect } from 'react';
import {connect } from 'react-redux';
import ReactPlayer from 'react-player'
import { store } from '../../store';
import { sendUrlToServer, VideoRoomState, loadVideo, sendControlsToServer } from '../../store/video-room/video-room';

export interface Prop {
    url: string;
    playing: boolean;
}

/**
 * Creates a video player with the following attributes:
 *      Input field for loading videos from an url
 *      play/pause button
 *      Progress bar 
 */
const VideoPlayer = (props: Prop) => {
    const [url, setUrl] = useState(null)
    const [playing, setPlaying] = useState(true)

    const loadButton = () => {
        store.dispatch(sendUrlToServer(url))
    }


    const handlePlayPause = () => {
        console.log(props.playing)
        store.dispatch(sendControlsToServer(playing))
        setPlaying(!playing)
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
                    playing={props.playing}
                />
                <button onClick={handlePlayPause}>{props.playing ? 'Pause' : 'Play'}</button>
            </div>
            </div>
        );
    }


const mapStateToProps = (state: VideoRoomState) => {
    return {
        url: state.url,
        playing: state.playing
    }
}

export default connect(mapStateToProps)(VideoPlayer);
