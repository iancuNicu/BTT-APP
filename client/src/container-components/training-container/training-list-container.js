import React, {Component} from 'react';
import { withCookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import TrainingCard from "../../view-components/training-view/training-card";
import AuthService from '../../services/auth-service';
import AdminSidebar from "../../admin-tool/admin-sidebar";
import AdminButtonConstructor from "../../admin-tool/admin-button-constructor";

import '../../view-components/training-view/training.css';

class TrainingList extends Component {

    constructor(props){
        super(props);
        this.state = {
          trainingList: [],
          permissions: {}
        };
    }

    verifyToken = () => {
        if(!this.props.cookies.get('token')){
            return true;
        }
        else {
            this.props.history.push('/error');
        }
    };

    getUrlAndHeaders = () => {
      const pathname = this.props.location.pathname;
      let headers = {
          'Accept' : 'application/json',
          'Content-Type': 'application/json',
          'authorization':this.props.cookies.get('auth-token')
          };
      const url = `http://localhost:5000/api${pathname}`;
      return {url, headers};
    };

    apiCall = (url, headers, method) => {
        return axios({
            method,
            url,
            credentials: 'include',
            headers: headers
        }).then(res => {
           return res
        });
    };

    componentDidMount(){
        // set a loading spinner to wait until data is returned
        // state.loading = true
        this.getInitState();
    }

     getInitState = () => {
        const {url, headers} = this.getUrlAndHeaders();
        this.apiCall(url, headers, 'get').then(res => {
            let newTrainingList;
            let permissions = AuthService.getPermissions();
            if(res && res.data){
                newTrainingList = this.state.res.data.slice();
                newTrainingList.splice(0, res.data.length);
                this.setState({
                    trainingList: newTrainingList,
                    permissions
                });
            }
            else {
                this.setState({
                    permissions: permissions
                })
            }
        });
    };

    newTraining = () => {
        this.props.history.push('/new-training');
    };

    render(){
        const list = this.state.trainingList;
        //also set a loading spinner

        return(
            <div>
            <h1>Admin Training !</h1>
            <div className="training-wrapper">
                <AdminSidebar/>
                <div className="training-list-wrapper">
                    <div className="btn-group">
                        <button className="btn btn-outline-success" onClick={this.newTraining}>
                            Adauga Training
                        </button>
                    </div>
                    <div className="training-list-wrapper">
                        {this.verifyToken() ?
                            list.map(
                            training => ( <TrainingCard data={training} permissions={this.state.permissions} /> )
                            )
                        : undefined}
                    </div>
                </div>
            </div>
         </div>
        );
    }

}

export default withRouter(withCookies(TrainingList));