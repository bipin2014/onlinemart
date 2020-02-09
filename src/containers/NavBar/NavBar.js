import Search from '../../components/Search/Search';
import Logo  from '../../components/Logo/Logo';
import AddToCart from '../../components/AddToCart/AddToCart';
import TopTopNavBar from "../../components/TopTopNavBar/TopTopNavBar";
import {connect} from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


class NavBar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
            <nav className="nav-bar">
                <TopTopNavBar authenticated={authenticated}/>
            <div className="second-nav">
                <Logo />
                <Search />
                <AddToCart />
            </div>

        </nav>
        )
    }
}

NavBar.propTypes = {
    authenticated: PropTypes.bool.isRequired
  };
  
  const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
  });
  
  export default connect(mapStateToProps)(NavBar);