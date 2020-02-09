import React from 'react';
import {Link} from 'react-router-dom';
import img from '../../logo.png'

 const Logo=()=>{
    return(
        <Link to="/">
            <img src={img} alt="Logo"></img>
        </Link>
        
    )
}

export default Logo;

