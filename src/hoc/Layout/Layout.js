import React from 'react';
import Navbar from '../../containers/NavBar/NavBar';
import Body from '../../Views/Body/Body';
import Footer from '../../containers/Footer/Footer';
import jwtDecode from 'jwt-decode';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import '../../assets/css/layout.scss';
import Login from '../../Views/Login/Login';
import Signup from '../../Views/Signup/Signup';
import { Cart } from '../../Views/Cart/Cart';
import AuthRoute from '../../components/AuthRoute/AuthRoute';
import AddProduct from '../../components/AddProduct/AddProduct';

const token = localStorage.FBToken;
let authenticated;
if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    if (decodedToken.exp  > Date.now()) {
        window.location.href = '/login';
        authenticated = false;
    } else {
        authenticated = true;
    }
}


function Layout() {
    return (
        <main>
            <Router> 
                    <Navbar authenticated={authenticated}/>
                    <Route path="/" exact component={Body}></Route>
                    <Route path="/home" exact component={Body}></Route>
                    <Route path="/about" exact component={Body}></Route>
                    <Route path="/products" exact component={AddProduct}></Route>
                    <AuthRoute path="/login" exact component={Login}  authenticated={authenticated}/>
                    <AuthRoute path="/signup" exact component={Signup}  authenticated={authenticated}/>
                    <Route path="/cart" exact component={Cart}></Route>
            </Router>
            <Footer />
        </main>
    )
}

export default Layout;