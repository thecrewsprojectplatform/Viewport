import React from 'react'

import { Player, Room } from '../../../api/video-room-types';

import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { updateVideoState } from '../../../store/video-room/video-player';

interface Prop {
    player: Player
    currentRoom: Room
}

const PlayButton = (props: Prop) => {
    // Check if the video is playing or paused
    const checkVideoState = () => {
        if (props.player) {
            return props.player.videoState === null || props.player.videoState === "PAUSED" ? false : true
        }
        return false
    }

    /** Play/Pause button does the following 3 things:
     *  1) updates the video_state in the api, 
     *  2) reads the new video_state, 
     *  3) sends the new video_state to all clients      
    */
   const handlePlayPause = () => {
        if (props.player?.videoState || props.player.videoState === "PAUSED") {
            handleOnPlay()
        } else if (props.player.videoState === "PLAYING") {
            handleOnPause()
        }
    }

    /**
     * Handles what happens when the play button gets pressed
     */
    const handleOnPlay = () => {
        updateVideoState("PLAYING")
    }

    /**
     * Handles what happens when the pause button gets pressed
     * 
     * Here we are updating our props to match with that of the server
     * and then pausing the video for everyone at that time stamp
     */
    const handleOnPause = () => {
        api.getRoom(props.currentRoom.id).then(room => {
            updateVideoState("PAUSED")
            api.updateRoom(
                props.currentRoom.id,
                props.currentRoom.name,
                props.currentRoom.video_id,
                props.currentRoom.video_url,
                "PAUSED",
                room.video_time,
                props.currentRoom.video_length
            ).then(() => {
                getAndSendRoomState(api, props.currentRoom.id)
            })
        })
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