import React, { useContext, useEffect } from 'react'
import { connect } from 'react-redux'
import { Slider } from '@material-ui/core';

import { Player, Room } from '../../../api/video-room-types';
import { VideoRoomApi } from '../../../api/video-room-api';
import { ActionType } from '../../../store/video-room/actionType';
import { ApiContext } from '../..';

interface Prop {
    setSeeking: Function
    sendVideoTime: Function
    currentRoom: Room
    player: Player
    seeking: boolean
    reactPlayer: any
}

export const VideoController = (props: Prop) => {
    const api = useContext<VideoRoomApi>(ApiContext)

    useEffect(() => {
        if (props.reactPlayer) {
            props.reactPlayer.seekTo(props.player.videoTime)
        }
    }, [props.player.videoTime, props.reactPlayer])

    /**
     * Takes care of video time selection
     * @param event
     * @param newTime what part of the video to go to, by percentage, where 1 represents the end of the video
     */
    const handleSeekChange = (event, newTime) => {
        props.setSeeking(true)
        props.sendVideoTime(api, props.currentRoom, newTime)
        props.setSeeking(false)
    }

    /**
     * Formats the slider value that gets displayed
     * @param value the original slider value
     */
    const formatSliderLabel = (value) => {
        if (props.reactPlayer) {
            const videoTime = Math.trunc(props.reactPlayer.getDuration() * value)
            const minute = Math.trunc(videoTime / 60)
            const second = videoTime - minute * 60
            const secondString = second < 10 ? "0" + second : second
            return minute + ":" + secondString
        } else {
            //console.log('player not found while formatting slider')
        }
    }

    return (
        <Slider
            value={props.player.videoTime}
            onChange={handleSeekChange}
            min={0.0}
            max={1.0}
            step={0.0000001}
            aria-labelledby="continous-slider"
            valueLabelDisplay="auto"
            valueLabelFormat={value => <div>{formatSliderLabel(value)} </div>}
        />
    )
}

const mapStateToProps = state => {
    return {
        currentRoom: state.videoRoom.currentRoom,
        player: state.player.player,
        seeking: state.player.seeking
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSeeking: (
            seeking: boolean
        ) => dispatch({type: ActionType.SetSeeking, seeking: seeking}),
        sendVideoTime: (
            api: VideoRoomApi,
            currentRoom: Room,
            videoTime: number
        ) => dispatch ({type: ActionType.SendVideoTime, api: api, currentRoom: currentRoom, videoTime: videoTime}),
    }
}

export const VideoControllerR = connect(mapStateToProps, mapDispatchToProps)(VideoController);