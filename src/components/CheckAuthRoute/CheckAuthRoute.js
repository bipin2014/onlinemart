import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const CheckAuthRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            (authenticated === false) ? <Redirect to="/" /> : <Component {...props} />
        }
    />
);

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
  });
  
  CheckAuthRoute.propTypes = {
    user: PropTypes.object
  };

  export default connect(mapStateToProps)(CheckAuthRoute);
