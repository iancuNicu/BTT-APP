import React from 'react';
import withPagination from '../../hoc/withPagination';
import OddsTable from './oddsmatcher-table';

import './oddsmatcher.css';

const OddsList = ({data}) => {

        return(
            <div className="odds-list">
                    <OddsTable odds_data={data} />
            </div>
        );

};

export default withPagination(OddsList, 6);