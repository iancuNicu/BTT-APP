import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { withCookies } from 'react-cookie';

import './App.css';

import  Home from './container-components/home-container/home-container';

class App extends Component {

    render(){
        return(
            <div className="App">
                    <Route path="/" render={() => <Home cookies={this.props.cookies} />} />
            </div>
        );
    }

}


export default withCookies(App);
