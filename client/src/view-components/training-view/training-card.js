import React from 'react';
import { NavLink } from 'react-router-dom';
import './training.css';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';

const TrainingCard = ({data, permissions}) => {

    return(
        <div className="training-card">
          <NavLink to={{pathname:`/training-page/${data._id}`, state:data }}>
            <Card>
                <CardBody>
                    <CardTitle>
                        {data.title}
                    </CardTitle>
                    <CardText>
                        {data.description}
                    </CardText>
                    {permissions.isAdmin ? <div className="button-wrapper">
                        <Button>Edit</Button>
                    </div> : undefined}
                </CardBody>
            </Card>
          </NavLink>
        </div>
    );

};

export default TrainingCard;