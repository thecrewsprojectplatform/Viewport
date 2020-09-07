import { Slider } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
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
        <Slider className="volume-controller"
            value={props.player.videoVolume}
            onChange={handleSeekChange}
            min={0.0}
            max={1.0}
            step={0.01}
            aria-labelledby="continous-slider"
            valueLabelDisplay="auto"
            valueLabelFormat={value => <div>{formatSliderLabel(value)} </div>}
        />
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