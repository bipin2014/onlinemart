import React from 'react';
import Navbar from '../../containers/NavBar/NavBar';
import Body from '../../Views/Body/Body';
import Footer from '../../containers/Footer/Footer';
import jwtDecode from 'jwt-decode';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import '../../assets/css/layout.scss';

import Login from '../../Views/Login/Login';
import Signup from '../../Views/Signup/Signup';
import Cart from '../../Views/Cart/Cart';
import AuthRoute from '../../components/AuthRoute/AuthRoute';
import CheckAuthRoute from '../../components/CheckAuthRoute/CheckAuthRoute';
import AddProduct from '../../components/AddProduct/AddProduct';
import Order from '../../Views/Checkout/Checkout';
import axios from 'axios';
import store from '../../redux/store';
import {SET_AUTHENTICATED} from '../../redux/types';
import { logoutUser, getUserData } from '../../redux/actions/userAction';
import { getUserCart } from '../../redux/actions/cartAction';



function Layout() {
    const token = localStorage.getItem("AUTH-TOKEN");
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
            
        }
    }
    return (
        <main>
            <Router>
                <Navbar/>
                <Route path="/" exact component={Body}></Route>
                <Route path="/home" exact component={Body}></Route>
                <Route path="/products" exact component={AddProduct}></Route>
                <AuthRoute path="/login" exact component={Login}  />
                <AuthRoute path="/signup" exact component={Signup} />
                <CheckAuthRoute path="/cart" exact component={Cart}></CheckAuthRoute>
                <Route path="/order" exact component={Order}></Route>
            </Router>
            <Footer />
        </main>
    )
}

export default Layout;