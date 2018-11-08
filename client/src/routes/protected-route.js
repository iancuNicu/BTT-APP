import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from '../services/auth-service';
import { withCookies } from 'react-cookie';

const ProtectedRoute = ({Component, cookies}) => {

        const headers = {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'authorization':cookies.get('auth-token')
        };

        return(<Route render={() => {
                return  (AuthService.isLogged() || AuthService.isAdminLogged()) && AuthService.checkTokenNoPromise(headers)
                    ? <Component/>
                    : <Redirect to='/login' />
        }} />)
};

export default withCookies(ProtectedRoute);