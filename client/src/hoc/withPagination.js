import React, {Component} from 'react';
import axios from 'axios';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import PaginationFragment from "../view-components/pagination/pagination-fragment";

import './hoc-styles.css';

const withPagination = (InComponent, limit) => {

    return class paginationWrapper extends Component {

        constructor(props){
            super(props);
            this.state = {
                data: [],
                length: 0,
                render: false,
                pages: 0,
                limit: limit || 6
            };
        }

        apiCall = async function(){
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': this.props.cookies.get('auth-token')
            };
            const url = `http://localhost:5000/api${this.props.history.location.pathname}`;
            return await axios({
                method: 'get',
                url: url,
                headers: headers
            }).then(res => res.data).catch(e => {
                this.props.history.push('/error');
            })
        };

        async componentDidMount(){
            const data = await this.apiCall();
            const limit = this.state.limit;
            if(data){
                this.setState({
                    data: data,
                    render:true,
                    length: data.length,
                    pages: Math.ceil(data.length/limit),
                    rendered_data: data.slice(0, 6),
                    currentPage: 1
                });
            }
        }

        handleClick = (e, offset) => {

            e.preventDefault();

            if(offset === 1 ){
                const sliced = this.state.data.slice(0, this.state.limit);
                this.setState({
                    ...this.state,
                    rendered_data: sliced,
                    currentPage: 1
                })
            }
            else if(offset === this.state.pages){
                const sliced = this.state.data.slice(this.state.limit*(offset-1));
                this.setState({
                    ...this.state,
                    rendered_data: sliced,
                    currentPage: offset
                });
            }
            else if(offset === -1) {
                const newOffset = this.state.currentPage -1;
                const sliced = this.state.data.slice(this.state.limit*(newOffset-1),
                    this.state.limit*newOffset);
                this.setState({
                    ...this.state,
                    rendered_data: sliced,
                    currentPage: newOffset
                });
            }
            else if(offset === 0.1){
                const newOffset = this.state.currentPage + 1;
                const sliced = this.state.data.slice(this.state.limit*(newOffset-1),
                    this.state.limit*newOffset);
                this.setState({
                    ...this.state,
                    rendered_data: sliced,
                    currentPage: newOffset
                });
            }
            else {
               const sliced = this.state.data.slice(this.state.limit*(offset-1),
                   this.state.limit*offset);
               this.setState({
                   ...this.state,
                    rendered_data: sliced,
                   currentPage: offset
               });
            }

        };

        createPagination = () => {
            let pages = [];
            for(let i=0; i<this.state.pages; i++){
                const page = (
                    <PaginationFragment
                        key={Math.random()+i}
                        handleClick={this.handleClick}
                        index={i+1}
                        currentPage={this.state.currentPage}
                    />
                );
                pages.push(page);
            }
            return pages;
        };

        render(){
            return(
                <React.Fragment>
                    {this.state.render ? <InComponent data={this.state.rendered_data} /> : undefined}
                    {this.state.render ? <Pagination className="pagination-wrapper">
                        {(this.state.length > 1 && this.state.currentPage > 1 ) ?
                            <PaginationItem>
                                <PaginationLink previous href="#"
                                                onClick={e => this.handleClick(e, -1)} />
                            </PaginationItem>
                            :undefined }
                        {this.createPagination()}
                        {(this.state.length > 1 && this.state.currentPage < this.state.pages ) ?
                            <PaginationItem>
                                <PaginationLink next href="#"
                                                onClick={e => this.handleClick(e, 0.1)} />
                            </PaginationItem>
                            : undefined }
                    </Pagination> :undefined }
                </React.Fragment>
            );
        }

    }

} ;

export default withPagination;