import React from 'react';
import {Link} from 'react-router-dom';

const NavItems=(props)=>{
    return(
        <div className="nav-items">
            {props.items.map(item=>(
                <NavItem label={item}/>
            ))}
        </div>
    )
}

const NavItem=(props)=>{
    return(
        <Link to={`/${props.label.toLowerCase()}`}>
            <div key={`/${props.label.toLowerCase()}`} className="nav-item">{props.label}</div>
        </Link>
    )
}

export default NavItems;