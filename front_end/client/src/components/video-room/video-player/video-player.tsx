import { Button } from '@material-ui/core';
import { Fullscreen, VolumeDown, VolumeUp } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import { findDOMNode } from 'react-dom';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import screenfull, { Screenfull } from 'screenfull';
import { ApiContext } from '../..';
import { VideoRoomApi } from '../../../api/video-room-api';
import { Player, Room, User } from '../../../api/video-room-types';
import { ActionType } from '../../../store/video-room/actionType';
import { PlayButtonR } from './play-button';
import { VideoControllerR } from './video-controller';
import "./video-player.scss";
import { VolumeControllerR } from './volume-controller';

interface Prop {
    sendVideoState: Function;
    sendVideoTime: Function;
    currentRoom: Room;
    player: Player;
    user: User;
    seeking: boolean;
}

/**
 * Creates a video player with the following attributes:
 *      Input field for loading videos from an url
 *      Play/Pause button
 *      Video Control
 *      Volume Control
 */
export const VideoPlayer = (props: Prop) => {
    const api = useContext<VideoRoomApi>(ApiContext)
    
    const [reactPlayer, setReactPlayer] = useState(null)
    const [sliderVideoTime, setSliderVideoTime] = useState(0)
    const fullscreen = (screenfull.isEnabled) ? screenfull as Screenfull : undefined;

    /**
     * Updates the api on what part the video is at; by default, updates every second
     * @param state the state of the video
     */
    const handleProgress = state => {
        if (!props.seeking) {
            api.updateVideoTime(
                props.currentRoom.id,
                state.played,
            )
            setSliderVideoTime(state.played)
        }
    }

    const sliderVideoTimeHandler = (newTime) => {
        setSliderVideoTime(newTime)
    }

    const handleOnScreenPlay = () => {
        props.sendVideoState(api, props.currentRoom, "PLAYING")
    }

    const handleOnScreenPause = () => {
        api.getRoom(props.currentRoom.id).then(room => {
            props.sendVideoState(api, props.currentRoom, "PAUSED")
            props.sendVideoTime(api, props.currentRoom, room.video_time)
        })
    }

    const toggleFullscreen = () => {
        fullscreen.request(findDOMNode(reactPlayer) as any);
    }

    return (
        <div className="video-player">
            <div>
                <div className='player-wrapper'>
                    <ReactPlayer
                        ref={setReactPlayer}
                        className='react-player'
                        url={props.player.videoUrl}
                        width='100%'
                        height='100%'
                        controls={false}
                        config={{
                            youtube: {
                                playerVars: {
                                    rel : 0,
                                    disablekb: 1}
                            }
                        }}
                        playing={props.player?.videoState === "PAUSED" ? false : true}
                        onProgress={handleProgress}
                        volume={props.player.videoVolume}
                        onPlay={handleOnScreenPlay}
                        onPause={handleOnScreenPause}
                    />
                </div>
                <div className="video-player-controls">
                    <PlayButtonR play={handleOnScreenPlay} pause={handleOnScreenPause} />
                    <VideoControllerR
                        sliderVideoTime={sliderVideoTime}
                        updateVideoTime={sliderVideoTimeHandler}
                        reactPlayer={reactPlayer}
                    />
                    <VolumeDown className="video-player-buttons" fontSize={"small"}/>
                    <VolumeControllerR />
                    <VolumeUp className="video-player-buttons" fontSize={"small"}/>
                    <Button className="fullscreen" onClick={toggleFullscreen} ><Fullscreen /></Button>
                </div>
            </div>
        </div>
    );
}


const mapStateToProps = state => {
    return {
        currentRoom: state.videoRoom.currentRoom,
        player: state.player.player,
        user: state.videoRoom.user,
        seeking: state.player.seeking
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendVideoState: (
            api: VideoRoomApi,
            currentRoom: Room,
            videoState: number
        ) => dispatch ({type: ActionType.SendVideoState, api: api, currentRoom: currentRoom, videoState: videoState}),
        sendVideoTime: (
            api: VideoRoomApi,
            currentRoom: Room,
            videoTime: number
        ) => dispatch ({type: ActionType.SendVideoTime, api: api, currentRoom: currentRoom, videoTime: videoTime}),
    }
}

export const VideoPlayerR = connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
