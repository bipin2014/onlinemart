import React from 'react';
import Search from '../../components/Search/Search';
import NavItems from '../../components/NavItems/NavItems';
import { Logo } from '../../components/Logo/Logo';
import AddToCart from '../../components/AddToCart/AddToCart';

function Navbar(props){
    let navItems=["Home","About","Products","Login"];
    let authNavItems=["Home","About","Products","Logout"];
    return(
        <nav className="nav-bar">
            <Logo/>
            <Search/>
            <NavItems items={props.authenticated? authNavItems:navItems}/>
            <AddToCart/>
        </nav>
    )
}
export default Navbar;