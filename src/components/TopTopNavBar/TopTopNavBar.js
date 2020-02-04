import React from 'react'
import jwtDecode from "jwt-decode";
import NavItems from "../NavItems/NavItems";
import AuthNavItems from '../AuthNavItems/AuthNavItems';

const TopTopNavBar=(props)=> {
    let navItems = [
        { id: 1, label: "Login", to: "login" },
        { id: 2, label: "Signup", to: "signup" }
    ]
    let authNavItems = [];

    if (props.authenticated) {
        const token = localStorage.getItem("AUTH-TOKEN");
        const decodedToken = jwtDecode(token);
        authNavItems = authNavItems = [
            { id: decodedToken._id, label: decodedToken.name, to: "login", dropdown:true}
        ];
    }
        return (
            <div className="top-top-navbar">
            {props.authenticated ?
            (<AuthNavItems items={authNavItems} />):
                (<NavItems items={navItems}/>)}
            </div>
        )
}

export default TopTopNavBar;
