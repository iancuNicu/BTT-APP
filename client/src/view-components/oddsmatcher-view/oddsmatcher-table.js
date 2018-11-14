import React from 'react';
import { Table } from 'reactstrap';

import OddsRow from './oddsmatcher-row';

const OddsTable = ({odds_data}) => {

    return(
        <div className="odds-table">
            <Table size="sm" responsive hover bordered>
                <thead>
                    <tr>
                       <th>Name</th>
                       <th>Sport</th>
                       <th>Date-Time</th>
                       <th>Rating</th>
                       <th>Bet</th>
                       <th>Back Odds</th>
                       <th>Bookie</th>
                       <th>Exchange_Odds</th>
                       <th>Exchange</th>
                    </tr>
                </thead>
                <tbody>
                {
                    odds_data.map(odd =>{
                        return <OddsRow data={odd} key={Math.random()*100} />
                    })
                }
                </tbody>
            </Table>
        </div>
    );

};

export default OddsTable;