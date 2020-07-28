import React, { useContext } from 'react'
import { connect } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { Pause, PlayArrowRounded } from '@material-ui/icons/';
import { Player, Room } from '../../../api/video-room-types';
import { VideoRoomApi } from '../../../api/video-room-api';
import { ApiContext } from '../..';

interface Prop {
    play: Function
    pause: Function
    player: Player
    currentRoom: Room
}

export const PlayButton = (props: Prop) => {
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
        if (props.player?.videoState === null || props.player.videoState === "PAUSED") {
            props.play()
        } else if (props.player.videoState === "PLAYING") {
            props.pause()
        }
    }

    return (<div>
        <IconButton
            size={"small"}
            onClick={handlePlayPause}>{checkVideoState() ? <Pause/> : <PlayArrowRounded color="action"/>}
        </IconButton>

    </div>

    );
}

const mapStateToProps = state => {
    return {
        currentRoom: state.videoRoom.currentRoom,
        player: state.player.player
    }
}


export const PlayButtonR = connect(mapStateToProps)(PlayButton);