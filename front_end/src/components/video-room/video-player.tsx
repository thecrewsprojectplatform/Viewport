import React, { useState, useContext } from 'react';
import {connect } from 'react-redux';
import ReactPlayer from 'react-player'
import { store } from '../../store';
import { sendUrlToServer, VideoRoomState, getAndSendRoomState} from '../../store/video-room/video-room';
import { VideoRoomApi } from '../../api/video-room-api';
import { ApiContext } from '..';
import { Room } from '../../api/video-room-types';
import './video-player.css';

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
    const api = useContext<VideoRoomApi>(ApiContext)

    const [url, setUrl] = useState(null)

    const loadButton = () => {
        store.dispatch(sendUrlToServer(url))
        // By default, set the video_state to paused after loading
        api.updateRoom(props.currentRoom.id, props.currentRoom.name, props.currentRoom.video_id, "PAUSED")
    }

    const updateVideoState = (playing: string) => {
        api.updateRoom(props.currentRoom.id, props.currentRoom.name, props.currentRoom.video_id, playing).then(() => {
            store.dispatch(getAndSendRoomState(api, props.currentRoom.id))
        })
    }

    /** Play/Pause button does the following 3 things:
     *  1) updates the video_state in the api, 
     *  2) reads the new video_state, 
     *  3) sends the new video_state to all clients      
    */
    const handlePlayPause = () => {
        if (props.currentRoom.video_state == null || props.currentRoom.video_state == "PAUSED") {
            updateVideoState("PLAYING")
        } else {
            updateVideoState("PAUSED")
        }
    }

    const checkVideoState = () => {
        if (props.currentRoom) {
            return props.currentRoom.video_state == null || props.currentRoom.video_state == "PAUSED" ? false : true
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
                <div className='player-wrapper'>
                    <ReactPlayer
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
                    />
                </div>
                <button onClick={handlePlayPause}>{checkVideoState() ? 'Pause' : 'Play'}</button>
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
