import React from 'react';
import ReactPlayer from 'react-player'
import '../../'
import useStyles from '../../styles';
import { TextField, Button, IconButton } from '@material-ui/core';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

/**
 * Creates a video player with the following attributes:
 *      Input field for loading videos from an url
 *      play/pause button
 *      Progress bar 
 */
class VideoPlayer extends React.Component {
    player: HTMLIFrameElement;
    urlInput: HTMLInputElement;

    state = {
        url: null,
        playing: false,
        played: 0,
    }
    
    load = (url: string) => {
        this.setState({
            url,
            played: 0
        })
    }

    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing })
    }

    handleProgress = (state: object) => {
        this.setState(state)
    }

    render() {
        const {url, playing, played} = this.state;
        return (
            <div className="Video-section">
                <div>
                    <div>
                        <TextField inputRef={input => { this.urlInput = input}}
                                   variant='filled'
                                   type='text' 
                                   placeholder='Enter URL'
                                   InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                    <IconButton onClick={() => this.setState({ url: this.urlInput.value })}>
                                                        <SearchIcon />
                                                    </IconButton>
                                            </InputAdornment>
                                        )
                                   }}
                        />
                    </div>
                    <ReactPlayer
                        url={url}
                        config={{
                            youtube: {
                                playerVars: { 
                                    rel : 0}
                            }
                        }}
                        playing={playing}
                        onProgress={this.handleProgress}
                    />
                    <Button variant='contained' 
                            onClick={this.handlePlayPause}>{playing ? 'Pause' : 'Play'}
                    </Button>
                </div>
                <table>
                    <tbody>
                        <tr>
                        <th>Played</th>
                        <th><progress max={1} value={played} /></th>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default VideoPlayer;