import React from 'react';

const AdminSearch = (props) => {

        return(
            <div className="admin-search">
                <form className="form-inline my-2 my-lg-0">
                    <div className="form-group">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </div>
                </form>
            </div>
        );

};

export default AdminSearch;