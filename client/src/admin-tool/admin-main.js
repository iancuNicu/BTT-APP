import React, {Component} from 'react';
import { withCookies } from 'react-cookie';
import LoginComponent from "../container-components/login-signup-page/login-signup";

import './admin.css';
import AdminHome from "./admin-home";
import AuthService from '../services/auth-service';

class AdminMain extends Component {

  constructor(props){
      super(props);
  }

  isAdminLogged = () => {
      return AuthService.isAdminLogged() && this.props.cookies.get('auth-token');
  } ;

  render(){
      return (
          <div id="AdminMain">
              { this.isAdminLogged() ? <AdminHome/> :
              <LoginComponent cookies={this.props.cookies} isAdmin={true} /> }
          </div>
      );
  }

}

export default withCookies(AdminMain);