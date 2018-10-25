import React from 'react';

import {NavLink} from 'react-router-dom';

const LoginSignUpWindowComponent = () => {

    return (
        <div className="login-view-wrapper">
            <div id="Logo">LOGO</div>
            <NavLink to="/login" className="btn btn-success" id="loginBtn">Login</NavLink>
            <NavLink to="/signup" className="btn btn-dark" id="signupBtn">Signup</NavLink>
        </div>
    );

};

export default LoginSignUpWindowComponent;