import React, { Component } from 'react';
import axios from "axios";
import { withRouter }  from 'react-router-dom';
import { connect } from 'react-redux';
import LoginSignUpForm from './login-signup-form';
import {withCookies} from "react-cookie";

class LoginSingup extends Component {

    handleSignUp = (data) => {
        let url = this.getUrl("signup");
        return this.apiCall(data, url);
    };

    handleLogin = (data) => {
        let url = this.getUrl("login");
        return this.apiCall(data, url);
    };

    handleRecoverPass = (data) => {
        console.log(data);
    };

    apiCall = (data, url) => {
        axios.post(url, {
            password: data.password,
            email: data.email
        }).then(res => {
            this.props.location.pathname === "/admin" ? this.props.onAdminSubmit(res.data)
                : this.props.onSubmit(res.data);
            this.props.cookies.set('auth-token', res.headers.authorization);
            this.redirectToHome();
        }).catch(e => console.log("Submit Error ", e));
    };

    getUrl = (type) => {
        let url;
        if(this.props.location.pathname === "/admin") {
            url = `http://localhost:5000/api/admin/login`
        }
        else {
            url = `http://localhost:5000/api/${type}`
        }
        return url
    };

    getRegistrationType = () => {
      if(this.props.location.pathname === "/singup"){
          return "signup";
      }
      else
          return "login";
    };

    redirectToHome = () => {
        if(this.props.location.pathname === "/admin"){
            this.props.history.push('/admin');
        }
        else {
            this.props.history.push('/');
        }
    };

    render() {
        return (
                <div className="login-view-wrapper">
                    <LoginSignUpForm handleSignUp={this.handleSignUp}
                                     handleLogin={this.handleLogin}
                                     formType={this.getRegistrationType()}   />
                </div>
        );
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (user) => dispatch({type: 'SUBMIT', payload: user}),
        onAdminSubmit: (user) => dispatch({type:'SUBMIT_ADMIN', payload: user})
    }
};

export default connect(null, mapDispatchToProps)(withRouter(withCookies(LoginSingup)));