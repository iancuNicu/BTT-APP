import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import TrainingView from './../training-view/training-view';
import OfferList from "../../container-components/offers-container/offers-list";
import TrainingPage from './../training-view/training-page';
import NavbarView from './../navbar-view/navbar-view';

import './main-page.css';

const MainUserLogged = ({history, location}) => {

    return (
        <div className="main-container">
            <h1>General info about oddsmatching!</h1>
            <NavbarView />
            <Switch>
                <Route path="/training"
                       render={() => <TrainingView />} />
                <Route path="admin/offers"
                       render={() => <OfferList history={history}
                                                location ={location}/>} />
                <Route path="/training-page/:id" component={TrainingPage} />
                <Route path="/offers" component={OfferList} />
            </Switch>
        </div>
    );

};

export default withRouter(MainUserLogged);