import React from 'react';

import './calculator.css';

const CalculatorForm = ({onChange, input_values}) => {

    return(
        <form>
            <div className="container-fluid bookmaker-wrapper">
                <div className="form-group">
                    <label htmlFor="back_stake">Back Stake</label>
                    <input id="back_stake" type="number" name="back_stake"
                           onChange={onChange}
                           value={input_values.back_stake}
                           className="form-text form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="back_odds">Back Odds</label>
                    <input id="back_odds" type="number" name="back_odds"
                           onChange={onChange}
                           value={input_values.back_odds}
                           className="form-text form-control" />
                </div>
            </div>
            <div className="container-fluid exchange-wrapper">
                <div className="form-group">
                    <label htmlFor="exchange_odds">Exchange Odds</label>
                    <input id="exchange_odds" type="number" name="exchange_odds"
                           onChange={onChange}
                           value={input_values.exchange_odds}
                           className="form-text form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="exchange_commision">Exchange Commision</label>
                    <input id="exchange_commision" type="number" name="exchange_commision"
                           onChange={onChange}
                           value={input_values.exchange_commision}
                           className="form-text form-control" />
                </div>
            </div>
        </form>
    );

};

export default CalculatorForm;