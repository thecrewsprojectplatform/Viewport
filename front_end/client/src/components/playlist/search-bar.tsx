import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import React, { useContext, useState } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { ApiContext } from '../';
import { GogoanimeApi } from '../../api/gogoanime-api';
import { VideoRoomApi } from '../../api/video-room-api';
import { Room, User, Video } from '../../api/video-room-types';
import { ActionType } from '../../store/video-room/actionType';


interface Prop {
    sendUrlToServer: Function
    addVideo: Function
    currentRoom: Room
    user: User
}

export const SearchBar = (props: Prop) => {
    const api = useContext<VideoRoomApi>(ApiContext)
    const gogoapi = new GogoanimeApi
    const [url, setUrl] = useState("")

    const isValidUrl = (url: string) => {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(url);
      }

    const updateUrl = (event) => {
        if (isValidUrl(event.target.value)) {
            const newUrl = new URL(event.target.value);
            const gogoanime = "gogoanime"
            if (newUrl.hostname.includes(gogoanime)) {
                getVideoLink(newUrl.pathname.split('/')[1])
     
            } else {
                setUrl(newUrl.href)
            }
        }
    }

    const getVideoLink = (id: string) => {
        gogoapi.getAnimeIframeUrl(id).then((response) => {
            response.anime[0].servers.forEach(link => {
                if (link.name === "Gogo server") {
                    gogoapi.getAnimeDirectLink(link.iframe).then((response) => {
                        const streamingLinks = response.videos
                        const hdLink = streamingLinks[streamingLinks.length - 1]
                        setUrl(hdLink.url)
                    }).catch(err => {
                        console.log('server error, please try again later')
                    })
                }
            })
        }).catch(err => {
            console.log('invalid anime id')
        })
    }

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
       
        if (url) {
            const video: Video = {
                userId: props.user.id,
                url: url
            }
            props.addVideo(
                api,
                props.currentRoom.id,
                video
            )
        }
    }

    return (
        <div className="search-bar-url">
            <TextField
                error={displayError()}
                variant='filled'
                type='text'
                placeholder='Enter URL'
                onChange={event => updateUrl(event)}
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
        addVideo: (
            api: VideoRoomApi,
            roomId: number,
            video: Video
        ) => dispatch({type: ActionType.AddVideo, api:api, roomId: roomId, video: video})
    }
}

export const SearchBarR = connect(mapStateToProps, mapDispatchToProps)(SearchBar);