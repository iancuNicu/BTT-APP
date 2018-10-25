import React, {Component} from 'react';
import '../../view-components/login-signup-view/login-signup.css';
import {withCookies} from 'react-cookie';

class LoginSignUpForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.props.formType === "signup" ){
            this.props.handleSignUp(this.state)
        }
         else
             this.props.handleLogin(this.state);
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        return (
            <div className="form-wrapper">
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email: </label>
                        <input id="email" type="email" name="email"
                              onChange={this.handleChange} value={this.state.email} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input id="password" type="password" name="password"
                              onChange={this.handleChange} value={this.state.password} className="form-control"/>
                    </div>
                    <button type="submit" className="btn btn-primary"
                            onClick={this.handleSubmit}>Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default withCookies(LoginSignUpForm);