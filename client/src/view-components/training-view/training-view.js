import React from 'react';
import { withRouter } from 'react-router-dom';
import TrainingList from './../../container-components/training-container/training-list-container';
import AuthService from '../../services/auth-service';
import ErrorPage from '../error-view/error-page';

const TrainingView = ({history, location}) => {

    const ErrorMessage = 'Pagina inacesibila!';

    return(
        <div className="training-view">
            {
                (AuthService.isAdminLogged() || AuthService.isLogged()) ? <TrainingList history={history}
                                                                                        location ={location} />
                    : <ErrorPage message={ErrorMessage} />
            }
        </div>
    );

};

export default withRouter(TrainingView);
