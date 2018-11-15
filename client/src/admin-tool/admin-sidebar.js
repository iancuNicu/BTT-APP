import React from 'react';
import {Link} from 'react-router-dom';
import AdminSearch from "./admin-search";
import {Button} from "reactstrap";
import {connect} from "react-redux";

const AdminSidebar = ({onLogout, history}) => {

    const adminLogout = () => {
      onLogout();
      history.push('/admin');
    };

    return(
            <div className="sidebar-wrapper">
                <nav className="sidebar-nav sidebar-admin">
                    <AdminSearch />
                    <Link to="/admin/training">Training</Link>
                    <Link to="/admin/offers">Oferte</Link>
                    <Button onClick={adminLogout} outline color="danger">Logout</Button>
                </nav>
            </div>
    );

};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch({type:'ADMIN_LOGOUT'})
    }
};

export default connect(null, mapDispatchToProps)(AdminSidebar);
