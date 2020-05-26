import React from 'react';
import ReactPlayer from 'react-player'


class VideoPlayer extends React.Component {
    state = {
        url: null,
        playing: false,
        played: 0,
        
    }

    load = url => {
        this.setState({
            url,
            played: 0
        })
    }

    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing })
    }

    handleProgress = state => {
        this.setState(state)
    }

    ref = player => {
        this.player = player
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
                <div className='player-wrapper'>
                    <ReactPlayer
                        ref={this.ref}
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
                </div>
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