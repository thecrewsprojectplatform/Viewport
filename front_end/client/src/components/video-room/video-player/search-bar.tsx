import React, { useContext, useState } from 'react'
import { connect } from 'react-redux'
import { TextField, InputAdornment, IconButton } from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search";
import ReactPlayer from 'react-player'
import { VideoRoomApi } from '../../../api/video-room-api';
import { Room, User } from '../../../api/video-room-types';
import { ActionType } from '../../../store/video-room/actionType';
import { ApiContext } from '../..';

interface Prop {
    sendUrlToServer: Function
    addToPlaylist: Function
    currentRoom: Room
    user: User
}

export const SearchBar = (props: Prop) => {
    const api = useContext<VideoRoomApi>(ApiContext)
    const [url, setUrl] = useState("")

    /**
     * Check if the url entered is valid and return wether or not to display an error message
     */
    const displayError = () => {
        if (ReactPlayer.canPlay(url)) {
            return false
        }
        return true
    }

    const handleEnter = (event): void => {
        if ((event.key === 'Enter') && (url !== "")) {
            loadButton()
        }
    }

    // By default, set the video_state to paused after loading
    const loadButton = () => {
        console.log(props.currentRoom.id)
        props.addToPlaylist(
            api,
            props.currentRoom.id,
            props.user.id,
            url
        )
        // props.sendUrlToServer(
        //     api,
        //     props.currentRoom,
        //     url,
        //     props.user.id,
        //     props.user.name
        // )
    }

    return (
        <div id="url-section">
            <TextField
                error={displayError()}
                variant='filled'
                type='text'
                placeholder='Enter URL'
                onChange={event => setUrl(event.target.value)}
                onKeyDown={handleEnter}
                fullWidth
                InputProps={{
                    className: "search-bar",
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={loadButton}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
}
const mapStateToProps = state => {
    return {
        currentRoom: state.videoRoom.currentRoom,
        user: state.videoRoom.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendUrlToServer: (
            api: VideoRoomApi,
            currentRoom: Room,
            url: string,
            userId: number,
            userName: string
        ) => dispatch({type: ActionType.SendUrlToServer, api: api, currentRoom: currentRoom, url: url, userId: userId, userName: userName}),
        addToPlaylist: (
            api: VideoRoomApi,
            roomId: number,
            userId: number,
            url: string
        ) => dispatch({type: ActionType.AddVideo, api:api, roomId: roomId, userId: userId, url: url})
    }
}

export const SearchBarR = connect(mapStateToProps, mapDispatchToProps)(SearchBar);