import React from 'react';
import ReactPlayer from 'react-player';

const VideoView = ({videoID}) => {

    const url = `//localhost:5000/api/video/${videoID}`;

    return(
        <div className="video-wrapper">
            <ReactPlayer url={url} playing controls config={{
                file: {
                    attributes: {
                        controlsList: 'nodownload'
                    }
                }
            }} className='react-player'/>
        </div>
    );

};

export default VideoView;