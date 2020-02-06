import React from 'react';
import {Link} from 'react-router-dom'
const NotFound=()=>{
    return(
        <div className="content">
            <h1 style={{textAlign:"center"}}>404 NOT FOUND</h1>
            <p style={{textAlign:"center"}}>
              <Link to="/">Go to Home </Link>
            </p>
        </div>
    )
}

export default NotFound;