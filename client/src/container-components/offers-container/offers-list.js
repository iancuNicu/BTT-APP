import React, {Component} from 'react';

class OfferList extends Component {

    constructor(props){
        super(props);
        this.state = {
            trainingList: []
        };
    }

    render(){
        return(
            <div className="offersList-wrapper">
                Offers List !!!!
            </div>
        );
    }

}

export default OfferList;