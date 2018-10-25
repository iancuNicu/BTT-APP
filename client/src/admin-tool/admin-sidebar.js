import React from 'react';
import { Router, Link} from 'react-router-dom';
import AdminSearch from "./admin-search";

const AdminSidebar = () => {

    return(
            <div className="sidebar-wrapper">
                <nav className="sidebar-nav sidebar-admin">
                    <AdminSearch />
                    <Link to="/admin/training">Training</Link>
                    <Link to="/admin/offers">Oferte</Link>
                </nav>
           </div>
    );

};

export default AdminSidebar;
