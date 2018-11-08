import React from 'react';
import Select from 'react-select';

const CalculatorSelect = ({options, selectedOption, selectChange}) => {

    return(
        <div className="calculator-select">
            <Select options={options}
                    value={selectedOption}
                    onChange={selectChange}/>
        </div>
    );

};

export default CalculatorSelect;