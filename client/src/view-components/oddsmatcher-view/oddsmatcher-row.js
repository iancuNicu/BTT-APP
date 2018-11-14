import React from 'react';

const OddsRow = ({data}) => {

    return (
        <tr>
           <td>{data.name}</td>
           <td>{data.sport === 'soccer_epl' ? 'Footbal' : data.sport}</td>
           <td>{data.date_time}</td>
           <td>{Math.round(data.rating * 1000)/10} %</td>
           <td>{data.bet}</td>
           <td>{data.back_odds}</td>
           <td>{data.bookie}</td>
           <td>{data.exchange_odds}</td>
           <td>{data.exchange}</td>
        </tr>
    );

};

export default OddsRow;