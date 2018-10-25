import React from 'react';

const ErrorPage = ({message}) => {

    return(
        <div className="error-page">
            <h1>{message || 'Pagina inaccesibila!'}</h1>
        </div>
    );

};

export default ErrorPage;