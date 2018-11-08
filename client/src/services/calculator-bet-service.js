
const CalculatorService = {

    calculate: (selectedOption, calculated_values, input_values) => {
        switch(selectedOption.value) {
            case 'NORMAL': {
                const calculated_copy = Object.create(calculated_values);
                const input_copy = Object.create(input_values);

                calculated_copy.lay_stake = (input_copy.back_odds *  input_copy.back_stake) /
                    (input_copy.exchange_odds - input_copy.exchange_commision/100);
                calculated_copy.lay_stake = Math.round(calculated_copy.lay_stake * 1000)/1000;

                calculated_copy.back_bet_profit = input_copy.back_stake * (input_copy.back_odds-1) -
                    calculated_copy.lay_stake * (input_copy.exchange_odds - 1);

                calculated_copy.lay_bet_profit = calculated_copy.lay_stake * (1-input_copy.exchange_commision/100) -
                    input_copy.back_stake;

                calculated_copy.match_rating = (input_copy.back_odds/input_copy.exchange_odds -
                    ((input_copy.back_odds/input_copy.exchange_odds) * input_copy.exchange_commision)/100) * 100;

                calculated_copy.liability = input_copy.back_stake * (input_copy.exchange_odds - 1);

                return calculated_copy;
            }
            case 'SNR': {
                const calculated_copy = Object.create(calculated_values);
                const input_copy = Object.create(input_values);

                calculated_copy.lay_stake = ((input_copy.back_odds-1) / (input_copy.exchange_odds
                        - input_copy.exchange_commision/100)) * input_copy.back_stake;
                calculated_copy.lay_stake = Math.round(calculated_copy.lay_stake * 100)/100;

                calculated_copy.back_bet_profit = (input_copy.back_odds - 1) * input_copy.back_stake -
                    (input_copy.exchange_odds - 1) * calculated_copy.lay_stake;

                calculated_copy.lay_bet_profit = calculated_copy.lay_stake * (1 - input_copy.exchange_commision/100);

                // NEED ANOTHER FORMULE FOR SNR LIABILITY
                calculated_copy.liability = input_copy.back_stake * (input_copy.exchange_odds - 1);

                calculated_copy.match_rating = (input_copy.back_odds/input_copy.exchange_odds -
                    ((input_copy.back_odds/input_copy.exchange_odds) * input_copy.exchange_commision)/100) * 100;

                return calculated_copy;
            }
            case 'SR': {
                const calculated_copy = Object.create(calculated_values);
                const input_copy = Object.create(input_values);

                calculated_copy.lay_stake = (input_copy.back_odds * input_copy.back_stake) /
                    (input_copy.exchange_odds - input_copy.exchange_commision/100);
                calculated_copy.lay_stake = Math.round(calculated_copy.lay_stake * 1000)/1000;

                calculated_copy.back_bet_profit = input_copy.back_stake * input_copy.back_odds -
                    calculated_copy.lay_stake * (input_copy.exchange_odds - 1);

                calculated_copy.lay_bet_profit = (1 - input_copy.exchange_commision/100) * calculated_copy.lay_stake;
                calculated_copy.lay_bet_profit = Math.round(calculated_copy.lay_bet_profit * 100)/100;

                // NEED ANOTHER FORMULE FOR SR LIABILITY
                calculated_copy.liability = input_copy.back_stake * (input_copy.exchange_odds - 1);

                calculated_copy.match_rating = (input_copy.back_odds/input_copy.exchange_odds -
                    ((input_copy.back_odds/input_copy.exchange_odds) * input_copy.exchange_commision)/100) * 100;

                return calculated_copy
            }
            default: {
                return calculated_values;
            }
        }
    }

};

export default CalculatorService;