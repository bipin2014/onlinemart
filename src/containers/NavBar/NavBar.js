import React from 'react';
import Search from '../../components/Search/Search';
import { Logo } from '../../components/Logo/Logo';
import AddToCart from '../../components/AddToCart/AddToCart';
import TopTopNavBar from "../../components/TopTopNavBar/TopTopNavBar";

function Navbar(props) {


    return (
        <nav className="nav-bar">

                <TopTopNavBar authenticated={props.authenticated}/>

            <div className="second-nav">
                <Logo />
                <Search />
                <AddToCart />
            </div>

        </nav>
    )
}
export default Navbar;