import React from 'react';
import AdminSidebar from "./admin-sidebar";
import { Switch, Route } from 'react-router-dom';
import TrainingList from "../container-components/training-container/training-list-container";
import OfferList from "../container-components/offers-container/offers-list";

const AdminHome = () => {

    return (
        <div id="AdminHome">
                <h1>Welcome to Admin!</h1>
                <AdminSidebar/>
                <Switch>
                    <Route path="/admin/training" render={() => <TrainingList isAdmin="true" />} />
                    <Route path="admin/offers" render={() => <OfferList isAdmin="true" />} />
                </Switch>
        </div>
    );

};

export default AdminHome;