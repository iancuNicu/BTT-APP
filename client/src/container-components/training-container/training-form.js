import React, {Component} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import '../../view-components/training-view/training.css';

class TrainingForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: '',
            description: '',
            text: '',
            videoID: '',
            file: null
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

     handleFileInput = (e) => {
        const file =  e.target.files[0];
        this.setState({file:file});
    };

    uploadFile = ({file, name}, headers) => {

        let data = new FormData();
        data.append('file', file, name);
        const opts = {
          method: 'post',
          url: 'http://localhost:5000/api/video/addVideo',
          headers,
          data: data
        };
        return axios(opts).then(filename => filename).catch(e => e);

    };

    newTraining = (filename, headers) => {
        const body = {
            title: this.state.title,
            description: this.state.description,
            text: this.state.text,
            videoID: filename.data
        };
        const opts = {
            method: 'post',
            url: 'http://localhost:5000/api/admin/training/new',
            headers,
            data: body,
        };
        return axios(opts).then(training => {
            return training;
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const fileUploadData = {
            file: this.state.file,
            name: this.state.file.name
        };
        const headers = {
            'Authorization' : this.props.cookies.get('auth-token')
        };
        return this.uploadFile(fileUploadData, headers).then(filename => {
            return this.newTraining(filename, headers).then(res => {
                this.props.history.push({pathname: `/training-page/${res.data._id}`, state: res.data});
            }).catch(e => {
                console.log(e);
                return e;
            });
        });
    };

    render(){
        return(
            <div>
                 <form className="training-form" encType="multipart/form-data">
                     <div className="form-group">
                         <label htmlFor="title">Titlu:</label>
                         <input name="title" type="text"
                                onChange={this.handleChange}
                                id="title" className="form-text form-control" />
                     </div>
                     <div className="form-group">
                         <label htmlFor="description">Descriere:</label>
                         <input name="description" type="text"
                                onChange={this.handleChange}
                                id="description" className="form-text form-control" />
                     </div>
                     <div className="form-group">
                         <label htmlFor="text">Descriere:</label>
                         <textarea className="form-control" name="text"
                                   onChange={this.handleChange}
                                   id="text" cols="30" rows="10">
                         </textarea>
                     </div>
                     <div className="form-group">
                         <label htmlFor="videoID">Adauga video</label>
                         <input type="file" name="videoID"
                                onChange={this.handleFileInput}
                                id="videoID" className="form-control-file" />
                     </div>
                     <button type="submit" className="btn btn-primary"
                             onClick={this.handleSubmit}>Submit
                     </button>
                 </form>
            </div>
        );
    }

}

export default withRouter(withCookies(TrainingForm));
