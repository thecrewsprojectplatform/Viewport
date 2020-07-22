import React from 'react'
import { connect } from 'react-redux'
import { Grid, Slider } from '@material-ui/core';
import { VolumeDown, VolumeUp } from '@material-ui/icons';

import { Player } from '../../../api/video-room-types';
import { ActionType } from '../../../store/video-room/actionType';

interface Prop {
    controlVideoVolume: Function
    player: Player
}

export const VolumeController = (props: Prop) => {

    const handleSeekChange = (event, newVolume) => {
        props.controlVideoVolume(newVolume)
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
        player: state.player.player
    }
}

const mapDispatchToProps = dispatch => {
    return {
        controlVideoVolume: (
            videoVolume: number
        ) => dispatch({type: ActionType.ControlVideoVolume, videoVolume: videoVolume})
    }
}

export const VolumeControllerR = connect(mapStateToProps, mapDispatchToProps)(VolumeController);