import React from 'react'

import { Player} from '../../../api/video-room-types';

import { Button } from '@material-ui/core';
import { connect } from 'react-redux';

interface Prop {
    player: Player
}

const PlayButton = (props: Prop) => {
    // Check if the video is playing or paused
    const checkVideoState = () => {
        if (props.player) {
            return props.currentRoom.video_state === null || props.currentRoom.video_state === "PAUSED" ? false : true
        }
        return false
    }

    /** Play/Pause button does the following 3 things:
     *  1) updates the video_state in the api, 
     *  2) reads the new video_state, 
     *  3) sends the new video_state to all clients      
    */
   const handlePlayPause = () => {
        if (props.player.videoState === null || props.player.videoState === "PAUSED") {
            handleOnPlay()
        } else if (props.player.videoState === "PLAYING") {
            handleOnPause()
        }
    }

    return (
        <Button variant='contained' 
            onClick={handlePlayPause}>{checkVideoState() ? 'Pause' : 'Play'}
        </Button>
    );
}

const mapStateToProps = state => {

}

const mapDispatchToProps = dispatch => {

}

export default connect(mapStateToProps, mapDispatchToProps)(PlayButton);