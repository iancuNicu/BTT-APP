import React, { Component } from 'react';

import CalculatorResults from './../../view-components/calculator/calculator-results';
import CalculatorForm from './../../view-components/calculator/calculator-form';
import CalculatorSelect from '../../view-components/calculator/calculator-select';
import CalculatorService from '../../services/calculator-bet-service';

import '../../view-components/calculator/calculator.css';


const calcTypes = [{ value: 'NORMAL', label: 'NORMAL' },
                   { value: 'SNR', label:  'Free Bet (SNR)' },
                   { value: 'SR', label:  'Free Bet (SR)' }];

class CalculatorComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            calculated_values: {
                lay_stake: 0,
                liability: 0,
                back_bet_profit: 0,
                lay_bet_profit: 0,
                match_rating: 0,
            },
            input_values: {
                back_stake: 0,
                back_odds: 0,
                exchange_odds: 0,
                exchange_commision: 0
            },
            selectedOption:calcTypes[0]
        };
    }

    handleChange = (event) => {
        if(!isNaN(event.target.value)){
            this.setState({
                ...this.state,
                input_values: {
                    ...this.state.input_values,
                    [event.target.name] : event.target.value
                }
            }, () => {
                this.calculate();
            });
        }
    };

    calculate = () => {
        const calc_values = CalculatorService.calculate(this.state.selectedOption,
            this.state.calculated_values,
            this.state.input_values);
        if(this.calcCheck(calc_values)){
            this.setState({
                ...this.state,
                calculated_values: calc_values
            });
        }
    };

    calcCheck = (calc_val) => {

        let isNumber = true;

        Object.keys(calc_val).forEach(key => {
            if(isNaN(calc_val[key])) {
                isNumber = false;
            }
        });

        return isNumber;

    };

    selectChange = (selectedOption) => {
        this.setState({
            ...this.state,
            selectedOption
        },() => {
            this.calculate();
        });
    };

    render(){
        return(
            <div className="container-fluid calculator-container">
                <CalculatorSelect options={calcTypes} selectedOption={this.state.selectedOption}
                                  selectChange={this.selectChange}  />
                <CalculatorForm onChange={this.handleChange}
                                input_values={this.state.input_values}
                                type={this.state.type}/>
                <button className="btn btn-outline-success calculate-button">Calculate</button>
                <CalculatorResults input_values={this.state.input_values}
                                   calculated_values={this.state.calculated_values} />
            </div>
        );
    }

}

export default CalculatorComponent;