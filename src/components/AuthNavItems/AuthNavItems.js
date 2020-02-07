import './auth.css';
import {connect} from 'react-redux';
import {logoutUser} from '../../redux/actions/userAction';
import React, { Component } from 'react';
class AuthNavItems extends Component {
    render() {

        const handleLogout=()=>{
            this.props.logoutUser();
        }
        const NavItem = (props) => {
            return (
                <div className="dropdown">
                    <div className="dropbtn">{props.label} <i className="fa fa-caret-down"></i>
                    </div>
                    <div className="dropdown-content">
                        <a href="/home">Home</a>
                        <a href="/order">My Orders</a>
                        {this.props.credentials.usertype==="Buyer"?
                        <a href="/becomeaseller">Become a Seller</a>:""}
                        {this.props.credentials.usertype==="Seller"?
                        <a href="/viewproducts">View your Prodcut</a>:""}
                        {this.props.credentials.usertype==="Admin"?
                        <a href="/verifySeller">Verify Seller</a>:""}
                        <a href="/" onClick={handleLogout}>Logout</a>
                    </div>
                </div>
            )
        }
        return (
            <div className="nav-items">
            {this.props.items.map(item => (
                <NavItem label={item.label} key={item.id} id={item.id} to={item.to} dropdown={item.dropdown} />
            ))}
        </div>
        )
    }
}



const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
    credentials: state.user.credentials
});

const mapActionToProps={
    logoutUser
}

export default connect(mapStateToProps,mapActionToProps)(AuthNavItems);