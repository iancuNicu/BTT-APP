import React from 'react';
import {PaginationItem, PaginationLink} from "reactstrap";

const PaginationFragment = ({handleClick, index, currentPage}) => {

    return(
        <PaginationItem active={index === currentPage} key={index}>
            <PaginationLink href="#"
                            onClick={e => handleClick(e, index)}>
                {index}
            </PaginationLink>
        </PaginationItem>
    );

};

export default PaginationFragment;