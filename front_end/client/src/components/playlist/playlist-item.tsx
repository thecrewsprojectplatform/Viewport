import { IconButton, ListItem, ListItemText } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { ApiContext } from '..';
import { VideoRoomApi } from '../../api/video-room-api';
import { Room, User, Video } from '../../api/video-room-types';
import { ActionType } from '../../store/video-room/actionType';
import "./playlist.scss";

interface Prop {
    deleteVideo: Function;
    sendUrlToServer: Function;
    video: Video;
    currentRoom: Room;
    user: User
}

export const PlaylistItem = (props: Prop) => {
    const api = useContext<VideoRoomApi>(ApiContext)

    const deleteFromPlaylist = () => {
        props.deleteVideo(
            api,
            props.currentRoom.id,
            props.user.id,
            props.video
        )
    }

    const loadVideo = (() => {
        props.sendUrlToServer(
            api,
            props.currentRoom,
            props.video.url,
            props.user.id,
            props.user.name
        )
    })

    return (
        <ListItem >
            <div className="playlist-item">
            <ListItemText onClick={loadVideo} primary={props.video.url} />
            </div>
            <div className="playlist-item playlist-icon">
                <IconButton edge="end" onClick={deleteFromPlaylist}>
                    <Delete />
                </IconButton>
            </div>
        </ListItem>
    )
}

const mapStateToProps = state => {
    return {
        currentRoom: state.videoRoom.currentRoom,
        user: state.videoRoom.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteVideo: (
            api: VideoRoomApi,
            roomId: string,
            userId: number,
            video: Video
        ) => dispatch({type: ActionType.DeleteVideo, api:api, roomId: roomId, userId: userId, video: video}),
        sendUrlToServer: (
            api: VideoRoomApi,
            currentRoom: Room,
            url: string,
            userId: number,
            userName: string
        ) => dispatch({type: ActionType.SendUrlToServer, api: api, currentRoom: currentRoom, url: url, userId: userId, userName: userName}),
    }
}

export const PlaylistItemR = connect(mapStateToProps, mapDispatchToProps)(PlaylistItem);