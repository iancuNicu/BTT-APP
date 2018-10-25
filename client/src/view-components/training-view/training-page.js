import React from 'react';
import { withRouter } from 'react-router-dom';
import VideoView from './../video-view/video';

const TrainingPage = ({history}) => {

    const state = history.location.state;

    return(
        <div className="training-page">
            <h1>{state.title}</h1>
            <div className="description">
                {state.description}
            </div>
            <div className="text">
                {state.text}
            </div>
            <div className="container-fluid">
                <VideoView videoID={state.videoID} />
            </div>
        </div>
    );

};

export default withRouter(TrainingPage);
