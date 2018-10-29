import React from 'react';

const AdminSection = ({history}) => {

    const  newTraining = () => {
        history.push('/new-training');
    };

    return(
        <div className="admin-section">
            <div className="btn-group">
                <button className="btn btn-outline-success" onClick={newTraining}>
                    Adauga Training
                </button>
            </div>
        </div>
    );

};

export default AdminSection;