import React from 'react';
import AdminSidebar from "./admin-sidebar";
import { Switch, Route, withRouter } from 'react-router-dom';
import OfferList from "../container-components/offers-container/offers-list";
import AdminSection from "./admin-section";
import TrainingView from "../view-components/training-view/training-view";

const AdminHome = (props) => {

    return (
        <div id="AdminHome">
            <h1>Welcome to Admin!</h1>
            <div className="admin-main">
                <AdminSidebar history={props.history}/>
                <div className="admin-wrapper">
                    <AdminSection history={props.history}/>
                    <Switch>
                        <Route path="/admin/training"
                               render={() => <TrainingView />} />
                        <Route path="admin/offers"
                               render={() => <OfferList history={props.history}
                                                        location ={props.location}/>} />
                    </Switch>
                </div>
            </div>
        </div>
    );

};

export default withRouter(AdminHome);