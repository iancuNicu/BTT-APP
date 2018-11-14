import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody } from 'reactstrap';
import CalculatorComponent from './calculator-component';
import {TiCalculator} from 'react-icons/ti'

import './../../view-components/calculator/calculator.css';

class CalculatorModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            open: !prevState.open
        }))
    };

    render(){
        return(
            <div className="modal-wrapper">
                <TiCalculator size={22} onClick={this.toggle} />
                <Modal toggle={this.toggle} isOpen={this.state.open} >
                    <ModalHeader toggle={this.toggle}>Odds Calculator</ModalHeader>
                    <ModalBody>
                       <CalculatorComponent input={this.props.data} />
                    </ModalBody>
                </Modal>
            </div>
        );
    }

}

export default CalculatorModal;