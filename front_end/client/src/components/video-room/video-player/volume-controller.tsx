import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { Grid, Slider } from '@material-ui/core';
import { VolumeDown, VolumeUp } from '@material-ui/icons';

import { Player, Room } from '../../../api/video-room-types';
import { VideoRoomApi } from '../../../api/video-room-api';
import { ActionType } from '../../../store/video-room/actionType';
import { ApiContext } from '../..';


interface Prop {
    sendControl: Function
    sendVolume: Function
    currentRoom: Room
    player: Player
}

export const VolumeController = (props: Prop) => {
    const api = useContext<VideoRoomApi>(ApiContext)

    const handleSeekChange = (event, newVolume) => {
        props.sendVolume(api, props.currentRoom, newVolume)
        //props.sendControl(api, props.currentRoom, props.player.videoState, props.player.videoTime, newVolume)
    }

    /**
     * Formats the slider value that gets displayed
     * @param value the original slider value
     */
    const formatSliderLabel = (value) => {
        return Math.trunc(value * 100) + "%"
    }

    return (
        <Grid container spacing={2} style={{display: "flex", alignItems: 'center'}}>
            <Grid item>
                <VolumeDown fontSize={"small"}/>
            </Grid>
            <Grid item xs>
                <Slider
                    value={props.player.videoVolume}
                    onChange={handleSeekChange}
                    min={0.0}
                    max={1.0}
                    step={0.01}
                    aria-labelledby="continous-slider"
                    valueLabelDisplay="auto"
                    valueLabelFormat={value => <div>{formatSliderLabel(value)} </div>}
                />
            </Grid>
            <Grid item>
                <VolumeUp fontSize={"small"}/>
            </Grid>
        </Grid>
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
        sendVolume: (
            api: VideoRoomApi,
            currentRoom: Room,
            videoVolume: number
        ) => dispatch({type: ActionType.SendVolume, api: api, currentRoom: currentRoom, videoVolume: videoVolume}),
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