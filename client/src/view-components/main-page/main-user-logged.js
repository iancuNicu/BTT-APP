import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import TrainingView from './../training-view/training-view';
import OfferList from "../../container-components/offers-container/offers-list";
import TrainingPage from './../training-view/training-page';

const MainUserLogged = ({history, location}) => {

    return (
        <div>
            <h1>User Logged!</h1>
            <Switch>
                <Route path="/training"
                       render={() => <TrainingView />} />
                <Route path="admin/offers"
                       render={() => <OfferList history={history}
                                                location ={location}/>} />
                <Route path="/training-page/:id" component={TrainingPage} />
            </Switch>
        </div>
    );

};

export default withRouter(MainUserLogged);