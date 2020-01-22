import React from 'react';
import Search from '../../components/Search/Search';
import NavItems from '../../components/NavItems/NavItems';
import { Logo } from '../../components/Logo/Logo';
import AddToCart from '../../components/AddToCart/AddToCart';
import jwtDecode from 'jwt-decode';

function Navbar(props) {
    let navItems = ["Home", "Products", "Login"];
    let authNavItems=[];

    if (props.authenticated) {
        const token = localStorage.getItem("AUTH-TOKEN");
        const decodedToken = jwtDecode(token);
        authNavItems= ["Home", "Products", decodedToken.name ];
    }
    return (
        <nav className="nav-bar">
            <Logo />
            <Search />
            <NavItems items={props.authenticated ? authNavItems : navItems} />
            <AddToCart />
        </nav>
    )
}
export default Navbar;