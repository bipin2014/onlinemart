import React from 'react';
import Navbar from '../../containers/NavBar/NavBar';
import Body from '../../Views/Body/Body';
import Footer from '../../containers/Footer/Footer';
import jwtDecode from 'jwt-decode';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import '../../assets/css/layout.scss';

import Login from '../../Views/Login/Login';
import Signup from '../../Views/Signup/Signup';
import { Cart } from '../../Views/Cart/Cart';
import AuthRoute from '../../components/AuthRoute/AuthRoute';
import AddProduct from '../../components/AddProduct/AddProduct';
import Order from '../../Views/Checkout/Checkout';



function Layout() {
    const token = localStorage.getItem("AUTH-TOKEN");
    let authenticated;
    if (token) {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        if (decodedToken.iat > Date.now()) {
            window.location.href = '/login';
            authenticated = false;
        } else {
            authenticated = true;
        }
    }
    return (
        <main>
            <Router>
                <Navbar authenticated={authenticated} />
                <Route path="/" exact component={Body}></Route>
                <Route path="/home" exact component={Body}></Route>
                <Route path="/products" exact component={AddProduct}></Route>
                <AuthRoute path="/login" exact component={Login} authenticated={authenticated} />
                <AuthRoute path="/signup" exact component={Signup} authenticated={authenticated} />
                <AuthRoute path="/cart" exact component={Cart} authenticated={!authenticated}></AuthRoute>
                <Route path="/order" exact component={Order}></Route>
            </Router>
            <Footer />
        </main>
    )
}

export default Layout;