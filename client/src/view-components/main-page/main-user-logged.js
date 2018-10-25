import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

const MainUserLogged = (props) => {

    return (
        <div>
            <h1>User Logged!!</h1>
        </div>
    );

};

export default withRouter(MainUserLogged);