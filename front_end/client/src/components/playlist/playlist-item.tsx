import React, { useContext } from 'react';
import { connect } from 'react-redux'

import  { IconButton, ListItem, ListItemText } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

import { Room, Video, User } from '../../api/video-room-types';
import { VideoRoomApi } from '../../api/video-room-api';
import { ActionType } from '../../store/video-room/actionType';
import { ApiContext } from '..';


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
            <ListItemText onClick={loadVideo} primary={props.video.url} />
            <IconButton edge="end" onClick={deleteFromPlaylist}>
                <Delete />
            </IconButton>
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
            roomId: number,
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