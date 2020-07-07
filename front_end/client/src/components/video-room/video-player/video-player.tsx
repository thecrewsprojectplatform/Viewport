import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player'

import { VideoRoomApi } from '../../../api/video-room-api';
import { Player, Room, User } from '../../../api/video-room-types';
import { ApiContext } from '../..';
import useStyles from '../../styles';
import { PlayButtonR } from './play-button';
import { SearchBarR } from './search-bar';
import { VideoControllerR } from './video-controller'
import './video-player.css';

interface Prop {
    currentRoom: Room;
    player: Player;
    user: User;
    seeking: boolean;
}

/**
 * Creates a video player with the following attributes:
 *      Input field for loading videos from an url
 *      Play/Pause button
 *      Video Controller
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
                <SearchBarR />
                
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
                    />
                </div>
                <PlayButtonR />
                
                <VideoControllerR reactPlayer={reactPlayer}/>
                

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

export default connect(mapStateToProps)(VideoPlayer);
