import React from 'react';
import { NavLink } from 'react-router-dom';
import './training.css';

const TrainingCard = ({data, permissions}) => {

    return(
        <div className="training-card">
          <NavLink to={{pathname:`/training-page/${data._id}`, state:data }}>
            <h1>{data.title}</h1>
            <div className="training-card-description">
                {data.description}
            </div>
            {permissions.isAdmin ? <div className="button-wrapper">
                <button>Edit</button>
            </div> : undefined}
          </NavLink>
        </div>
    );

};

export default TrainingCard;