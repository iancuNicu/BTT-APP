import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from '../services/auth-service';

const ProtectedRoute = ({Component}) => {

        return(<Route render={() => {
                return (AuthService.isLogged() || AuthService.isAdminLogged())
                    ? <Component/>
                    : <Redirect to='/login' />
        }} />)
};

export default ProtectedRoute;