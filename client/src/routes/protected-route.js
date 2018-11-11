import React,{Component} from 'react';
import { Route, Redirect,withRouter } from 'react-router-dom';
import AuthService from '../services/auth-service';
import { withCookies } from 'react-cookie';

class ProtectedRoute extends Component {

        constructor(props){
            super(props);
            this.state = {
                headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': this.props.cookies.get('auth-token')
                },
                shouldRender: true
            }
        }

        componentDidMount(){
            AuthService.checkToken(this.state.headers).then(res => {
                if(res.data.expired){
                    this.props.cookies.set('x-auth', res.headers.authorization);
                }
                else if(res.data.not_logged){
                    this.setState({
                        ...this.state,
                        shouldRender: false
                    });
                }
            })
                       .catch(e => this.props.history.push('/error'));
        }

        render(){
            const {Component} = this.props;

            return(<Route render={() => {
                return this.state.shouldRender ? <Component/> : <Redirect to="/notlogged"/>
            }}/>)
        }
}

export default withCookies(withRouter(ProtectedRoute));