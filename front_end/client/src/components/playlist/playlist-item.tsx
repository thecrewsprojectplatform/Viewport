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
    video: Video;
    currentRoom: Room;
    user: User
}

const PlaylistItem = (props: Prop) => {
    const api = useContext<VideoRoomApi>(ApiContext)

    const deleteFromPlaylist = () => {
        console.log('deleting: ' + props.video)
        props.deleteVideo(
            api,
            props.currentRoom.id,
            props.user.id,
            props.video
        )
    }

    return (
        <ListItem>
            <ListItemText primary={props.video} />
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
        ) => dispatch({type: ActionType.DeleteVideo, api:api, roomId: roomId, userId: userId, video: video})
    }
}

export const PlaylistItemR = connect(mapStateToProps, mapDispatchToProps)(PlaylistItem);