import React from 'react';

import { Route, Switch,withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group-v2";

import LoginSignup from "../../container-components/login-signup-page/login-signup";
import LoginSignUpWindowComponent from "../login-signup-view/login-signup-window";

import './main-page.css';

const MainNoUserComponent = (props) => {
    return(
        <div className="container-fluid">
        <TransitionGroup>
            <CSSTransition
                key={props.location.key}
                timeout={{enter:500,exit:300}}
                classNames={'fade'}>
                <Switch location={props.location}>
                    <Route path="/notlogged" exact component={LoginSignUpWindowComponent} />
                    <Route path="/:start(login|signup)" render={() => (<LoginSignup cookies={props.cookies} />) } />
                </Switch>
            </CSSTransition>
        </TransitionGroup>
        </div>
    );

};

export default withRouter(MainNoUserComponent);