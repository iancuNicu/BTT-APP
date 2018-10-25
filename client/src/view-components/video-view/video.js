import React from 'react';

const VideoView = ({videoID}) => {

    const url = `//localhost:5000/api/video/${videoID}`;

    return(
        <div className="video-wrapper">
            <video controls>
                <source src={url} />
            </video>
        </div>
    );

};

export default VideoView;