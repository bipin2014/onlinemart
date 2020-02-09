import React, { useState } from 'react';
import Navbar from '../../containers/NavBar/NavBar';
import Body from '../../Views/Body/Body';
import Footer from '../../containers/Footer/Footer';
import jwtDecode from 'jwt-decode';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import '../../assets/css/layout.scss';

import Login from '../../Views/Login/Login';
import Signup from '../../Views/Signup/Signup';
import Cart from '../../Views/Cart/Cart';
import Checkout from '../../Views/Checkout/Checkout';
import AuthRoute from '../../components/AuthRoute/AuthRoute';
import CheckAuthRoute from '../../components/CheckAuthRoute/CheckAuthRoute';
import AddProduct from '../../components/AddProduct/AddProduct';
import Order from '../../Views/Order/Order';
import axios from 'axios';
import store from '../../redux/store';
import { SET_AUTHENTICATED } from '../../redux/types';
import { logoutUser, getUserData } from '../../redux/actions/userAction';
import { getUserCart } from '../../redux/actions/cartAction';
import ProductDetails from '../../containers/ProductDetails/ProductDetails';
import ProductSearch from '../../containers/ProductSearch/ProductSearch';
import ThankYou from '../../Views/ThankYou/ThankYou';
import ViewOwnProduct from '../../Views/ViewOwnProduct/ViewOwnProduct';
import BecomeSeller from '../../Views/BecomeSeller/BecomeSeller';
import VerifySeller from '../../Views/VerifySeller/VerifySeller';
import EditProduct from '../../Views/EditProduct/EditProduct';
import MyReferal from '../../Views/MyReferal/MyReferal';

import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddCurrency from '../../Views/AddCurrency/AddCurrency';

const Layout = (authenticated) => {
    const [token, settoken] = useState(localStorage.getItem("AUTH-TOKEN"))
    if (token) {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        if (decodedToken.iat > Date.now()) {
            store.dispatch(logoutUser());
            window.location.href = '/login';
        } else {
            store.dispatch({ type: SET_AUTHENTICATED });
            axios.defaults.headers.common['AUTH-TOKEN'] = token;
            store.dispatch(getUserData());
            store.dispatch(getUserCart());

            console.log(authenticated);
        }
    }
    return (
        <main>
            <Router>
                <Navbar />
                <Route path="/" exact component={Body}></Route>
                <Route path="/home" exact component={Body}></Route>
                <Route path="/product/:productId" exact component={ProductDetails}></Route>
                <Route path="/search/:keyword" exact component={ProductSearch}></Route>
                <AuthRoute path="/login" exact component={Login} />
                <AuthRoute path="/signup" exact component={Signup} />
                <CheckAuthRoute path="/cart" exact component={Cart}></CheckAuthRoute>
                <NotificationContainer />
                {token && [
                    <Route path="/myreferals" exact component={MyReferal}></Route>,
                    <Route path="/becomeaseller" exact component={BecomeSeller}></Route>,
                    <Route path="/order" exact component={Order}></Route>,
                    <Route path="/checkout" exact component={Checkout}></Route>,
                    <Route path="/thankyou/:orderId" exact component={ThankYou}></Route>,
                    <Route path="/addcurrency" exact component={AddCurrency}></Route>,
                ]}

                {authenticated.authenticated === "Seller" && [
                    <Route path="/addproducts" exact component={AddProduct}></Route>,
                    <Route path="/editproduct/:id" exact component={EditProduct}></Route>,
                    <Route path="/viewproducts" exact component={ViewOwnProduct}></Route>,
                ]}
                {authenticated.authenticated === 'Admin' && [
                    <Route path="/verifySeller" exact component={VerifySeller}></Route>,
                    <Route path="/addproducts" exact component={AddProduct}></Route>,
                    <Route path="/editproduct/:id" exact component={EditProduct}></Route>,
                    <Route path="/viewproducts" exact component={ViewOwnProduct}></Route>,
                ]}


                <Footer />
            </Router>
            
        </main>
    )
}

const mapStateToProps = (state) => ({
    authenticated: state.user.credentials.usertype,
});

Layout.propTypes = {
    user: PropTypes.object
};

export default connect(mapStateToProps)(Layout);