import React from 'react';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

import ProfileDropdown from './../../container-components/profile-container/profile-dropdown';

import './navbar.css';

const NavbarView = (props) => {

    const Logout = () => {
        props.onLogout();
        props.history.push('/notlogged');
    };

    return(
        <div className="container fixed-top navbar-container">
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
                            <NavLink className="nav-link" to="/odds-list">Oddsmatching</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/calculator">Calculator</NavLink>
                        </li>
                        <li className="nav-item">
                            <ProfileDropdown logout={Logout} />
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );

};

const mapDispatchToProps = dispatch => {
  return {
      onLogout: () => dispatch({type:'LOGOUT'})
  }
};

export default connect(null, mapDispatchToProps)(NavbarView);