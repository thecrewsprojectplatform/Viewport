import React, { useState, useContext, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player'

import { VideoRoomApi } from '../../../api/video-room-api';
import { ApiContext } from '../..';
import { Room, Player, User } from '../../../api/video-room-types';

import './video-player.css';
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
     * Updates the api on what part the video is at; by default, updates every second
     * @param state the state of the video
     */
    const handleProgress = state => {
        console.log(props.player.videoState)
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
    
    return (
        <div className={classes.videoPlayer}>
            <div>                
                <SearchBar />
                
                <div className='player-wrapper'>
                    <ReactPlayer
                        ref={setReactPlayer}
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
                
                <VideoController 
                    reactPlayer={reactPlayer}
                />
                

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
