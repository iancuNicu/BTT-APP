import React from 'react';

const AdminButtonConstructor = ({permissions}) => {


    return(
        <div className="admin-button-wrapper">
            {permissions.isAdmin ?
                <div className="btn btn-group">

                </div>
            : undefined}
        </div>
    );

};

export default AdminButtonConstructor;