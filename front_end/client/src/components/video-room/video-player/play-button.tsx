import { Button } from '@material-ui/core';
import { Pause, PlayArrowRounded } from '@material-ui/icons/';
import React from 'react';
import { connect } from 'react-redux';
import { Player, Room } from '../../../api/video-room-types';
import "./video-player.scss";

interface Prop {
    play: Function
    pause: Function
    player: Player
    currentRoom: Room
}

export const PlayButton = (props: Prop) => {
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

    return (
        <div>
            <Button className="play-button video-player-buttons"
                onClick={handlePlayPause}>{checkVideoState() ? <Pause/> : <PlayArrowRounded />}
            </Button>
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