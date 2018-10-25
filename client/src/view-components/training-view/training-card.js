import React from 'react';

const TrainingCard = ({data, permissions}) => {

    return(
        <div className="training-card">
            <h1>{data.title}</h1>
            <div className="training-card-description">
                {data.description}
            </div>
            {permissions.isAdmin ? <div className="button-wrapper">
                <button>Edit</button>
            </div> : undefined}
        </div>
    );

};

export default TrainingCard;