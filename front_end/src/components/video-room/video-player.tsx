import React from 'react';
import ReactPlayer from 'react-player'

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
        const {url, playing, played} = this.state
        return (
            <div>
            <div>
                <div>
                    <input ref={input => { this.urlInput = input}} type='text' placeholder='Enter URL' />
                    <button onClick={() => this.setState({ url: this.urlInput.value })}>Load</button>
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

                <button onClick={this.handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
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
