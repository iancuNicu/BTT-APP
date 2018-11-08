import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import NavbarView from './../navbar-view/navbar-view';

import routes from '../../routes/routes';

import './main-page.css';

const MainUserLogged = () => {

    const reqComponentPaths = ['/training-page/:id', '/offers', '/training', '/calculator'];

    const mapRoutes = () => {
        const reqRoutes = routes.filter(route => {
            return reqComponentPaths.indexOf(route.path) >= 0 ? route : null;
        });

        return reqRoutes.map(route => <Route key={`route.name`} {...route} />);
    };

    return (
        <div className="main-container">
            <NavbarView />
            <div className="main-wrapper">
                <h1>General info about oddsmatching!</h1>
                <Switch>
                    { mapRoutes() }
                </Switch>
            </div>
        </div>
    );

};

export default withRouter(MainUserLogged);