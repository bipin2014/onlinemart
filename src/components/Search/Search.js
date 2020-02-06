import React, { useState } from 'react';
import {withRouter} from 'react-router';

const Search=(props)=>{
    const [keyword, setkeyword] = useState("");

    const handleSubmit=(event)=>{
        event.preventDefault();
        console.log(keyword);
        if(keyword!==""){
            props.history.push('/search/'+keyword);

        }
        
    }
    return(
        <div className="search-item">
            <form onSubmit={handleSubmit}>
                <input type="text"  placeholder="Enter a product name or category" onChange={e=>setkeyword(e.target.value)}/>
                <i className="fa fa-search"  onClick={handleSubmit}/>
            </form>
        </div>
    )
}

export default withRouter(Search);