import './auth.css';
import {connect} from 'react-redux';
import {logoutUser} from '../../redux/actions/userAction';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AuthNavItems extends Component {
    render() {
        return (
            <div className="nav-items">
            {this.props.items.map(item => (
                <NavItem label={item.label} key={item.id} id={item.id} to={item.to} dropdown={item.dropdown} />
            ))}
        </div>
        )
    }
}

const NavItem = (props) => {
    return (
        <div className="dropdown">
            <div className="dropbtn">{props.label} <i className="fa fa-caret-down"></i>
            </div>
            <div className="dropdown-content">
                <a href="/home">Home</a>
                <a href="/becomeaseller">Become a Seller</a>
                <a href="#" onClick={handleLogout}>Logout</a>
            </div>
        </div>
    )
}



const handleLogout=()=>{
    console.log("Hello");
    this.props.logoutUser();
}

AuthNavItems.propTypes = {
    logoutUser: PropTypes.func.isRequired,
  };

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
});

const mapActionsToProps = {
    logoutUser
};

export default connect(mapStateToProps,mapActionsToProps)(AuthNavItems);