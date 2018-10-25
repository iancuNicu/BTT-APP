import React from 'react';
import TrainingList from './../../container-components/training-container/training-list-container';
import AuthService from '../../services/auth-service';
import ErrorPage from '../error-view/error-page';

const TrainingView = () => {

    const ErrorMessage = 'Pagina inacesibila!';

    return(
        <div className="training-view">
            {
                (AuthService.isAdminLogged() || AuthService.isLogged()) ? <TrainingList />
                    : <ErrorPage message={ErrorMessage} />
            }
        </div>
    );

};

export default TrainingView;
