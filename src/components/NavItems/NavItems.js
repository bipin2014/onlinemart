import React from 'react';
import {Link} from 'react-router-dom';

const NavItems=(props)=>{
    return(
        <div className="nav-items">
            {props.items.map(item=>(
                <NavItem label={item.label} key={item.id} id={item.id} to={item.to} dropdown={item.dropdown} />
            ))}
        </div>
    )
}

const NavItem=(props)=>{
    return(
        
        <Link to={`/${props.to}`} key={`${props.id}`}>
            <div  className="nav-item">{props.label}</div>
        </Link>
    )
}

export default NavItems;