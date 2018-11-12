import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { TiUserOutline } from 'react-icons/ti';

class ProfileDropdown extends Component {

    constructor(props){
        super(props);
        this.state = {
            dropdownOpen: false
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }))
    };

    render(){
        return(
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle>
                    <TiUserOutline size={24} />
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>Settings</DropdownItem>
                    <DropdownItem onClick={this.props.logout}>Logout</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }

}

export default ProfileDropdown;