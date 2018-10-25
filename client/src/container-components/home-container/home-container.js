import React, { Component } from 'react';
import { connect } from 'react-redux';
import routes from "../../routes/routes";
import {Switch, Route, Redirect, withRouter} from "react-router-dom";
import AuthService from '../../services/auth-service';
import {compose} from "redux";

class Home extends Component {

    shouldRedirect = () => {
        return this.props.location.pathname === '/';
    };

    shouldLogin = () => {
        return AuthService.isLogged() && this.props.cookies.get('auth-token');
    };

    mapRoutesToElements = () => (routes.map(route => <Route key={`route.name`} {...route} />));

    render(){
        return(
            <div>
                <Switch>
                    { this.mapRoutesToElements() }
                </Switch>
                { this.shouldRedirect() ?
                    ( this.shouldLogin() ? <Redirect to='/logged' /> :  <Redirect to='/notlogged' />)
                    : undefined
                }
            </div>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state,
        cookies: ownProps.cookies
    }
};

export default compose(withRouter, connect(mapStateToProps, null))(Home);
