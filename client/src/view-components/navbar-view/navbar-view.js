import React from 'react';
import { NavLink } from 'react-router-dom';

import './navbar.css';

const NavbarView = () => {

    return(
        <div className="container navbar-container">
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/training">Training</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/offers">Offers</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/a">Oddsmatching</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/b">Calculator</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );

};

export default NavbarView;