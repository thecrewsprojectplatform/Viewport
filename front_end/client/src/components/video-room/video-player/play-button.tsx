import React, { useContext } from 'react'

import { Player, Room } from '../../../api/video-room-types';
import { VideoRoomApi } from '../../../api/video-room-api';
import { ApiContext } from '../..';

import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { ActionType } from '../../../store/video-room/actionType';

interface Prop {
    sendPlayPause: Function
    player: Player
    currentRoom: Room
}

const PlayButton = (props: Prop) => {
    const api = useContext<VideoRoomApi>(ApiContext)

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
            props.sendPlayPause(props.currentRoom, "PLAYING")
        } else if (props.player.videoState === "PLAYING") {
            props.sendPlayPause(props.currentRoom, "PAUSED")
        }
    }

    return (
        <Button variant='contained' 
            onClick={handlePlayPause}>{checkVideoState() ? 'Pause' : 'Play'}
        </Button>
    );
}

const mapStateToProps = state => {
    return {
        currentRoom: state.room.currentRoom,
        player: state.player.player
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendPlayPause: (
            api: VideoRoomApi,
            currentRoom: Room,
            videoState: string            
        ) => dispatch({type: ActionType.SendPlayPause, api: api, currentRoom: currentRoom, videoState: videoState})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayButton);