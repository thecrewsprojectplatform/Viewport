import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { Slider } from '@material-ui/core';

import { Player, Room } from '../../../api/video-room-types';
import { VideoRoomApi } from '../../../api/video-room-api';
import { ActionType } from '../../../store/video-room/actionType';
import { ApiContext } from '../..';

interface Prop {
    sendControl: Function
    currentRoom: Room
    player: Player
}

export const VolumeController = (props: Prop) => {
    const api = useContext<VideoRoomApi>(ApiContext)

    const handleSeekChange = (event, newVolume) => {
        props.sendControl(api, props.currentRoom, props.player.videoState, props.player.videoTime, newVolume)
    }

    /**
     * Formats the slider value that gets displayed
     * @param value the original slider value
     */
    const formatSliderLabel = (value) => {
        return 0
    }

    return (
        <Slider
            value={props.player.videoVolume}
            onChange={handleSeekChange}
            min={0.0}
            max={1.0}
            step={0.01}
            aria-labelledby="continous-slider"
            valueLabelDisplay="auto"
            //valueLabelFormat={value => <div>{formatSliderLabel(value)} </div>}
        />
    )
}

const mapStateToProps = state => {
    return {
        currentRoom: state.videoRoom.currentRoom,
        player: state.player.player
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendControl: (
            api: VideoRoomApi,
            currentRoom: Room,
            videoState: number,
            videoTime: number,
            videoVolume: number
        ) => dispatch({type: ActionType.SendControl, api: api, currentRoom: currentRoom, videoState: videoState, videoTime: videoTime, videoVolume: videoVolume})
    }
}

export const VolumeControllerR = connect(mapStateToProps, mapDispatchToProps)(VolumeController);