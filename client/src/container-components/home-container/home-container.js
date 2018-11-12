import React, { Component } from 'react';
import { connect } from 'react-redux';
import routes from "../../routes/routes";
import {Switch, Route, withRouter} from "react-router-dom";
import {compose} from "redux";
import CarouselComponent from "../../view-components/carousel/carousel";

class Home extends Component {

    mapRoutesToElements = () => (routes.map(route => <Route key={`route.name`} {...route} />));

    render(){
        return(
            <div>
                <Route path="/:start(login|signup|notlogged)" component={CarouselComponent} />
                <Switch>
                    { this.mapRoutesToElements() }
                </Switch>
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
