import React, { useState } from 'react'
import { connect } from 'react-redux'
import ReactPlayer from 'react-player'

import { ActionType } from '../../../store/video-room/actionType';
import { Room, User } from '../../../api/video-room-types';

import { TextField, InputAdornment, IconButton } from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search";
import useStyles from '../../styles';

interface Prop {
    sendUrlToServer: Function
    currentRoom: Room
    user: User
}

const SearchBar = (props: Prop) => {
    const classes = useStyles();
    const [url, setUrl] = useState(null)

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
    };

    const loadButton = () => {
        props.sendUrlToServer(
            url,
            props.currentRoom.id,
            props.user.id,
            props.user.name
        )

        // By default, set the video_state to paused after loading
/*         api.updateRoom(
            props.currentRoom.id,
            props.currentRoom.name,
            props.currentRoom.video_id,
            props.url,
            "PAUSED",
            0,
            0
        )*/
    }

    return (
        <div>
            <TextField  
                error={displayError()}
                variant='filled'
                type='text' 
                placeholder='Enter URL'
                onChange={event => setUrl(event.target.value)}
                onKeyDown={handleEnter}
                className={classes.searchBar}

                InputProps={{
                    style: {
                        height: 40,
                    },
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={loadButton}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                )
                }}
            />
        </div>
    );
}
const mapStateToProps = state => {
    return {
        currentRoom: state.room.currentRoom,
        user: state.room.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendUrlToServer: (
            url: string,
            roomId: number,
            userId: number,
            userName: string
        ) => dispatch({type: ActionType.SendUrlToServer, url: url, roomId: roomId, userId: userId, userName: userName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);