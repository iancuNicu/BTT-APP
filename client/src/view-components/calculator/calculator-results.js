import React from 'react';

import './calculator.css';

const CalculatorResults = ({input_values, calculated_values}) => {


    const isPositive = (inVal) => {
        if(inVal){
           return inVal > 0 ? 'positive-pr' : 'negative-pr';
        }
    };

    return(
        <div className="container result-container">
            <h5>Result: </h5>
            <div className="form-group result-wrapper">
                <p>At odds of {input_values.exchange_odds} { ' ' }
                    your lay stake is <b>{calculated_values.lay_stake}</b></p>
                <p>Your liability is <b>{calculated_values.liability}</b> </p>
                <p>If the Bookmaker Bet wins, your overall position
                    will be <span className={isPositive(calculated_values.back_bet_profit)}>
                        { Math.round(calculated_values.back_bet_profit * 100)/100}
                        </span>
                </p>
                <p>If the Exchange Lay wins, your overall position will
                    be <span className={isPositive(calculated_values.lay_bet_profit)}>
                        {Math.round(calculated_values.lay_bet_profit * 1000)/1000}
                        </span>
                </p>
                <p>Your rating for this bet is {Math.round(calculated_values.match_rating * 100)/100} %</p>
            </div>
        </div>
    );

};

export default CalculatorResults;
